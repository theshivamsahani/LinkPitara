import { createClient } from "https://esm.sh/@supabase/supabase-js";

document.addEventListener("DOMContentLoaded", () => {
  const supabase = createClient(
    "https://nlsfpgzpesdbumlfutqd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sc2ZwZ3pwZXNkYnVtbGZ1dHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxMDU0NDYsImV4cCI6MjA2ODY4MTQ0Nn0.k5j7-zTLIezMlA1M_RF6UkbYDbW8M6V69IvFWx8AR6M"
  );

  const emailEl = document.getElementById("email");
  const statusEl = document.getElementById("status");
  const expiryEl = document.getElementById("expiry");
  const logoutBtn = document.getElementById("logout");
  const shortenBtn = document.getElementById("shorten-btn");
  const longUrlInput = document.getElementById("long-url");
  const customInput = document.getElementById("custom-alias");
  const customBox = document.getElementById("custom-link-box");
  const output = document.getElementById("short-link-output");
  const resultBox = document.getElementById("short-link-result");
  const copyBtn = document.getElementById("copy-btn");
  const loading = document.getElementById("loading");
  const premiumSection = document.getElementById("premium-section");
  const buyPremiumBtn = document.getElementById("buy-premium");
  const linksBody = document.getElementById("links-body");

  let currentUser = null;
  let isPremium = false;
  let premiumExpiry = null;

  const waitForSession = async () => {
    return new Promise((resolve) => {
      const check = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) resolve(session.user);
        else setTimeout(check, 200);
      };
      check();
    });
  };

  const checkPremiumStatus = async (userId) => {
    const { data, error } = await supabase
      .from("premium")
      .select("expires_at")
      .eq("user_id", userId)
      .single();

    if (error || !data?.expires_at) {
      return false;
    }

    const now = new Date();
    const expiresAt = new Date(data.expires_at);
    premiumExpiry = expiresAt;
    return expiresAt > now;
  };

  const checkAuth = async () => {
    loading.classList.remove("hidden");
    currentUser = await waitForSession();

    if (!currentUser) {
      alert("Please login first.");
      window.location.href = "login.html";
      return;
    }

    emailEl.textContent = `Logged in as: ${currentUser.email}`;

    isPremium = await checkPremiumStatus(currentUser.id);

    statusEl.textContent = isPremium ? "🎉 You are a premium member" : "🚀 You are a free user";
    expiryEl.textContent = isPremium
      ? `Membership expires on: ${premiumExpiry.toDateString()}`
      : "";

    customBox.classList.toggle("hidden", !isPremium);
    premiumSection.classList.toggle("hidden", isPremium);

    await fetchLinks();
    loading.classList.add("hidden");
  };

  shortenBtn.addEventListener("click", async () => {
    const longUrl = longUrlInput.value.trim();
    const customAlias = customInput.value.trim();

    if (!longUrl) return alert("Enter a valid long URL.");
    loading.classList.remove("hidden");

    const shortId = isPremium && customAlias ? customAlias : generateRandomId();

    const { error } = await supabase.from("links").insert([{
      user_id: currentUser.id,
      short_id: shortId,
      long_url: longUrl,
    }]);

    if (error) {
      alert("❌ " + error.message);
      loading.classList.add("hidden");
      return;
    }

    const fullUrl = `${window.location.origin}/${shortId}`;
    output.value = fullUrl;
    resultBox.classList.remove("hidden");
    longUrlInput.value = "";
    customInput.value = "";
    await fetchLinks();
    loading.classList.add("hidden");
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(output.value);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  });

  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.href = "index.html";
  });

  buyPremiumBtn.addEventListener("click", () => {
    window.location.href = "https://link.badal.lena";
  });

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    linksBody.innerHTML = "";
    if (error || !data.length) {
      linksBody.innerHTML = `<tr><td colspan="4">No links found.</td></tr>`;
      return;
    }

    data.forEach(link => {
      const shortUrl = `${window.location.origin}/${link.short_id}`;
      linksBody.innerHTML += `
        <tr>
          <td><a href="${shortUrl}" target="_blank">${shortUrl}</a></td>
          <td>${link.long_url}</td>
          <td>${new Date(link.created_at).toLocaleString()}</td>
          <td>
            <button class="btn-small" onclick="copyLink('${shortUrl}')">Copy</button>
            <button class="btn-small danger" onclick="deleteLink('${link.short_id}')">Delete</button>
          </td>
        </tr>`;
    });
  };

  window.copyLink = (url) => navigator.clipboard.writeText(url);
  window.deleteLink = async (shortId) => {
    if (!confirm("Delete this link?")) return;
    loading.classList.remove("hidden");

    await supabase
      .from("links")
      .delete()
      .eq("user_id", currentUser.id)
      .eq("short_id", shortId);

    await fetchLinks();
    loading.classList.add("hidden");
  };

  const generateRandomId = () => Math.random().toString(36).substring(2, 8);

  checkAuth();
});
