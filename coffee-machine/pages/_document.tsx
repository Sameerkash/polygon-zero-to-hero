import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Full-stack Buy me a coffee dapp with Solidity. "
        />

        <meta
          property="og:image"
          content="https://buy-me-a-coffee-with-stacks.vercel.app/preview.jpg"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="buy-me-a-coffee-with-solidity"
          key="ogsitename"
        />
        <meta
          property="og:title"
          content="buy-me-a-coffee-with-solidity"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="An open source about.me like application built using Next.js 13 and Solidity."
          key="ogdesc"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="buy-me-a-coffee-with-Solidity.xyz" />
        <meta
          name="twitter:title"
          content="buy-me-a-coffee-with-Solidity.xyz"
        />
        <meta
          name="twitter:description"
          content="Full-stack Buy me a coffee dapp with Solidity."
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
