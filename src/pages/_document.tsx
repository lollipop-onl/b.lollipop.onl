import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import resetCssStyles from '!!raw-loader!reset-css/reset.css';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import globalStyles from '!!raw-loader!../styles/global.css';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style
              dangerouslySetInnerHTML={{
                __html: resetCssStyles,
              }}
            />
            <style
              dangerouslySetInnerHTML={{
                __html: globalStyles,
              }}
            />
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.13.1/css/solid.css"
            integrity="sha384-wG7JbYjXVhle8f17qIp6KJaO/5PsPzOrT76RgvdRGLHj0yXZZ3jg98yb0GNRv1+M"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.13.1/css/fontawesome.css"
            integrity="sha384-O6duc3QftgMWW3awKiGYswymy288kVFZgGWC/4YCl48Y0codWJRgs8DA0N4dX/zx"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
