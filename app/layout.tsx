import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MaskObserverWrapper from "./_components/MaskObserverWrapper";
import PageTransition from "./_components/PageTransition";
import GoogleAnalytics from "./_components/GoogleAnalytics";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://cohere-img.design"),
    title: {
        default: "Cohere.img",
        template: "%s | Cohere.img",
    },
    description:
        "Cohere.imgは本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。",
    keywords: [
        "Webデザイン",
        "ロゴデザイン",
        "グラフィックデザイン",
        "クリエイティブ",
        "デザインスタジオ",
        "デザイン",
        "フリーランス",
        "フリーランスデザイナー",
        "秋田県",
        "Web制作",
        "Webデザイン",
        "ロゴデザイン",
    ],
    authors: [{ name: "Cohere.img" }],
    creator: "Cohere.img",
    publisher: "Cohere.img",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "ja_JP",
        url: "https://cohere-img.design",
        siteName: "Cohere.img",
        title: "Cohere.img",
        description:
            "Cohere.imgは本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。",
        images: [
            {
                url: "/default-1200x630.png",
                width: 1200,
                height: 630,
                alt: "Cohere.img",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Cohere.img",
        description:
            "Cohere.imgは本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。",
        images: ["/default-1200x630.png"],
        creator: "@cohere_img",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-site-verification-code",
    },
    alternates: {
        canonical: "https://cohere-img.design",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/vuf7dry.css"
                />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <GoogleAnalytics />
                <PageTransition>
                    <MaskObserverWrapper>{children}</MaskObserverWrapper>
                </PageTransition>
            </body>
        </html>
    );
}
