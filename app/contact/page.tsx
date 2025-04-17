import styles from "./page.module.css";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import ContactForm from "../_components/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
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
        alternates: {
            canonical: "https://cohere-img.design/contact",
        },
    };
}

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
