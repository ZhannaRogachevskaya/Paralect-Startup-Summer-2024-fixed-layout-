import "@mantine/core/styles.css";
import "./globals.css";
import "../components/MainLayout/MainLayout.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { NotFound } from "./not-found";

export const metadata = {
  title: "MOVIE SEARCH APP",
};

export function Error({ statusCode }) {
  if (statusCode === 404) {
    return <NotFound />;
  }
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
