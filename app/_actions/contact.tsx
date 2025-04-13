"use server";

export interface ContactFormState {
    status: "error" | "success";
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
    };

    if (!rawFormData.firstname) {
        return {
            status: "error",
            message: "ERROR 名前を入力してください",
        };
    }
    if (!rawFormData.company_name) {
        return {
            status: "error",
            message: "ERROR 企業名を入力してください",
        };
    }
    if (!rawFormData.email) {
        return {
            status: "error",
            message: "ERROR メールアドレスを入力してください",
        };
    }
    if (!rawFormData.web_site_url) {
        return {
            status: "error",
            message: "ERROR URLを入力してください",
        };
    }
    if (!rawFormData.comment) {
        return {
            status: "error",
            message: "ERROR メッセージを入力してください",
        };
    }

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
                            value: rawFormData.company_name,
                        },
                        {
                            objectTypeId: "0-1",
                            name: "email",
                            value: rawFormData.email,
                        },
                        {
                            objectTypeId: "0-1",
                            name: "web_site_url",
                            value: rawFormData.web_site_url,
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

        console.log("HubSpot response status:", result.status);
        const responseBody = await result.text();
        console.log("HubSpot response body:", responseBody);

        return { status: "success", message: "SUCCESS" };
    } catch (error) {
        console.error("Failed to submit form:", error);
        return {
            status: "error",
            message: "フォームの送信に失敗しました。",
        };
    }
}

async function sendEmail({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    // ここにメール送信のロジックを実装
    // 例: nodemailerを使用する場合
    // const transporter = nodemailer.createTransport({...});
    // await transporter.sendMail({...});
    throw new Error("Not implemented");
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
        await sendEmail({ name, email, message });
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
