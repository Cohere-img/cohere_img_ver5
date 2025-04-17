import styles from "./page.module.css";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import type { Metadata } from "next";
import AboutContent from "./_components/AboutContent";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cohere.img | About",
        description:
            "Cohere.imgについて。Web制作、デザイン、クリエイティブを通じて、お客様の想いを形にする個人デザインスタジオです。",
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
            canonical: "https://cohere-img.design/about",
        },
    };
}

export default function Home() {
    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <AboutContent />
                <Footer />
            </div>
        </>
    );
}
