import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to proxy Zapier webhook
  app.post("/api/submit-lead", async (req, res) => {
    try {
      const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error("ZAPIER_WEBHOOK_URL is not defined");
      }

      // Proxy the request to Zapier
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Zapier usually returns 200 even if it's just a catch
      res.json({ success: true });
    } catch (error) {
      console.error("Error proxying to Zapier:", error);
      res.status(500).json({ error: "Failed to submit lead" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
