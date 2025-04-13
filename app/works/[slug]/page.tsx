"use client";

import { client } from "../../../libs/client";
import { Work } from "../../../libs/client";
import styles from "./page.module.css";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import ImageModal from "../../_components/ImageModal";

type CategoryMap = {
    [key: string]: string;
};

export default function WorkPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = use(params);
    const [work, setWork] = useState<Work | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalImage, setModalImage] = useState<{
        src: string;
        alt: string;
    } | null>(null);

    // データ取得
    useEffect(() => {
        const fetchWork = async () => {
            try {
                const data = await client.get<Work>({
                    endpoint: "works",
                    contentId: resolvedParams.slug,
                });
                setWork(data);
            } catch (error) {
                console.error("Error fetching work:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWork();
    }, [resolvedParams.slug]); // resolvedParams.slugを依存配列に追加

    const categoryMap: CategoryMap = {
        web: "Web",
        logo_vi: "Logo / VI",
        graphic: "Graphic",
        visual_content: "Visual / Content",
    };

    // カテゴリーの配列を作成
    const categories = work?.category ? [work.category] : [];

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!work) {
        return <p>Work not found</p>;
    }

    // リッチエディタの画像をクリック可能にするための処理
    const processRichText = (content: string) => {
        return content.replace(
            /<figure[^>]*>([\s\S]*?)<\/figure>/g,
            (match, content) => {
                // 画像のalt属性とsrc属性を抽出
                const altMatch = content.match(/alt="([^"]*)"/);
                const srcMatch = content.match(/src="([^"]*)"/);
                const altValue = altMatch ? altMatch[1] : "";
                const srcValue = srcMatch ? srcMatch[1] : "";

                // figureタグにクラスとonclick属性を追加
                return `<figure class="${altValue}" onclick="window.openImageModal('${srcValue}', '${altValue}')">${content}</figure>`;
            }
        );
    };

    // グローバル関数として画像モーダルを開く関数を定義
    if (typeof window !== "undefined") {
        (
            window as Window &
                typeof globalThis & {
                    openImageModal: (src: string, alt: string) => void;
                }
        ).openImageModal = (src: string, alt: string) => {
            setModalImage({ src, alt });
        };
    }

    return (
        <div className={`bodyInner ${styles.bodyInner}`}>
            <Header />
            <section className={styles.contentInfo}>
                <div className={`inner ${styles.contentInfoInner}`}>
                    <div className={styles.contentTitle}>
                        <h1>{work.title}</h1>
                    </div>
                    <div className={styles.pageIndex}>
                        <p>Contents List Link</p>
                        <ul>
                            {work.productList.split("\n").map((item, index) => (
                                <li key={index}>
                                    <a href={`#product-${index + 1}`}>
                                        <span>{item}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.dateCat}>
                        <ul className={`${styles.date} ${styles.flex}`}>
                            <li className={styles.itemTitle}>Date</li>
                            <li>
                                {new Date(work.date)
                                    .toISOString()
                                    .slice(0, 7)
                                    .replace("-", "/")}
                            </li>
                        </ul>
                        <div className={`${styles.category} ${styles.flex}`}>
                            <p className={styles.itemTitle}>Category</p>
                            <ul>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        {categoryMap[category.id] ||
                                            category.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.charge} ${styles.flex}`}>
                        <p className={styles.itemTitle}>Charge</p>
                        <ul>
                            {work.charge?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.webSiteUrl}>
                        {work.webSiteURL && (
                            <a
                                href={work.webSiteURL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>{work.webSiteURL}</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <section className={styles.posterArea}>
                <img src={work.eyechatch.url} alt="worksImg" width="100%" />
            </section>

            <section className={styles.contentText}>
                <div className={`inner ${styles.contentTextInner}`}>
                    {[
                        {
                            key: "1",
                            title: work.productTitle1,
                            content: work.process1,
                        },
                        {
                            key: "2",
                            posterImg: work.productImg2,
                            title: work.productTitle2,
                            content: work.process2,
                        },
                        {
                            key: "3",
                            posterImg: work.productImg3,
                            title: work.productTitle3,
                            content: work.process3,
                        },
                        {
                            key: "4",
                            posterImg: work.productImg4,
                            title: work.productTitle4,
                            content: work.process4,
                        },
                        {
                            key: "5",
                            posterImg: work.productImg5,
                            title: work.productTitle5,
                            content: work.process5,
                        },
                    ].map(({ key, title, content, posterImg }) =>
                        title && content ? (
                            <div
                                className={styles.infoArea}
                                key={key}
                                id={`product-${key}`}
                            >
                                {posterImg && (
                                    <div className={styles.infoPoster}>
                                        <img
                                            src={posterImg.url}
                                            alt="posterImg"
                                            width="100%"
                                        />
                                    </div>
                                )}
                                <div className={styles.infoName}>
                                    <p>{title}</p>
                                </div>
                                <div className={styles.infoWrapper}>
                                    <div className={styles.infoContent}>
                                        <div
                                            className={styles.infoContentInner}
                                            dangerouslySetInnerHTML={{
                                                __html: processRichText(
                                                    content
                                                ),
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </section>

            <Footer />

            {/* 画像モーダル */}
            {modalImage && (
                <ImageModal
                    src={modalImage.src}
                    alt={modalImage.alt}
                    onClose={() => setModalImage(null)}
                />
            )}
        </div>
    );
}
