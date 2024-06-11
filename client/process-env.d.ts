export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      MONGODB_URI: string;
      MONGODB_DB_NAME: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_CORE_BACKEND_API_URL: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_IMAGE_RETRIEVAL_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_DEFAULT_PHOTO: string;
      NEXT_PUBLIC_FALLBACK_PHOTO: string;
    }
  }
}
