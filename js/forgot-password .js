import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M" // your full anon key here
);

const form = document.getElementById("forgot-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("message");
const loader = document.getElementById("loading");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  if (!email) {
    message.textContent = "❌ Please enter a valid email.";
    return;
  }

  loader.classList.remove("hidden");
  message.textContent = "";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://linkpitara.netlify.app/reset-password.html",
  });

  loader.classList.add("hidden");

  if (error) {
    message.textContent = "❌ " + error.message;
  } else {
    message.textContent = "✅ Reset link sent! Check your email.";
    emailInput.value = "";
  }
});
