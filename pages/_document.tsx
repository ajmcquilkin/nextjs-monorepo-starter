import Document, {
  Html, Head, Main, NextScript
} from 'next/document';

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <title>ITC Vox</title>

          <link rel="preload" href="/fonts/national/National2-Thin.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-ThinItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Extralight.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-ExtralightItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Light.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-LightItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Regular.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-RegularItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Medium.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-MediumItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Bold.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-BoldItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Extrabold.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-ExtraboldItalic.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-Black.otf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/national/National2-BlackItalic.otf" as="font" crossOrigin="" />

          <link rel="preload" href="/fonts/ruzicka/DartmouthRuzicka-Regular.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/ruzicka/DartmouthRuzicka-RegularItalic.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/ruzicka/DartmouthRuzicka-Bold.ttf" as="font" crossOrigin="" />
          <link rel="preload" href="/fonts/ruzicka/DartmouthRuzicka-BoldItalic.ttf" as="font" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
