// app/api/spree/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE = "https://demo.spreecommerce.org/api/v2";

export async function GET(req: NextRequest, context: { params: any }) {
    // 1. Unwrap params vì nó là Promise
    const params = await context.params;

    // 2. Lấy pathArray an toàn
    const pathArray: string[] = Array.isArray(params.path) ? params.path : [];

    const url = `${API_BASE}/${pathArray.join("/")}`;
    const search = req.nextUrl.searchParams.toString();
    const fullUrl = search ? `${url}?${search}` : url;


    try {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.substring(7)
            : null;
        const orderToken = req.headers.get("x-spree-order-token");

        const response = await axios.get(fullUrl, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...(orderToken ? { "X-Spree-Order-Token": orderToken } : {}),
            },
        });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Spree API error:", err.response?.data || err.message);
        return NextResponse.json({ error: err.message }, { status: err.response?.status || 500 });
    }
}
