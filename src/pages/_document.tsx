import React from 'react';
import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
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
}

export default MyDocument;
