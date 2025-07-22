import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

const form = document.getElementById("reset-form");
const loader = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.classList.remove("hidden");

  const newPassword = document.getElementById("new-password").value;

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  loader.classList.add("hidden");

  if (error) {
    alert("❌ " + error.message);
  } else {
    alert("✅ Password updated. You can now log in.");
    window.location.href = "login.html";
  }
});