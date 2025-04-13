"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./NewsMiniList.module.css";
import { getNews, Topic } from "@/libs/client";

export default function NewsMiniList() {
    const [newsItems, setNewsItems] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNews({ limit: 3 }); // 最大3件取得
                setNewsItems(data);
            } catch (error) {
                console.error("Error fetching News:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!newsItems.length) {
        return <p>No News available.</p>;
    }

    return (
        <>
            <div className={styles.newsItemBox}>
                {newsItems.map((news) => (
                    <article key={news.id} className={styles.newsItem}>
                        <Link
                            href={`/news/${news.id}`}
                            className={styles.NewsList}
                        >
                            <div className={styles.newsImg}>
                                <Image
                                    src={news.poster.url}
                                    alt={news.title}
                                    width={300}
                                    height={200}
                                />
                            </div>
                            <div className={styles.newsDate}>
                                <p>
                                    {new Date(news.createdAt)
                                        .toLocaleDateString("ja-JP", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })
                                        .replace(/\//g, ".")}
                                </p>
                            </div>
                            <div className={styles.newsItemTitle}>
                                <h3>{news.title}</h3>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}
