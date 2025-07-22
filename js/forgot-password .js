import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("forgot-form");
  const emailInput = document.getElementById("email");
  const statusMsg = document.getElementById("status-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email) {
      statusMsg.textContent = "Please enter your email.";
      statusMsg.classList.remove("hidden");
      statusMsg.style.color = "red";
      return;
    }

    statusMsg.textContent = "Sending reset link...";
    statusMsg.classList.remove("hidden");
    statusMsg.style.color = "#555";

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://linkpitara.netlify.app/reset-password.html"
    });

    if (error) {
      statusMsg.textContent = "❌ " + error.message;
      statusMsg.style.color = "red";
    } else {
      statusMsg.textContent = "✅ Reset link sent! Please check your inbox.";
      statusMsg.style.color = "green";
    }
  });
});
