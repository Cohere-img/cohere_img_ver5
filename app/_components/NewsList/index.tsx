"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { client, Topic } from "../../../libs/client";
import Link from "next/link";
import Image from "next/image";
import styles from "./NewsList.module.css";

export default function NewsList() {
    const [newsItems, setNewsItems] = useState<Topic[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastNewsElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setOffset((prevOffset) => prevOffset + 10);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await client.getList<Topic>({
                    endpoint: "news",
                    queries: { limit: 10, offset: offset },
                });

                const newNews = data.contents;

                if (offset === 0) {
                    setNewsItems(newNews);
                } else {
                    setNewsItems((prevNewsItems) =>
                        prevNewsItems ? [...prevNewsItems, ...newNews] : newNews
                    );
                }

                // 全件取得したかどうかをチェック
                if (newNews.length < 10) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
                if (offset === 0) {
                    setNewsItems([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [offset]);

    if (!newsItems || newsItems.length === 0) {
        return <p>No news found.</p>;
    }

    return (
        <div className={styles.newsItemBox}>
            {newsItems.map((newsItem, index) => {
                // 最後の要素にrefを設定
                const ref =
                    index === newsItems.length - 1 ? lastNewsElementRef : null;

                return (
                    <article
                        key={newsItem.id}
                        className={styles.newsItem}
                        ref={ref}
                    >
                        <Link
                            href={`/news/${newsItem.id}`}
                            className={styles.selectArea}
                            onClick={(e) => {
                                console.log(
                                    `Navigating to /news/${newsItem.id}`
                                );
                                // クリックイベントの伝播を停止
                                e.stopPropagation();
                            }}
                        >
                            <div className={styles.newsInfo}>
                                <div className={styles.newsItemTitle}>
                                    <h2>{newsItem.title}</h2>
                                </div>
                                <div className={styles.newsData}>
                                    <div className={styles.date}>
                                        <p>Date</p>
                                        <p>
                                            {new Date(newsItem.createdAt)
                                                .toLocaleDateString("ja-JP", {
                                                    year: "numeric",
                                                    month: "2-digit",
                                                    day: "2-digit",
                                                })
                                                .replace(/\//g, ".")}
                                        </p>
                                    </div>
                                    <div className={styles.category}>
                                        <p>Category</p>
                                        <p>{newsItem.category.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.newsThumbnail}>
                                <Image
                                    src={newsItem.poster.url}
                                    alt={newsItem.title}
                                    className={styles.thumbnail}
                                    priority={true}
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                        </Link>
                    </article>
                );
            })}
            {loading && <p>Loading more news...</p>}
        </div>
    );
}
