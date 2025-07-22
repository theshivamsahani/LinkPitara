import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

const shortenForm = document.getElementById("shorten-form");
const longUrlInput = document.getElementById("long-url");
const resultBox = document.getElementById("short-link-result");
const loader = document.getElementById("loader");

async function getUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
}

function generateRandomId(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "";
  for (let i = 0; i < length; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

shortenForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return;

  resultBox.classList.add("hidden");
  loader.classList.remove("hidden");

  const user = await getUser();

  let shortId = generateRandomId();

  // Premium users can pick custom (future)
  let isPremium = false;
  if (user) {
    const { data: premiumData } = await supabase
      .from("premium")
      .select("*")
      .eq("user_id", user.id)
      .single();
    isPremium = !!premiumData;
  }

  // Save short link in Supabase
  const { data, error } = await supabase
    .from("links")
    .insert([
      {
        user_id: user ? user.id : null,
        long_url: longUrl,
        short_id: shortId
      }
    ]);

  loader.classList.add("hidden");

  if (error) {
    alert("❌ " + error.message);
    return;
  }

  const baseUrl = window.location.origin;
  const shortUrl = `${baseUrl}/${shortId}`;

  resultBox.innerHTML = `
    <p><strong>✅ Short Link:</strong></p>
    <input type="text" value="${shortUrl}" readonly id="short-url-field" />
    <button onclick="copyShortUrl()">Copy</button>
  `;
  resultBox.classList.remove("hidden");
});

window.copyShortUrl = function () {
  const input = document.getElementById("short-url-field");
  input.select();
  document.execCommand("copy");
  alert("🔗 Link copied to clipboard!");
};