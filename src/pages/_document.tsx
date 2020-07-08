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
