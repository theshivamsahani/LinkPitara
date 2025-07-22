import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabase = createClient(
  "https://nlsfpgzpesdbumlfutqd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const loader = document.getElementById("loader");

  loader.classList.remove("hidden");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://linkpitara.netlify.app/email-confirmed.html" // ✅ correct redirect page
    }
  });

  loader.classList.add("hidden");

  if (error) {
    alert("❌ " + error.message);
  } else {
    alert("✅ Signup successful. Please check your email to confirm.");
    window.location.href = "login.html";
  }
});
