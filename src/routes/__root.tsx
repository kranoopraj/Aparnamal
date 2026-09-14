import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Amal & Aparna";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Aparna and Amal T S — wedding album. 25 January 2027 at MK Convention Centre, Eramalloor.",
      },
      { name: "theme-color", content: "#6E2430" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-svh bg-paper font-sans text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <Toaster
            position="top-center"
            toastOptions={{
              className:
                "font-sans !bg-cream !text-ink !border-gold/30 !shadow-soft",
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
