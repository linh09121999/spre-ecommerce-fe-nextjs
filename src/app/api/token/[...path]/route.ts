import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_BASE = "https://demo.spreecommerce.org";

export async function POST(req: NextRequest, context: { params: any }) {
    const params = await context.params;
    const pathArray: string[] = Array.isArray(params.path) ? params.path : [];
    const url = `${API_BASE}/${pathArray.join("/")}`;
    const search = req.nextUrl.searchParams.toString();
    const fullUrl = search ? `${url}?${search}` : url;

    try {
        const body = await req.text(); 
        const response = await axios.post(fullUrl, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
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