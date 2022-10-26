import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Encode+Sans+Condensed:wght@400;700&family=Encode+Sans:wght@400;700&family=Trirong:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <meta name="theme-color" content="#16191d" />

            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
