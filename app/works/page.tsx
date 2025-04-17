import Header from "../_components/Header";
import Footer from "../_components/Footer";
import type { Metadata } from "next";
import WorksList from "./_components/WorksList";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cohere.img | Works",
        description:
            "Cohere.imgの制作実績をご紹介します。Webデザイン、ロゴデザイン、グラフィックデザインなど。",
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
        ],
        alternates: {
            canonical: "https://cohere-img.design/works",
        },
    };
}

export default function Home() {
    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <WorksList />
                <Footer />
            </div>
        </>
    );
}
