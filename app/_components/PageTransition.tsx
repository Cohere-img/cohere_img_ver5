"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isVisible, setIsVisible] = useState(true);
    const maskRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            requestAnimationFrame(() => {
                const vh = window.innerHeight;
                const initialMasks = Array.from(
                    document.querySelectorAll(".mask")
                )
                    .filter((el) => {
                        const rect = el.getBoundingClientRect();
                        return rect.top < vh / 4 && rect.bottom > 0;
                    })
                    .sort(
                        (a, b) =>
                            a.getBoundingClientRect().left -
                            b.getBoundingClientRect().left
                    );

                initialMasks.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, index * 600);
                });
            });
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (
                href &&
                !href.startsWith("http") &&
                !href.startsWith("#") &&
                href !== pathname
            ) {
                e.preventDefault();
                setIsVisible(true); // まずマスクを表示
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        router.push(href); // マスクが完全に表示された後に遷移
                    }, 600); // CSSアニメーションの duration と一致させる
                });
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [router, pathname]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.target.getBoundingClientRect().left -
                            b.target.getBoundingClientRect().left
                    );

                visibleEntries.forEach((entry, index) => {
                    setTimeout(() => {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }, index * 600);
                });
            },
            {
                rootMargin: "-25% 0px -25% 0px",
                threshold: 0,
            }
        );

        requestAnimationFrame(() => {
            const masks = document.querySelectorAll(".mask");
            masks.forEach((el) => observer.observe(el));
        });

        return () => observer.disconnect();
    }, [pathname]);

    // ページ遷移完了後にマスクを閉じる
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(false);
        });
    }, [pathname]);

    return (
        <>
            <div
                ref={maskRef}
                className={`page-transition-mask ${
                    isVisible ? "enter" : "leave"
                }`}
                style={{ willChange: "transform" }}
            />
            {children}
        </>
    );
}
