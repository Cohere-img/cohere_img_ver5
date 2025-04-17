import Header from "./_components/Header";
import Footer from "./_components/Footer";
import type { Metadata } from "next";
import HomeContent from "./_components/HomeContent";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cohere.img | 秋田県のフリーランスWebデザイナー",
        description:
            "秋田県を拠点に活動するフリーランスWebデザイナー。Webサイト制作、ロゴデザイン、グラフィックデザインなど、クリエイティブなソリューションを提供します。",
        keywords: [
            "フリーランス",
            "フリーランスWebデザイナー",
            "秋田県",
            "Web制作",
            "Webデザイン",
            "ロゴデザイン",
            "グラフィックデザイン",
            "クリエイティブ",
            "デザインスタジオ",
            "デザイン",
        ],
        alternates: {
            canonical: "https://cohere-img.design",
        },
    };
}

export default function Home() {
    return (
        <>
            <div className="bodyInner">
                <Header />
                <HomeContent />
                <Footer />
            </div>
        </>
    );
}
