"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { client, Work } from "../../../libs/client";
import Link from "next/link";
import Image from "next/image";
import styles from "./WorksList.module.css";

interface WorksListProps {
    selectedCategory?: string;
}

export default function WorksList({
    selectedCategory = "All",
}: WorksListProps) {
    const [works, setWorks] = useState<Work[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastWorkElementRef = useCallback(
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

    // カテゴリー変更時にオフセットをリセット
    useEffect(() => {
        setOffset(0);
        setHasMore(true);
    }, [selectedCategory]);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                setLoading(true);
                const data = await client.getList<Work>({
                    endpoint: "works",
                    queries: { limit: 10, offset: offset },
                });

                // フィルタリング処理
                let filteredWorks = data.contents;

                // カテゴリーでフィルタリング
                if (selectedCategory !== "All") {
                    const categoryMap: { [key: string]: string } = {
                        Web: "web",
                        "Logo / VI": "logo_vi",
                        Graphic: "graphic",
                        "Visual / Content": "visual_content",
                    };

                    const categoryId = categoryMap[selectedCategory];
                    if (categoryId) {
                        filteredWorks = filteredWorks.filter(
                            (work) => work.category?.id === categoryId
                        );
                    }
                } else {
                    // デフォルトのフィルタリング（すべてのカテゴリーを表示）
                    filteredWorks = filteredWorks.filter(
                        (work) =>
                            work.category?.id === "web" ||
                            work.category?.id === "logo_vi" ||
                            work.category?.id === "graphic" ||
                            work.category?.id === "visual_content"
                    );
                }

                if (offset === 0) {
                    setWorks(filteredWorks);
                } else {
                    setWorks((prevWorks) =>
                        prevWorks
                            ? [...prevWorks, ...filteredWorks]
                            : filteredWorks
                    );
                }

                // 全件取得したかどうかをチェック
                if (filteredWorks.length < 10) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching works:", error);
                if (offset === 0) {
                    setWorks([]);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, [offset, selectedCategory]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!works || works.length === 0) {
        return <p>No works found.</p>;
    }

    return (
        <div className={styles.worksItemBox}>
            {works.map((work, index) => {
                // 最後の要素にrefを設定
                const ref =
                    index === works.length - 1 ? lastWorkElementRef : null;

                return (
                    <article
                        key={work.id}
                        className={styles.worksItem}
                        ref={ref}
                    >
                        <div className={`mask`}>
                            <Link
                                href={`/works/${work.id}`}
                                className={styles.selectArea}
                            >
                                <div className={styles.worksInfo}>
                                    <div className={styles.worksItemTitle}>
                                        <h2>{work.title}</h2>
                                    </div>
                                    <div className={styles.worksData}>
                                        <div className={styles.date}>
                                            <p>Date</p>
                                            <p>{work.date}</p>
                                        </div>
                                        <div className={styles.category}>
                                            <p>Category</p>
                                            <p>{work.category?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.worksImg}>
                                    <Image
                                        src={work.eyechatch.url}
                                        alt={work.title}
                                        className={styles.thumbnail}
                                        priority={true}
                                        style={{ width: "100%" }}
                                    />
                                </div>
                            </Link>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
