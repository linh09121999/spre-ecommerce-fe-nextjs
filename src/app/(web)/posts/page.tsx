"use client"
import React, { useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResPosts } from '@/useState/useStatestorefront';
import { ListAllPost } from '@/service/storefront/posts';
import { FaArrowLeft } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Posts: React.FC = () => {
    const router = useRouter();

    const { setLoading, setSelectNav
    } = useStateGeneral()

    const { resPosts_List, setResPosts_List } = useState_ResPosts()

    const getApiPosts = async () => {
        try {
            setLoading(true);
            const res = await ListAllPost()
            setResPosts_List(res.data)
        } catch (error: any) {
            toast.error(`Posts: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        setSelectNav(null)
        getApiPosts()
        AOS.init({
            duration: 2000,
            once: false,
            mirror: true,
        });
    }, [])

    return (
        <>
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-5 lg:text-lg md:text-md text-sm">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <span className="inline-flex items-center justify-center md:w-9 md:h-9 h-6 w-6 bg-white rounded-full shadow hover:shadow-lg transition-all">
                        <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                        Posts
                    </span>
                </button>
            </div>
            <div className="grid gap-5 gird grid-cols-1 md:grid-cols-2 max-w-[1535px] mx-auto px-5 py-5">
                {resPosts_List?.data.map((res, id) => (
                    <button className=" flex flex-col gap-2" key={id}
                        data-aos-duration="1200"
                        data-aos="zoom-in"
                        onClick={() => {
                            router.push(`/post/${res.id}`)
                        }}
                    >
                        <div className="relative group overflow-hidden rounded-xl shadow-lg">
                            <img src={res.attributes.image_url!} alt={res.attributes.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-b-md">
                                <h3 className="text-xl text-white font-semibold mt-1">{res.attributes.title}</h3>
                                <p className="text-white/70 text-sm mt-1">
                                    {res.attributes.author_name} | Published: {new Date(res.attributes.published_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default Posts;