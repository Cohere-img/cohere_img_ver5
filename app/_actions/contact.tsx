"use server";

export interface ContactFormState {
    status: "error" | "success" | "";
    message: string;
}

export async function createContactData(
    _prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const rawFormData = {
        firstname: formData.get("firstname") as string,
        company_name: formData.get("company_name") as string,
        email: formData.get("email") as string,
        web_site_url: formData.get("web_site_url") as string,
        comment: formData.get("comment") as string,
        recaptcha_token: formData.get("recaptcha_token") as string,
    };

    // Validate reCAPTCHA token
    try {
        if (!rawFormData.recaptcha_token) {
            return {
                status: "error",
                message: "reCAPTCHAの検証に失敗しました。",
            };
        }

        const recaptchaRes = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${rawFormData.recaptcha_token}`,
            }
        );

        if (!recaptchaRes.ok) {
            throw new Error("reCAPTCHA verification failed");
        }

        const recaptchaData = await recaptchaRes.json();

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
            return {
                status: "error",
                message: "不正なアクセスの可能性があります。",
            };
        }
    } catch (error) {
        console.error("reCAPTCHA verification failed:", error);
        return {
            status: "error",
            message: "reCAPTCHAの検証に失敗しました。",
        };
    }

    // Validate required fields
    if (!rawFormData.firstname?.trim()) {
        return {
            status: "error",
            message: "名前を入力してください",
        };
    }
    if (!rawFormData.email?.trim()) {
        return {
            status: "error",
            message: "メールアドレスを入力してください",
        };
    }
    if (!rawFormData.comment?.trim()) {
        return {
            status: "error",
            message: "メッセージを入力してください",
        };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawFormData.email)) {
        return {
            status: "error",
            message: "有効なメールアドレスを入力してください",
        };
    }

    // Submit to HubSpot
    try {
        const result = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fields: [
                        {
                            objectTypeId: "0-1",
                            name: "firstname",
                            value: rawFormData.firstname,
                        },
                        {
                            objectTypeId: "0-1",
                            name: "company_name",
                            value: rawFormData.company_name || "",
                        },
                        {
                            objectTypeId: "0-1",
                            name: "email",
                            value: rawFormData.email,
                        },
                        {
                            objectTypeId: "0-1",
                            name: "web_site_url",
                            value: rawFormData.web_site_url || "",
                        },
                        {
                            objectTypeId: "0-1",
                            name: "comment",
                            value: rawFormData.comment,
                        },
                    ],
                }),
            }
        );

        if (!result.ok) {
            throw new Error("HubSpot submission failed");
        }

        return { status: "success", message: "SUCCESS" };
    } catch (error) {
        console.error("Failed to submit form:", error);
        return {
            status: "error",
            message: "フォームの送信に失敗しました。",
        };
    }
}

export async function contact(
    _prevState: ContactFormState,
    formData: FormData
): Promise<ContactFormState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return {
            status: "error",
            message: "すべてのフィールドを入力してください。",
        };
    }

    try {
        // ここにメール送信のロジックを実装
        // 例: nodemailerを使用する場合
        // const transporter = nodemailer.createTransport({...});
        // await transporter.sendMail({...});
        return {
            status: "success",
            message: "メッセージを送信しました。",
        };
    } catch (error) {
        console.error("Failed to send email:", error);
        return {
            status: "error",
            message: "メッセージの送信に失敗しました。",
        };
    }
}
