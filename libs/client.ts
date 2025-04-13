import { createClient, MicroCMSQueries } from "microcms-js-sdk";
import type { MicroCMSListContent } from "microcms-js-sdk";

// 必要な型をエクスポート
export type { MicroCMSQueries, MicroCMSImage } from "microcms-js-sdk";

// Works 型定義
export type Work = {
    id: string;
    title: string;
    category: Category | null;
    worksType: string;
    date: string;
    eyechatch: {
        url: string;
        height: number;
        width: number;
    };
    webSiteURL: string;
    charge: string[];
    productList: string;
    productTitle1: string;
    process1: string;
    productImg2?: {
        url: string;
        height: number;
        width: number;
    };
    productTitle2?: string;
    process2?: string;
    productImg3?: {
        url: string;
        height: number;
        width: number;
    };
    productTitle3?: string;
    process3?: string;
    productImg4?: {
        url: string;
        height: number;
        width: number;
    };
    productTitle4?: string;
    process4?: string;
    productImg5?: {
        url: string;
        height: number;
        width: number;
    };
    productTitle5?: string;
    process5?: string;
    otherImg: Array<{
        url: string;
        height: number;
        width: number;
    }>;
};

// Categories 型定義
export type Category = {
    id: string;
    name: string;
} & MicroCMSListContent;

if (!process.env.SERVICE_DOMAIN) {
    throw new Error("SERVICE_DOMAIN is required");
}

if (!process.env.API_KEY) {
    throw new Error("API_KEY is required");
}

// microCMS クライアントの作成
export const client = createClient({
    serviceDomain: process.env.SERVICE_DOMAIN || "",
    apiKey: process.env.API_KEY || "",
});

/**
 * カテゴリー一覧を取得する関数
 */
export const getCategories = async (
    queries?: MicroCMSQueries
): Promise<Category[]> => {
    try {
        const data = await client.getList<Category>({
            endpoint: "categories", // エンドポイント名
            queries,
        });
        return data.contents;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

/**
 * 作品データを取得する関数
 */
export const getWorkById = async (
    contentId: string,
    queries?: MicroCMSQueries
): Promise<Work & { categoryName: string }> => {
    try {
        // 作品データを取得
        const data = await client.get<Work>({
            endpoint: "works",
            contentId,
            queries,
        });

        // categoryがnullの場合は"未分類"を設定
        const categoryName = data.category?.name || "未分類";

        return { ...data, categoryName };
    } catch (error) {
        console.error("Error fetching work data:", error);
        throw new Error("Failed to fetch work data");
    }
};

/**
 * カテゴリーIDと名前のマッピングを取得
 */
export const getCategoryMap = async (): Promise<Record<string, string>> => {
    try {
        const categories = await getCategories();

        const categoryMap: Record<string, string> = {};
        categories.forEach((category) => {
            categoryMap[category.id] = category.name;
        });

        return categoryMap;
    } catch (error) {
        console.error("Error creating category map:", error);
        return {};
    }
};

/**
 * Works データを取得する関数
 */
export const getWorks = async (): Promise<Work[]> => {
    try {
        const works = await client.getList<Work>({
            endpoint: "works",
        });

        return works.contents;
    } catch (error) {
        console.error("Error fetching works:", error);
        return [];
    }
};

// News 型定義
export type Topic = {
    id: string;
    title: string;
    category: Category; // カテゴリー情報
    poster: {
        url: string;
        height: number;
        width: number;
    };
    contents: string; // HTML形式の本文
    createdAt: string; // 作成日時
};

// News データを取得する関数
export const getNews = async (queries?: MicroCMSQueries): Promise<Topic[]> => {
    try {
        const data = await client.getList<Topic>({
            endpoint: "news",
            queries,
        });

        return data.contents;
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
};
