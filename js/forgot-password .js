import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

document.getElementById("forgot-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const status = document.getElementById("status-message");

  status.textContent = "Sending reset link...";
  status.style.color = "#333";

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://linkpitara.netlify.app/reset-password.html"
  });

  if (error) {
    status.textContent = "❌ " + error.message;
    status.style.color = "red";
  } else {
    status.textContent = "✅ Reset link sent! Check your inbox.";
    status.style.color = "green";
  }
});
