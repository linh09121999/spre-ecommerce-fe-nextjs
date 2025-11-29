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
        const token = authHeader?.startsWith("Bearer")
            ? authHeader.substring(7)
            : null;
        const response = await axios.get(fullUrl, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Spree API error:", err.response?.data || err.message);
        return NextResponse.json({ error: err.message }, { status: err.response?.status || 500 });
    }
}

export async function POST(req: NextRequest, context: { params: any }) {
    const params = await context.params;
    const pathArray: string[] = Array.isArray(params.path) ? params.path : [];
    const url = `${API_BASE}/${pathArray.join("/")}`;
    const search = req.nextUrl.searchParams.toString();
    const fullUrl = search ? `${url}?${search}` : url;

    try {
        const body = await req.json(); // lấy body JSON
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer")
            ? authHeader.substring(7)
            : null;
        const response = await axios.post(fullUrl, body, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Spree API POST error:", err.response?.data || err.message);
        return NextResponse.json(
            err.response?.data || { error: err.message },
            { status: err.response?.status || 500 }
        );
    }
}

export async function DELETE(req: NextRequest, context: { params: any }) {
    const params = await context.params;
    const pathArray: string[] = Array.isArray(params.path) ? params.path : [];
    const url = `${API_BASE}/${pathArray.join("/")}`;
    const search = req.nextUrl.searchParams.toString();
    const fullUrl = search ? `${url}?${search}` : url
    try {
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer")
            ? authHeader.substring(7)
            : null;
        const response = await axios.delete(fullUrl, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Spree API DELETE error:", err.response?.data || err.message);
        return NextResponse.json(
            err.response?.data || { error: err.message },
            { status: err.response?.status || 500 }
        );
    }
}

export async function PATCH(req: NextRequest, context: { params: any }) {
    const params = await context.params;
    const pathArray: string[] = Array.isArray(params.path) ? params.path : [];
    const url = `${API_BASE}/${pathArray.join("/")}`;
    const search = req.nextUrl.searchParams.toString();
    const fullUrl = search ? `${url}?${search}` : url
    try {
        const body = await req.json();
        const authHeader = req.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer")
            ? authHeader.substring(7)
            : null;
        const response = await axios.patch(fullUrl, body, {
            headers: {
                "Content-Type": "application/vnd.api+json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });

        return NextResponse.json(response.data);
    } catch (err: any) {
        console.error("Spree API PATCH error:", err.response?.data || err.message);
        return NextResponse.json(
            err.response?.data || { error: err.message },
            { status: err.response?.status || 500 }
        );
    }
}
