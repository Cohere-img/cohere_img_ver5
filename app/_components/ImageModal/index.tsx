"use client";

import { useEffect } from "react";
import styles from "./ImageModal.module.css";

type ImageModalProps = {
    src: string;
    alt: string;
    onClose: () => void;
};

export default function ImageModal({ src, alt, onClose }: ImageModalProps) {
    // ESCキーでモーダルを閉じる
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscKey);
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [onClose]);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <img src={src} alt={alt} className={styles.modalImage} />
            </div>
        </div>
    );
}
