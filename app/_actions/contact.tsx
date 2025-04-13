"use server";

function validateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export async function createContactData(_prevState: any, formData: FormData) {
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
}
