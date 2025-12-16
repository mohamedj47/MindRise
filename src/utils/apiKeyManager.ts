// Manages multiple Gemini API keys with rotation (Vite-compatible)

const keys = [
  import.meta.env.VITE_API_KEY,
  import.meta.env.VITE_API_KEY_2,
  import.meta.env.VITE_API_KEY_3,
  import.meta.env.VITE_API_KEY_4,
  import.meta.env.VITE_API_KEY_5,
].filter((key): key is string => Boolean(key && key.trim()));

let currentKeyIndex = 0;

export function getApiKey(): string {
  if (keys.length === 0) {
    throw new Error("❌ No VITE_API_KEY found. Check Vercel env vars.");
  }
  return keys[currentKeyIndex];
}

export function rotateApiKey(): boolean {
  if (keys.length <= 1) return false;

  currentKeyIndex = (currentKeyIndex + 1) % keys.length;
  console.warn("🔁 Gemini API key rotated");
  return true;
}

