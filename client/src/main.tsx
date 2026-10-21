import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

Sentry.init({
  dsn: "https://b24d1b0300f39c8480867ed15cd23781@o4512295463485440.ingest.us.sentry.io/4512295496122368",
  enabled: window.location.hostname === "timetracker-front-prod.onrender.com",
  environment: "production",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: {
      request: false,
      response: false,
    },
    httpBodies: [],
    urlQueryParams: false,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary
      fallback={
        <p>
          Ocurrió un error inesperado. Recargá la página para volver a intentar.
        </p>
      }
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
);
