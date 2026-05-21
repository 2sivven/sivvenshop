import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bsnazbqqtrdfongfriyk.supabase.co/rest/v1/";
const supabaseKey = "sb_publishable_5BW1WmAkCPnPLN6no0VM1A_st-bVFst";

export const supabase = createClient(supabaseUrl, supabaseKey);