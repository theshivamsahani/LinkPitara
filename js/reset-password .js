import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M" // your full anon key here
);

const form = document.getElementById("reset-form");
const newPassword = document.getElementById("new-password");
const message = document.getElementById("reset-message");
const loader = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = newPassword.value.trim();
  if (password.length < 6) {
    message.textContent = "❌ Password must be at least 6 characters.";
    return;
  }

  loader.classList.remove("hidden");
  message.textContent = "";

  const { error } = await supabase.auth.updateUser({ password });

  loader.classList.add("hidden");

  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Password updated! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
});
