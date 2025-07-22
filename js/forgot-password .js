import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

const form = document.getElementById("forgot-form");
const loader = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loader.classList.remove("hidden");

  const email = document.getElementById("forgot-email").value;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password.html`,
  });

  loader.classList.add("hidden");

  if (error) {
    alert("❌ " + error.message);
  } else {
    alert("📨 Password reset email sent! Check your inbox.");
  }
});