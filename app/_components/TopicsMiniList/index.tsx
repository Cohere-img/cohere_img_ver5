"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./TopicsMiniList.module.css";
import { getNews, Topic } from "@/libs/client";

export default function TopicsMiniList() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getNews({ limit: 3 }); // 最大5件取得
                setTopics(data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!topics.length) {
        return <p>No topics available.</p>;
    }

    return (
        <>
            <div className={styles.newsItemBox}>
                {topics.map((topic) => (
                    <article key={topic.id} className={styles.newsItem}>
                        <Link
                            href="#"
                            className={`topicsList ${styles.topicsList}`}
                        >
                            <div className={styles.newsImg}>
                                <Image
                                    src={topic.poster.url}
                                    alt={topic.title}
                                    width={300}
                                    height={200}
                                />
                            </div>
                            <div className={styles.newsDate}>
                                <p>
                                    {new Date(topic.createdAt)
                                        .toLocaleDateString("ja-JP", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })
                                        .replace(/\//g, ".")}
                                </p>
                            </div>
                            <div className={styles.newsItemTitle}>
                                <h3>{topic.title}</h3>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </>
    );
}
