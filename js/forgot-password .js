import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

const form = document.getElementById("forgot-form");
const msg = document.getElementById("forgot-msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "Sending reset link...";

  const email = document.getElementById("forgot-email").value.trim();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://linkpitara.netlify.app/reset-password.html",
  });

  if (error) {
    msg.textContent = "❌ " + error.message;
  } else {
    msg.textContent = "✅ Reset link sent! Check your email.";
  }
});
