javascript
export default function handler(request, response) {
  // Hanya ijinkan method GET
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method tidak diizinkan' });
  }

  // Mengambil konfigurasi Firebase dari variabel lingkungan produksi Vercel secara aman
  const config = {
    apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || ""
  };

  // Mengembalikan konfigurasi rahasia ke aplikasi klien secara privat saat runtime
  response.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return response.status(200).json(config);
}
