declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      MONGO_URL: string;
      JWT_KEY: string;
      CLIENT_URL: string;
    }
  }
}

export {};
