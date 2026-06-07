import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";

// Load environment variables
dotenv.config();

// Initialize Supabase Client
const getValidSupabaseConfig = () => {
  const defaultUrl = "https://bsnazbqqtrdfongfriyk.supabase.co";
  const defaultKey = "sb_publishable_5BW1WmAkCPnPLN6no0VM1A_st-bVFst"; // fallback public/service key

  let url = (process.env.SUPABASE_URL || "").trim();
  let key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "").trim();

  // Sanitize URL by stripping any /rest/v1 suffix that might be appended by workspace integrations
  if (url) {
    url = url.replace(/\/rest\/v1\/?$/, "");
  }

  // Validate URL
  let isUrlValid = false;
  if (url) {
    try {
      const parsed = new URL(url);
      isUrlValid = (parsed.protocol === "http:" || parsed.protocol === "https:") && 
                   !url.includes("your-supabase-project") &&
                   !url.includes("your-supabase-url");
    } catch {
      isUrlValid = false;
    }
  }

  if (!isUrlValid) {
    console.warn(`[Supabase Config] Invalid or placeholder SUPABASE_URL detected ("${url}"). Falling back to default.`);
    url = defaultUrl;
  }

  // Validate Key
  const isKeyValid = key && 
                     !key.includes("your-service-role") && 
                     !key.includes("your-key") && 
                     key.length > 20;

  if (!isKeyValid) {
    console.warn(`[Supabase Config] Invalid or placeholder SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY detected. Falling back to default.`);
    key = defaultKey;
  }

  return { url, key };
};

const { url: supabaseUrl, key: supabaseKey } = getValidSupabaseConfig();
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  app.set("trust proxy", true);
  const PORT = 3000;

  // Parser for JSON payloads
  app.use(express.json());

  // Simplified Request Logger
  app.use((req, res, next) => {
    if (!req.url.startsWith("/assets/") && !req.url.endsWith(".png") && !req.url.endsWith(".ico") && !req.url.endsWith(".svg")) {
      console.log(`[HTTP Request] ${req.method} ${req.url} (IP: ${req.ip})`);
    }
    next();
  });

  // Polling/Webhook debugging store
  const webhookHistory: any[] = [];

  // TELEGRAM INTEGRATION ENGINE (WEBHOOK OR LONG POLLING BACKEND)
  async function initializeTelegramIntegration(): Promise<{ mode: string; detail: string }> {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken || botToken.includes("123456789:ABCdefGhIJKlMnOpQrStUvWxYz") || botToken === "") {
      console.log("[Telegram Integration] Bot token is not configured or is a placeholder. Integration disabled.");
      return { mode: "disabled", detail: "Токен не настроен или в демо-режиме" };
    }

    // Determine environments
    const isDevPreview = process.env.APP_URL && (
      process.env.APP_URL.includes("europe-west2.run.app") || 
      process.env.APP_URL.includes("ais-dev") || 
      process.env.APP_URL.includes("ais-pre")
    );

    // Active Render URL auto-detection
    const isRender = !!process.env.RENDER || !!process.env.RENDER_EXTERNAL_URL;
    const renderUrl = process.env.RENDER_EXTERNAL_URL;

    // SCENARIO 1: We are running in production on Render!
    if (isRender && renderUrl) {
      const webhookUrl = `${renderUrl}/api/telegram/webhook`;
      console.log(`[Telegram Integration] Running on Render. Registering Webhook mode: ${webhookUrl}`);
      try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: webhookUrl,
            allowed_updates: ["message"],
            drop_pending_updates: true
          })
        });

        const data: any = await response.json();
        if (data.ok) {
          console.log("[Telegram Integration] Webhook established successfully!", data);
          webhookHistory.push({
            timestamp: new Date().toISOString(),
            status: "webhook_setup_success",
            message: `Вебхук успешно установлен для URL Render: ${webhookUrl}`
          });
          return { mode: "webhook", detail: `Вебхук активно слушает на ${webhookUrl}` };
        } else {
          throw new Error(data.description || "Failed to set webhook");
        }
      } catch (err: any) {
        console.error("[Telegram Integration] Failed to setup Webhook on Render:", err.message || err);
        return { mode: "webhook-error", detail: `Ошибка регистрации: ${err.message}` };
      }
    }

    // SCENARIO 2: Running in AI Studio preview (Google sandbox)
    if (isDevPreview) {
      console.log("[Telegram Integration] Polling is disabled in the AI Studio environment to prevent 409 conflicts with Render/Production.");
      return { mode: "disabled-sandbox", detail: "Выключено в AI Studio для избежания конфликтов 409" };
    }

    // SCENARIO 3: Local developers or other hosting (Fallback to Long Polling)
    console.log("[Telegram Integration] Starting fallback autonomous Long Polling...");
    try {
      console.log("[Telegram Integration] Deleting webhook to unlock polling...");
      await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook?drop_pending_updates=true`);
    } catch (err: any) {
      console.warn("[Telegram Integration] Webhook clear failed prior to polling:", err.message || err);
    }

    // Start background polling loop asynchronously (do not block startServer init!)
    (async () => {
      let offset = 0;
      webhookHistory.push({
        timestamp: new Date().toISOString(),
        status: "polling_started",
        message: "Автономный фоновый опрос (Long Polling) успешно запущен."
      });

      while (true) {
        try {
          const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&timeout=25&allowed_updates=["message"]`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
          }
          const data: any = await response.json();
          if (!data.ok) {
            throw new Error(data.description || "OK: false");
          }

          const updates = data.result || [];
          for (const update of updates) {
            offset = update.update_id + 1;

            const historyEntry: any = {
              timestamp: new Date().toISOString(),
              body: update,
              status: "polling_received",
              error: null,
              extractedId: null,
              savedMessage: null
            };

            webhookHistory.push(historyEntry);
            if (webhookHistory.length > 30) webhookHistory.shift();

            const message = update.message;
            if (!message) continue;

            const replyTo = message.reply_to_message;
            const replyText = message.text;

            if (!replyTo || !replyText) continue;

            const originalText = replyTo.text || replyTo.caption || "";
            const match = originalText.match(/(?:ID|ID диалога):\s*([A-Za-z0-9-]+)/i);
            if (!match) continue;

            const conversationIdStr = match[1];
            const conversationId = parseInt(conversationIdStr, 10);
            if (isNaN(conversationId)) continue;

            historyEntry.extractedId = conversationId;

            const { data: dbData, error: dbErr } = await supabase
              .from("support_messages")
              .insert([{ conversation_id: conversationId, sender: "admin", message: replyText }])
              .select();

            if (dbErr) {
              historyEntry.status = "supabase_error";
              historyEntry.error = dbErr.message;
            } else {
              historyEntry.status = "success";
              historyEntry.savedMessage = dbData;
            }
          }
        } catch (err: any) {
          console.error("[Telegram Polling Loop Exception]:", err.message || err);
          await new Promise(resolve => setTimeout(resolve, 8000));
        }
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    })();

    return { mode: "polling", detail: "Автономный опрос (Long Polling) запущен в фоновом режиме" };
  }

  // Trigger integration initialization asynchronously on boot
  initializeTelegramIntegration();

  // Keep track of recently forwarded message IDs and key signatures in-memory to prevent duplicate Telegram alerts
  const forwardedMessageIds = new Set<string>();
  const forwardedMessageKeys = new Set<string>();

  async function sendTelegramMessageDeduplicated(textToSend: string, messageId?: string | number): Promise<boolean> {
    const trimmedText = textToSend.trim();

    // 1. Deduplicate by unique Database Message ID
    if (messageId) {
      const idStr = String(messageId);
      if (idStr && !idStr.startsWith("temp-")) {
        if (forwardedMessageIds.has(idStr)) {
          console.log("[Telegram Deduplicator] Skip sending duplicate message by ID:", idStr);
          return true; // Return success so client is unaffected
        }
        forwardedMessageIds.add(idStr);
        // Keep ID in cache for 60 seconds
        setTimeout(() => {
          forwardedMessageIds.delete(idStr);
        }, 60000);
      }
    }

    // Helper to get normalized key
    const getNormalizedKey = (text: string): string => {
      const idMatch = text.match(/в чате поддержки \(ID:\s*(\d+)\)/i);
      const conversationId = idMatch ? idMatch[1] : "";
      const textMatch = text.split(/💬 Текст:\s*/i);
      const rawMessage = textMatch.length > 1 ? textMatch[1].trim() : text.trim();
      return conversationId ? `convo_${conversationId}:${rawMessage}` : `raw:${rawMessage}`;
    };

    // 2. Extra safety: Deduplicate by exact normalized conversation + message content match to prevent concurrent channel collisions
    const deduplicationKey = getNormalizedKey(trimmedText);
    if (forwardedMessageKeys.has(deduplicationKey)) {
      console.log("[Telegram Deduplicator] Skip sending duplicate message by normalized key match:", deduplicationKey);
      return true; // Return success
    }
    forwardedMessageKeys.add(deduplicationKey);
    setTimeout(() => {
      forwardedMessageKeys.delete(deduplicationKey);
    }, 60000); // Keep content signature in cache for 60 seconds

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("[Telegram Deduplicator] Cannot send: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not configured.");
      return false;
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: trimmedText,
        }),
      });

      const result: any = await response.json();
      if (!result.ok) {
        throw new Error(result.description || "OK is false");
      }
      console.log("[Telegram Deduplicator] Message forwarded successfully to Telegram Chat:", chatId);
      return true;
    } catch (err: any) {
      console.error("[Telegram Deduplicator] Error calling Telegram API:", err.message || err);
      // Clean up cache in case of hard failure so we can support retry attempts
      if (messageId) {
        forwardedMessageIds.delete(String(messageId));
      }
      forwardedMessageKeys.delete(deduplicationKey);
      return false;
    }
  }

  // 1. Health check endpoint
  app.get("/api/health", async (req, res) => {
    res.json({ status: "ok", mode: "polling-independent", time: new Date().toISOString() });
  });

  // 1.5 Secure Bypass route to avoid adblock blocks (generic name without the word "telegram")
  app.post("/api/support-notify", async (req, res) => {
    const { text, messageId } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!text) {
      return res.status(400).json({ error: "Message text is required" });
    }

    if (!botToken || !chatId) {
      console.warn("[Support Notify Route] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not configured on this server.");
      return res.status(500).json({ error: "Telegram configuration is missing on the server" });
    }

    try {
      console.log(`[Support Notify Route] Forwarding message from client request (messageId: ${messageId || "not provided"})...`);
      const success = await sendTelegramMessageDeduplicated(text, messageId);
      if (!success) {
        throw new Error("Deduplicated sending failed");
      }
      return res.json({ success: true });
    } catch (err: any) {
      console.error("[Support Notify Route] Error forwarding message:", err);
      return res.status(500).json({ error: err.message || "Failed to notify Telegram" });
    }
  });

  // 2. Secure Route to Send Messages to Telegram
  app.post("/api/sendTelegram", async (req, res) => {
    const { text } = req.body;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!text) {
      return res.status(400).json({ error: "Message text is required" });
    }

    if (!botToken || !chatId) {
      console.warn("[Telegram Proxy] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables are not configured.");
      return res.status(500).json({ error: "Telegram configuration is missing on the server" });
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });

      const result = await response.json();
      if (!result.ok) {
        throw new Error(result.description || "Failed to send message to Telegram");
      }

      console.log("[Telegram Proxy] Message sent successfully to Telegram");
      return res.json({ success: true });
    } catch (err: any) {
      console.error("[Telegram Proxy] Error forwarding message:", err);
      return res.status(500).json({ error: err.message || "Failed to notify Telegram" });
    }
  });

  // 3. Telegram Webhook: Active and used when running on Render!
  app.post("/api/telegram/webhook", async (req, res) => {
    const update = req.body;
    if (!update) {
      return res.status(400).json({ error: "Empty payload received" });
    }

    const historyEntry: any = {
      timestamp: new Date().toISOString(),
      body: update,
      status: "webhook_received",
      error: null,
      extractedId: null,
      savedMessage: null
    };

    webhookHistory.push(historyEntry);
    if (webhookHistory.length > 30) webhookHistory.shift();

    const message = update.message;
    if (!message) {
      historyEntry.status = "ignored_no_message";
      return res.json({ success: true, remark: "No message parameter" });
    }

    const replyTo = message.reply_to_message;
    const replyText = message.text;

    if (!replyTo) {
      historyEntry.status = "ignored_not_reply";
      return res.json({ success: true, remark: "Not a reply to any message" });
    }

    if (!replyText) {
      historyEntry.status = "ignored_no_text";
      return res.json({ success: true, remark: "Empty update text" });
    }

    // Extract conversation ID from the original admin message
    const originalText = replyTo.text || replyTo.caption || "";
    const match = originalText.match(/(?:ID|ID диалога):\s*([A-Za-z0-9-]+)/i);
    if (!match) {
      console.log(`[Telegram Webhook] Reply detected but no match for ID: "${originalText.substring(0, 60)}..."`);
      historyEntry.status = "ignored_no_id_match";
      return res.json({ success: true, remark: "Dialogue ID not found in original message" });
    }

    const conversationIdStr = match[1];
    const conversationId = parseInt(conversationIdStr, 10);
    if (isNaN(conversationId)) {
      console.log(`[Telegram Webhook] Extracted text ID is non-numeric: ${conversationIdStr}`);
      historyEntry.status = "ignored_invalid_id";
      return res.json({ success: true, remark: "Dialogue ID is not a valid number" });
    }

    historyEntry.extractedId = conversationId;
    console.log(`[Telegram Webhook] Success! Extracted chat ID: ${conversationId}. Direct insert message: "${replyText}"`);

    // Record the reply directly to Support Messages inside Supabase
    const { data: dbData, error: dbErr } = await supabase
      .from("support_messages")
      .insert([
        {
          conversation_id: conversationId,
          sender: "admin",
          message: replyText
        }
      ])
      .select();

    if (dbErr) {
      console.error("[Telegram Webhook] Supabase INSERT error:", JSON.stringify(dbErr, null, 2));
      historyEntry.status = "supabase_error";
      historyEntry.error = dbErr.message || JSON.stringify(dbErr);
      return res.status(500).json({ error: "Failed to persist to database", details: dbErr });
    } else {
      console.log("[Telegram Webhook] Successfully registered support admin response:", dbData);
      historyEntry.status = "success";
      historyEntry.savedMessage = dbData;
      return res.json({ success: true, saved: dbData });
    }
  });

  // 3.1 Setup / Force Refresh Route
  app.post("/api/telegram/setupWebhook", async (req, res) => {
    try {
      const resData = await initializeTelegramIntegration();
      return res.json({ 
        success: true, 
        message: "Инициализация интеграции Telegram успешно перезапущена!", 
        status: resData 
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 3.2 Add a Webhook debug log endpoint so the user can easily see raw messages and payloads from Telegram
  app.get("/api/telegram/webhook-debug", async (req, res) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    let telegramWebhookInfo: any = null;
    let botInfo: any = null;

    if (botToken && !botToken.includes("123456789:ABCdefGhIJKlMnOpQrStUvWxYz") && botToken !== "") {
      try {
        const hookRes = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
        telegramWebhookInfo = await hookRes.json();
      } catch (err: any) {
        telegramWebhookInfo = { ok: false, error: err.message };
      }

      try {
        const botRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        botInfo = await botRes.json();
      } catch (err: any) {
        botInfo = { ok: false, error: err.message };
      }
    }

    res.json({
      status: "active",
      mode: "Long Polling (Независимая интеграция)",
      time: new Date().toISOString(),
      configuredEnvAppUrl: process.env.APP_URL || "Not set as Environment Variable",
      telegramWebhookInfo: telegramWebhookInfo,
      botInfo: botInfo,
      recentUpdatesCount: webhookHistory.length,
      recentUpdates: webhookHistory
    });
  });

  // 3.5 Diagnostics endpoint to check and verify keys
  app.get("/api/diagnose", async (req, res) => {
    const responseData: any = {
      telegram: {
        configured: false,
        botTokenConfigured: false,
        botTokenValue: null,
        chatIdConfigured: false,
        chatIdValue: null,
        botValid: null,
        botName: null,
        webhookUrl: null,
        webhookInfo: null,
        error: null
      },
      supabase: {
        configured: false,
        usingFallback: true,
        url: null,
        keyConfigured: false,
        isConnectionWorking: false,
        tablesCheck: {
          orders: false,
          support_conversations: false,
          support_messages: false,
          reviews: false
        },
        error: null
      },
      env: {
        nodeEnv: process.env.NODE_ENV || "development",
        hasGeminiKey: !!process.env.GEMINI_API_KEY
      }
    };

    // 1. Telegram Audit
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken) {
      const isPlaceholder = botToken.includes("123456789:ABCdefGhIJKlMnOpQrStUvWxYz") || botToken === "";
      responseData.telegram.botTokenConfigured = !isPlaceholder;
      responseData.telegram.botTokenValue = botToken.length > 8 ? botToken.substring(0, 6) + "..." + botToken.substring(botToken.length - 4) : "configured";
    }
    if (chatId) {
      const isPlaceholder = chatId.includes("-1001234567890") || chatId === "";
      responseData.telegram.chatIdConfigured = !isPlaceholder;
      responseData.telegram.chatIdValue = chatId.length > 5 ? chatId.substring(0, 3) + "..." + chatId.substring(chatId.length - 3) : chatId;
    }
    responseData.telegram.configured = responseData.telegram.botTokenConfigured && responseData.telegram.chatIdConfigured;

    if (botToken && responseData.telegram.botTokenConfigured) {
      try {
        // Query basic info
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const tgData = await tgRes.json();
        if (tgData.ok) {
          responseData.telegram.botValid = true;
          responseData.telegram.botName = tgData.result.username || tgData.result.first_name;
        } else {
          responseData.telegram.botValid = false;
          responseData.telegram.error = tgData.description || "Invalid token response";
        }

        // Query Webhook Info
        const hookRes = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
        const hookData = await hookRes.json();
        if (hookData.ok) {
          responseData.telegram.webhookInfo = hookData.result;
          responseData.telegram.webhookUrl = hookData.result.url || "";
        }
      } catch (err: any) {
        responseData.telegram.botValid = false;
        responseData.telegram.error = err.message || "Failed to reach Telegram API";
      }
    }

    // 2. Supabase Audit
    // Is user using customized url/key?
    const rawUrl = (process.env.SUPABASE_URL || "").trim();
    const rawKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "").trim();

    responseData.supabase.url = supabaseUrl;
    responseData.supabase.keyConfigured = !!supabaseKey;
    
    const isUrlCustom = rawUrl && !rawUrl.includes("your-supabase-project") && !rawUrl.includes("your-supabase-url") && rawUrl.length > 10;
    const isKeyCustom = rawKey && !rawKey.includes("your-service-role") && !rawKey.includes("your-key") && rawKey.length > 20;

    responseData.supabase.usingFallback = !(isUrlCustom && isKeyCustom);
    responseData.supabase.configured = isUrlCustom && isKeyCustom;

    try {
      // Run queries to check connection and schema tables
      const ordersRes = await supabase.from("orders").select("id").limit(1);
      responseData.supabase.tablesCheck.orders = !ordersRes.error;
      
      const convsRes = await supabase.from("support_conversations").select("id").limit(1);
      responseData.supabase.tablesCheck.support_conversations = !convsRes.error;

      const msgsRes = await supabase.from("support_messages").select("id").limit(1);
      responseData.supabase.tablesCheck.support_messages = !msgsRes.error;

      const revsRes = await supabase.from("reviews").select("id").limit(1);
      responseData.supabase.tablesCheck.reviews = !revsRes.error;

      responseData.supabase.isConnectionWorking = true;
      if (ordersRes.error || convsRes.error || msgsRes.error || revsRes.error) {
        const errors = [ordersRes.error, convsRes.error, msgsRes.error, revsRes.error]
          .filter(Boolean)
          .map(e => e?.message)
          .join("; ");
        responseData.supabase.error = errors || "Some tables might be missing";
      }
    } catch (err: any) {
      responseData.supabase.isConnectionWorking = false;
      responseData.supabase.error = err.message || "Exception during database queries";
    }

    res.json(responseData);
  });

  // 4. Vite Dev/Prod Static Files Middleware setup
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Running in DEVELOPMENT mode. Mounting Vite Dev Server Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Running in PRODUCTION mode. Serving precompiled static bundles...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Support Chat Back-end active on port ${PORT}`);
  });
}

startServer();
