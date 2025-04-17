import styles from "./page.module.css";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import ContactForm from "../_components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cohere.img | Contact",
    description:
        "Cohere.imgへのお問い合わせはこちらから。Webデザイン、ロゴデザイン、グラフィックデザインなど、お気軽にご相談ください。",
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
        title: "Cohere.img | Contact",
        description:
            "Cohere.imgへのお問い合わせはこちらから。Webデザイン、ロゴデザイン、グラフィックデザインなど、お気軽にご相談ください。",
        images: [
            {
                url: "/default-1200x630.png",
                width: 1200,
                height: 630,
                alt: "Cohere.img Contact",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/default-1200x630.png"],
    },
    alternates: {
        canonical: "https://cohere-img.design/contact",
    },
};

export default function page() {
    return (
        <>
            <div className="bodyInner">
                <Header />
                <section className={styles.contactTop}>
                    <div className={`inner ${styles.contactTopInner}`}>
                        <div className={`pageTitle ${styles.pageTitle}`}>
                            <p>Contact</p>
                        </div>
                        <ContactForm />
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
