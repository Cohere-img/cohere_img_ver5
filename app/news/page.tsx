"use client";

import styles from "./page.module.css";
import Header from "../_components/Header";
import NewsList from "../_components/NewsList/index";
import Footer from "../_components/Footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cohere.img | News",
        description:
            "Cohere.imgの最新情報。Web制作、デザイン、クリエイティブに関するお知らせやブログを更新しています。",
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
        openGraph: {
            title: "Cohere.img | News",
            description:
                "Cohere.imgの最新情報。Web制作、デザイン、クリエイティブに関するお知らせやブログを更新しています。",
            images: [
                {
                    url: "/ogp/news-1200x630.png",
                    width: 1200,
                    height: 630,
                    alt: "Cohere.img News",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            images: ["/ogp/news-1200x630.png"],
        },
        alternates: {
            canonical: "https://cohere-img.design/news",
        },
    };
}

export default function Home() {
    return (
        <>
            <div className="bodyInner">
                <Header />
                <section className={styles.news}>
                    <div className={`inner ${styles.newsInner}`}>
                        <div className={styles.pageTitle}>
                            <p>News</p>
                        </div>
                        <div className={styles.newsContainerArea}>
                            <NewsList />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
