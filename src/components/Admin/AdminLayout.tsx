"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackToTop from "../BackToTop";
import HeaderAdmin from "./Header";
import Loading from "../loadling";
import FooterAdmin from "./Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token"); // Hoặc document.cookie
        if (!token) {
            router.replace("/login"); // Nếu không có token, redirect về login
        } 
    },[]);

    return (
        <html lang="en">
            <body
                className={`antialiased flex flex-col w-full h-full`}
            >
                <BackToTop />
                <HeaderAdmin />
                <Loading />
                <main className="min-h-[60vh]">{children}</main>
                <FooterAdmin />
            </body>
        </html>
    );
}
