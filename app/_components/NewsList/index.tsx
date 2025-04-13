"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { client, News } from "../../../libs/client";
import Link from "next/link";
import styles from "./NewsList.module.css";

export default function NewsList() {
    const [newsItems, setNewsItems] = useState<News[] | null>(null);
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
                const data = await client.getList<News>({
                    endpoint: "news",
                    queries: { limit: 10, offset: offset },
                });

                let newNews = data.contents;

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
                                                .toISOString()
                                                .split("T")[0]
                                                .replace(/-/g, "/")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.newsImg}>
                                <img
                                    src={newsItem.poster.url}
                                    alt={newsItem.title}
                                    width="100%"
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
