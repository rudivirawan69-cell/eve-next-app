import { defineAgent } from "eve";

export default defineAgent({
  // Gateway model id (works with Vercel AI Gateway / OIDC when deployed)
  model: "openai/gpt-4.1-mini",
});
