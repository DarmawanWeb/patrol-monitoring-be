import cors from "cors";
import { env } from "@config/env.js";

export const corsConfig = cors({
  origin: env.cors.origin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
});
