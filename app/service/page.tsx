import styles from "./page.module.css";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cohere.img | Service",
    description:
        "Cohere.imgが提供するサービスをご紹介します。Webデザイン、ロゴデザイン、グラフィックデザインなど。",
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
        title: "Cohere.img | Service",
        description:
            "Cohere.imgが提供するサービスをご紹介します。Webデザイン、ロゴデザイン、グラフィックデザインなど。",
        images: [
            {
                url: "/default-1200x630.png",
                width: 1200,
                height: 630,
                alt: "Cohere.img Service",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/default-1200x630.png"],
    },
    alternates: {
        canonical: "https://cohere-img.design/service",
    },
};

export default function Home() {
    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <section className={styles.serviceList}>
                    <div className={`inner ${styles.serviceListInner}`}>
                        <div className={styles.pageTitle}>
                            <p>Service</p>
                        </div>
                        <article className={`inner ${styles.serviceItem}`}>
                            <div className={`mask ${styles.serviceInfo}`}>
                                <div className={styles.serviceTitle}>
                                    <h3>Web</h3>
                                </div>
                                <div className={styles.serviceInfoText}>
                                    <p>
                                        個人の店舗を紹介するサイトや中小企業のコーポレートサイト、採用活動のための採用サイトや物販を行うためのECサイトなど、規模や種類を問わず制作させていただいております。
                                        <br />
                                        WordPressを用いたwebサイト制作や、より安全で表示速度の早いJamstackという作り方でのwebサイト制作も行っており、デザインのみの納品にも対応しております。
                                        <br />
                                        どのような想いや考えを伝えるかについてもデザインしてまいりますが、管理上の負担軽減のための設計についてもデザインします。
                                    </p>
                                </div>
                                <div className={styles.serviceInfoPrice}>
                                    <p className={styles.priceTitle}>
                                        コーポレートサイト
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥500,000-
                                    </p>
                                    <p className={styles.priceTitle}>
                                        ECサイト（BASE使用）
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥400,000-
                                    </p>
                                    <p className={styles.priceTitle}>
                                        デザインのみ
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥200,000-
                                    </p>
                                </div>
                                <div
                                    className={`linkBtn ${styles.serviceLinkBtn}`}
                                >
                                    <Link
                                        href="/works?category=Web"
                                        className={styles.serviceLink}
                                    >
                                        <span>Web works</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={`mask ${styles.serviceImg}`}>
                                <img
                                    src="img/service/web.jpg"
                                    alt="serviceImg"
                                    width="100%"
                                />
                            </div>
                        </article>
                        <article className={`inner ${styles.serviceItem}`}>
                            <div className={`mask ${styles.serviceInfo}`}>
                                <div className={styles.serviceTitle}>
                                    <h3>Logo / VI</h3>
                                </div>
                                <div className={styles.serviceInfoText}>
                                    <p>
                                        店舗や企業、ブランドや商品などのロゴマークを作成させていただきます。
                                        <br />
                                        お客様へのヒアリングや市場の状況を調べながら、大事にしている想いや考え、事業を始めるに至った経緯やその時の心情などからロゴマークに落とし込みます。
                                        <br />
                                        屋号がまだ決まっていなくても、その屋号を一緒に考えるところからお手伝いいたします。
                                        <br />
                                        シンボルマークは識別性を意識し、サイズやロゴマーク使用時の背景に左右されないように考え、ロゴタイプ（フォント）も既存のものを改良したり、一からオリジナルのものを作成いたします。
                                    </p>
                                </div>
                                <div className={styles.serviceInfoPrice}>
                                    <p className={styles.priceTitle}>
                                        ロゴマーク制作
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥100,000-
                                    </p>
                                </div>
                                <div
                                    className={`linkBtn ${styles.serviceLinkBtn}`}
                                >
                                    <Link
                                        href="/works?category=Logo / VI"
                                        className={styles.serviceLink}
                                    >
                                        <span>Logo / VI works</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={`mask ${styles.serviceImg}`}>
                                <img
                                    src="img/service/logo_vi.jpg"
                                    alt="serviceImg"
                                    width="100%"
                                />
                            </div>
                        </article>
                        <article className={`inner ${styles.serviceItem}`}>
                            <div className={`mask ${styles.serviceInfo}`}>
                                <div className={styles.serviceTitle}>
                                    <h3>Graphic</h3>
                                </div>
                                <div className={styles.serviceInfoText}>
                                    <p>
                                        名刺やショップカード、企業案内や各種パンフレットなどの紙媒体のものを作成いたします。
                                        <br />
                                        レイアウトやあしらいのデザインだけではなく、伝えたい情報をまとめ、いただいた原稿やヒアリングの内容から文書を再構成いたします。
                                        <br />
                                        写真素材の撮影も場合によっては承ります。
                                        <br />
                                        （地域によっては写真撮影が行えない場合があります。）
                                        <br />
                                        印刷はご自身で行っていただくことになるので、データでの納品となります。
                                    </p>
                                </div>
                                <div className={styles.serviceInfoPrice}>
                                    <p className={styles.priceTitle}>
                                        名刺・ショップカード
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥20,000-
                                    </p>
                                    <p className={styles.priceTitle}>
                                        パンフレット・冊子
                                    </p>
                                    <div className={styles.priceNumber}>
                                        <ul>
                                            <li>4ページ</li>
                                            <li>8ページ</li>
                                            <li>16ページ</li>
                                        </ul>
                                        <ul>
                                            <li>￥80,000-</li>
                                            <li>￥120,000-</li>
                                            <li>￥160,000-</li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    className={`linkBtn ${styles.serviceLinkBtn}`}
                                >
                                    <Link
                                        href="/works?category=Graphic"
                                        className={styles.serviceLink}
                                    >
                                        <span>Graphic works</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={`mask ${styles.serviceImg}`}>
                                <img
                                    src="img/service/graphic.jpg"
                                    alt="serviceImg"
                                    width="100%"
                                />
                            </div>
                        </article>
                        <article className={`inner ${styles.serviceItem}`}>
                            <div className={`mask ${styles.serviceInfo}`}>
                                <div className={styles.serviceTitle}>
                                    <h3>Visual Contents</h3>
                                </div>
                                <div className={styles.serviceInfoText}>
                                    <p>
                                        プレゼンに用いるスライドや建築の3Dモデルなどを作成いたします。
                                        <br />
                                        構成から一緒に考えることも可能で、御社らしさのある、想いと情報が伝わるプレゼン資料を作成いたします。
                                        <br />
                                        建築の3Dモデルについては可能化限り現実に近づけることだけではなく、あえてデフォルメしてプレゼンやその他の資料に使用する際のイラストや図解としてご利用いただけるように作成することも可能です。
                                    </p>
                                </div>
                                <div className={styles.serviceInfoPrice}>
                                    <p className={styles.priceTitle}>
                                        建築3Dモデル制作
                                    </p>
                                    <p className={styles.priceNumber}>
                                        ￥100,000-
                                    </p>
                                    <p className={styles.priceTitle}>
                                        プレゼン資料
                                    </p>
                                    <div className={styles.priceNumber}>
                                        <ul>
                                            <li>10ページまで</li>
                                            <li>20ページまで</li>
                                        </ul>
                                        <ul>
                                            <li>￥75,000-</li>
                                            <li>￥140,000-</li>
                                        </ul>
                                    </div>
                                </div>
                                <div
                                    className={`linkBtn ${styles.serviceLinkBtn}`}
                                >
                                    <Link
                                        href="/works?category=Visual / Content"
                                        className={styles.serviceLink}
                                    >
                                        <span>Visual Contents works</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={`mask ${styles.serviceImg}`}>
                                <img
                                    src="img/service/visual_contents.png"
                                    alt="serviceImg"
                                    width="100%"
                                />
                            </div>
                        </article>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
