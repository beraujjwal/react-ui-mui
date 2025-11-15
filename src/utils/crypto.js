// utils/crypto.js

// Convert between text and ArrayBuffer
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

// Create encryption key
export async function generateKey(secret) {
  const enc = textEncoder.encode(secret);
  const hash = await crypto.subtle.digest("SHA-256", enc);
  return crypto.subtle.importKey("raw", hash, "AES-GCM", false, ["encrypt", "decrypt"]);
}

// Encrypt text
export async function encryptText(plainText, secret) {
  const key = await generateKey(secret);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = textEncoder.encode(plainText);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedText);

  // Combine IV + Cipher
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combined)); // base64 encoded
}

// Decrypt text
export async function decryptText(cipherText, secret) {
  const data = Uint8Array.from(atob(cipherText), (c) => c.charCodeAt(0));
  const iv = data.slice(0, 12);
  const encrypted = data.slice(12);
  const key = await generateKey(secret);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  return textDecoder.decode(decrypted);
}
