import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyles, createStylesServer } from "@mantine/next";
import createEmotionCache from "../create-emotion-cache";

const stylesServer = createStylesServer(createEmotionCache());

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
