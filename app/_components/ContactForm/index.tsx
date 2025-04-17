"use client";

import { createContactData, ContactFormState } from "@/app/_actions/contact";
import { useActionState } from "react";
import { useEffect } from "react";
import styles from "./index.module.css";

declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                options: { action: string }
            ) => Promise<string>;
        };
    }
}

const initialState: ContactFormState = {
    status: "",
    message: "",
};

export default function ContactForm() {
    const [state, formAction] = useActionState<ContactFormState, FormData>(
        createContactData,
        initialState
    );

    useEffect(() => {
        const loadReCaptcha = () => {
            const script = document.createElement("script");
            script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
            script.async = true;
            document.body.appendChild(script);
        };

        loadReCaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);

            // reCAPTCHAトークンを取得
            const token = await window.grecaptcha.execute(
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
                { action: "submit" }
            );

            // フォームデータにトークンを追加
            formData.append("recaptcha_token", token);

            // フォーム送信
            formAction(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
            return {
                status: "error",
                message: "フォームの送信に失敗しました。",
            };
        }
    };

    if (state.status === "success") {
        return (
            <p className={styles.success}>
                お問い合わせいただきありがとうございます。
                <br />
                お返事まで今しばらくお待ち下さい。
            </p>
        );
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.wrapper}>
                <div className={styles.item}>
                    <label htmlFor="firstname" className={styles.label}>
                        Name
                    </label>
                    <input
                        className={styles.textfield}
                        type="text"
                        id="firstname"
                        name="firstname"
                        required
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="company_name">
                        Company
                    </label>
                    <input
                        className={styles.textfield}
                        type="text"
                        id="company_name"
                        name="company_name"
                        required
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="email">
                        E-Mail
                    </label>
                    <input
                        className={styles.textfield}
                        type="email"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="web_site_url">
                        web-site URL{" "}
                    </label>
                    <input
                        className={styles.textfield}
                        type="url"
                        id="web_site_url"
                        name="web_site_url"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="comment">
                        Message
                    </label>
                    <textarea
                        className={styles.textarea}
                        id="comment"
                        name="comment"
                        required
                    />
                </div>
                <div className={styles.actions}>
                    {state.status === "error" && (
                        <p className={styles.error}>{state.message}</p>
                    )}
                    <button type="submit" className={styles.button}>
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
}
