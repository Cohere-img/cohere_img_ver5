"use client";

import { createContactData, ContactFormState } from "@/app/_actions/contact";
import { useActionState } from "react";
import styles from "./index.module.css";

const initialState: ContactFormState = {
    status: "",
    message: "",
};

export default function ContactForm() {
    const [state, formAction] = useActionState<ContactFormState, FormData>(
        createContactData,
        initialState
    );
    console.log(state);
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
        <form className={styles.form} action={formAction}>
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
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="email">
                        E-Mail
                    </label>
                    <input
                        className={styles.textfield}
                        type="text"
                        id="email"
                        name="email"
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label} htmlFor="web_site_url">
                        web-site URL{" "}
                    </label>
                    <input
                        className={styles.textfield}
                        type="text"
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
                    />
                </div>
                <div className={styles.actions}>
                    {state.status === "error" && (
                        <p className={styles.error}>{state.message}</p>
                    )}
                    <input
                        type="submit"
                        value="Send"
                        className={styles.button}
                    />
                </div>
            </div>
        </form>
    );
}
