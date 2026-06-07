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

  // Polling/Webhook debugging store
  const webhookHistory: any[] = [];

  // TELEGRAM LONG POLLING IMPLEMENTATION
  async function startTelegramPolling() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken || botToken.includes("123456789:ABCdefGhIJKlMnOpQrStUvWxYz") || botToken === "") {
      console.log("[Telegram Polling] Bot token is not configured or is a placeholder. Polling disabled.");
      return;
    }

    console.log("[Telegram Polling] Initializing independently of Make.com. Deleting old webhook...");
    try {
      const delRes = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook?drop_pending_updates=true`);
      const delData: any = await delRes.json();
      console.log("[Telegram Polling] Webhook delete response:", delData);
    } catch (err) {
      console.error("[Telegram Polling] Failed to clear webhook prior to polling:", err);
    }

    let offset = 0;
    console.log("[Telegram Polling] Polling started successfully. Listening for replies in Telegram groups.");

    // Simple status track in history
    webhookHistory.push({
      timestamp: new Date().toISOString(),
      status: "polling_started",
      message: "Независимый сервис Long Polling успешно запущен."
    });

    while (true) {
      try {
        const url = `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset}&timeout=25&allowed_updates=["message"]`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Telegram API responded with HTTP status ${response.status}`);
        }
        
        const data: any = await response.json();
        if (!data.ok) {
          throw new Error(data.description || "Telegram returned OK: false");
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
          if (!message) {
            historyEntry.status = "ignored_no_message";
            continue;
          }

          const replyTo = message.reply_to_message;
          const replyText = message.text;

          if (!replyTo) {
            historyEntry.status = "ignored_not_a_reply";
            continue;
          }

          if (!replyText) {
            historyEntry.status = "ignored_no_text";
            continue;
          }

          // Extract original message text to find the conversation ID
          const originalText = replyTo.text || replyTo.caption || "";
          const match = originalText.match(/(?:ID|ID диалога):\s*([A-Za-z0-9-]+)/i);
          if (!match) {
            console.log(`[Telegram Polling] Reply found but no ID: "${originalText.substring(0, 60)}..."`);
            historyEntry.status = "ignored_no_id_match";
            historyEntry.original_message_text = originalText;
            continue;
          }

          const conversationIdStr = match[1];
          const conversationId = parseInt(conversationIdStr, 10);
          if (isNaN(conversationId)) {
            console.log(`[Telegram Polling] Extracted conversation ID is not a valid number: ${conversationIdStr}`);
            historyEntry.status = "ignored_invalid_id";
            continue;
          }
          
          historyEntry.extractedId = conversationId;
          console.log(`[Telegram Polling] Extracted conversation ID: ${conversationId}. Saving reply: "${replyText}"`);

          // Insert directly into Supabase support_messages with sender 'admin'
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
            console.error("[Telegram Polling] Supabase INSERT error:", JSON.stringify(dbErr, null, 2));
            historyEntry.status = "supabase_error";
            historyEntry.error = dbErr.message || JSON.stringify(dbErr);
          } else {
            console.log("[Telegram Polling] Successfully inserted support reply:", dbData);
            historyEntry.status = "success";
            historyEntry.savedMessage = dbData;
          }
        }
      } catch (err: any) {
        console.error("[Telegram Polling] Error in polling loop:", err.message || err);
        // Wait 6 seconds before retrying on general errors
        await new Promise(resolve => setTimeout(resolve, 6000));
      }
      // Breathing time between calls
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  // Start back-end polling asynchronously
  startTelegramPolling();

  // 1. Health check endpoint
  app.get("/api/health", async (req, res) => {
    res.json({ status: "ok", mode: "polling-independent", time: new Date().toISOString() });
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

  // 3. Telegram Webhook: Legacy endpoint. Since we use Long Polling, webhook replies are ignored here.
  app.post("/api/telegram/webhook", async (req, res) => {
    console.log("[Telegram Webhook] Received incoming webhook post. Ignoring as we use Long Polling mode.");
    return res.json({ success: true, remark: "Long Polling is active. This webhook payload was ignored." });
  });

  // 3.1 Setup Webhook route - converted to Webhook Cleanser and Long Polling force-trigger
  app.post("/api/telegram/setupWebhook", async (req, res) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken || botToken.includes("123456789:ABCdefGhIJKlMnOpQrStUvWxYz") || botToken === "") {
      return res.status(400).json({ error: "Токен Telegram не настроен или содержит плейсхолдер. Настройте его в Secrets!" });
    }

    try {
      console.log(`[Telegram Setup] Deleting old Telegram webhooks to guarantee Long Polling operates cleanly...`);
      const delWebhookRes = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook?drop_pending_updates=true`);
      const delWebhookData: any = await delWebhookRes.json();

      if (!delWebhookData.ok) {
        throw new Error(delWebhookData.description || "Telegram returned an error during deleteWebhook");
      }

      return res.json({ 
        success: true, 
        message: "Вебхук Telegram успешно удален/сброшен! Наш сервер переведен на автономный фоновый опрос (Long Polling). Процесс полностью независим от внешних сервисов утилит (таких как Make.com).",
        telegramResponse: delWebhookData 
      });
    } catch (err: any) {
      console.error("[Telegram Setup] Error dropping webhook:", err);
      return res.status(500).json({ error: err.message || "Не удалось сбросить вебхук в Телеграм" });
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
