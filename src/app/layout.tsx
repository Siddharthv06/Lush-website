import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans, Cinzel } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-logo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lushtradecorptz.com'),
  title: 'Lush Trade Corp Tanzania Limited | Africa’s Most Trusted Sourcing Partner',
  description: 'Lush Trade Corp Tanzania Limited is a dynamic export-import enterprise based in Mtwara & Dar es Salaam, Tanzania. Exporters of Raw Cashew Nuts (RCN 50–55 LBS+ outturn), Cashew Kernels, Pulses, Coffee, and Timber across Africa, Asia, and Europe.',
  keywords: [
    'Tanzania Cashew Nuts Exporter',
    'Raw Cashew Nuts RCN Mtwara',
    'Cashew Nut Kernels W180 W240 W320',
    'Lush Trade Corp Tanzania Limited',
    'Tanzanian Pulses Chickpeas Pigeon Peas Mung Beans',
    'Kilimanjaro Arabica Coffee Export',
    'Teak Wood Timber Tanzania',
    'Mtwara Port Agro Commodities',
  ],
  authors: [{ name: 'Lush Trade Corp Tanzania Limited' }],
  openGraph: {
    title: 'Lush Trade Corp Tanzania Limited | Premier Export-Import Enterprise',
    description: 'Dynamic export-import enterprise based in Mtwara, Tanzania. Sourcing, processing, and trading premium agro-commodities globally.',
    url: 'https://lushtradecorp.com',
    siteName: 'Lush Trade Corp Tanzania Limited',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Tanzania Cashew Nuts Exporter Shipping Port',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} ${cinzel.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname + window.location.search);
              }
            `,
          }}
        />
      </head>
      <body className="font-sans bg-brand-cream text-brand-dark antialiased selection:bg-brand-gold selection:text-brand-dark">
        {/* Global Google Translate Engine container */}
        <div id="google_translate_element" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement(
                    {
                      pageLanguage: 'en',
                      includedLanguages: 'en,sw,hi,vi,ar,fr,zh-CN,es,de',
                      autoDisplay: false,
                    },
                    'google_translate_element'
                  );
                }
              };
            `,
          }}
        />
        <script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />
        <SmoothScroll>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
