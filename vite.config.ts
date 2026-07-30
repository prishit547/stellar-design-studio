import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Intercept and handle /api/send-email requests locally
function localApiPlugin() {
  function formatDate(dateStr?: string) {
    if (!dateStr) return "Not provided";
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  }

  return {
    name: "local-api-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/api/send-email" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", async () => {
            try {
              const data = JSON.parse(body);
              console.log("[Local API] Received contact form submission:", data);

              const resendApiKey = process.env.RESEND_API_KEY;
              if (!resendApiKey) {
                console.warn("[Local API] RESEND_API_KEY is not configured locally. Simulating successful send.");
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, mocked: true }));
                return;
              }

              // Simple HTML body matching our premium template
              const emailHtml = `
                <h3>New message from ${data.name}</h3>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> ${formatDate(data.dob)}</p>
                <p><strong>Message:</strong></p>
                <p>${data.message}</p>
              `;

              const response = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${resendApiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: "Socal Family Eye Care <noreply@socalfamilyeyecare.com>",
                  to: "frontdesk@socalfamilyeyecare.com",
                  reply_to: data.email,
                  subject: `[Local Dev] New Inquiry from ${data.name}`,
                  html: emailHtml,
                }),
              });

              if (!response.ok) {
                const errorText = await response.text();
                console.error("[Local API] Resend API failed:", errorText);
                res.writeHead(502, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: "Failed to deliver email via Resend" }));
                return;
              }

              const result = await response.json();
              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ success: true, messageId: result.id }));
            } catch (err) {
              console.error("[Local API] Error handling /api/send-email:", err);
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Internal server error" }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.RESEND_API_KEY = env.RESEND_API_KEY;

  return {
    plugins: [
      tanstackRouter({ routesDirectory: "./src/routes", generatedRouteTree: "./src/routeTree.gen.ts" }),
      react(),
      tailwindcss(),
      tsconfigPaths(),
      localApiPlugin(),
    ],
  };
});
