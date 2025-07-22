import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://nlsfpgzpesdbumlfutqd.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M";
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;
  const shortId = path.split("/")[1];

  const message = document.getElementById("message");

  if (!shortId) {
    message.innerText = "❌ Invalid short link";
    return;
  }

  try {
    const { data, error } = await supabase
      .from("links")
      .select("long_url")
      .eq("short_id", shortId)
      .single();

    if (error || !data) {
      message.innerText = "❌ Short link not found.";
      return; // ❗Do NOT reload
    }

    // ✅ Redirect to the original long URL
    window.location.href = data.long_url;

  } catch (e) {
    message.innerText = "🚫 Something went wrong.";
    console.error(e);
  }
});