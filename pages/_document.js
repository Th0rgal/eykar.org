import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head />
            <title>Age of Eykar</title>

            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#18150A" />
            <meta property="og:site_name" content="A decentralizied strategy game" />
            <meta property="og:title" content="Age of Eykar ⚔️" />
            <meta property="og:type" content="website" />
            <meta property="og:description" content="An infinite, unpredictable world driven by a decentralized smartcontract. Expand your empire and conquer the world." />
            <meta property="og:url" content="%PUBLIC_URL%" />
            <meta property="og:image" content="%PUBLIC_URL%/logo512.png" />
            <meta name="description" content="An infinite, unpredictable world driven by a decentralized smartcontract" />

            <link rel="icon" href="/favicon.ico" />

            <body className="default_background_color">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}