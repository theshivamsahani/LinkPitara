import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({ email, password });

  loader.classList.add("hidden");

  if (error) {
    if (error.message.toLowerCase().includes("user already registered")) {
      alert("⚠️ User already exists. Please login.");
    } else {
      alert("❌ Signup failed: " + error.message);
    }
  } else {
    alert("✅ Signup successful. Please check your email to confirm.");
    window.location.href = "login.html";
  }
});
