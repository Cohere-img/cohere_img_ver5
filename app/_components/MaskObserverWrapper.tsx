"use client";
import { useEffect } from "react";

export default function MaskObserverWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // ファーストビューで中央にすでに表示されている要素を対象にアニメーションを即時実行
        window.requestAnimationFrame(() => {
            const initialVisibleMasks = Array.from(
                document.querySelectorAll(".mask")
            )
                .filter((el) => {
                    const rect = el.getBoundingClientRect();
                    const vh = window.innerHeight;
                    return rect.top < vh / 2 && rect.bottom > 0; // updated condition
                })
                .sort(
                    (a, b) =>
                        a.getBoundingClientRect().left -
                        b.getBoundingClientRect().left
                );

            initialVisibleMasks.forEach((mask, index) => {
                setTimeout(() => {
                    mask.classList.add("visible");
                }, index * 600);
            });
        });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleMasks = entries
                    .filter((entry) => entry.isIntersecting)
                    .map((entry) => entry.target)
                    .sort((a, b) => {
                        return (
                            a.getBoundingClientRect().left -
                            b.getBoundingClientRect().left
                        );
                    });

                visibleMasks.forEach((mask, index) => {
                    setTimeout(() => {
                        mask.classList.add("visible");
                    }, index * 600); // Stagger animation start times by 0.6s
                    observer.unobserve(mask); // 一度きり実行
                });
            },
            {
                root: null,
                rootMargin: "-50% 0px -50% 0px",
                threshold: 0,
            }
        );

        document
            .querySelectorAll(".mask")
            .forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return <>{children}</>;
}
