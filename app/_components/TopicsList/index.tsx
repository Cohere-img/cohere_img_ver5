"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./TopicsList.module.css";
import { getTopics, Topic } from "@/libs/client";

export default function TopicsMiniList() {
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics({ limit: 3 }); // 最大5件取得
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
                                <img
                                    src={topic.poster.url}
                                    alt={topic.title}
                                    width="100%"
                                />
                            </div>
                            <div className={styles.newsDate}>
                                <p>
                                    {new Date(topic.createdAt)
                                        .toISOString()
                                        .split("T")[0]
                                        .replace(/-/g, "/")}
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
