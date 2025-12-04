"use client"
import React, { useEffect, useMemo } from 'react';
import { toast, ToastContainer } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResPosts } from '@/useState/useStatestorefront';
import { ListAllPost, RetrieveAPost } from '@/service/storefront/posts';
import { FaArrowLeft, FaCalendarAlt, FaRegCalendarAlt, FaRegUser, FaUser } from 'react-icons/fa';
const PostDetail: React.FC = () => {
    const router = useRouter();
    const params = useParams();  // Trả về object { id: '123' }
    const { id } = params;

    const { setLoading, setSelectNav
    } = useStateGeneral()

    const { resPosts_Retrieve, setResPosts_Retrieve, resPosts_List, setResPosts_List } = useState_ResPosts()

    const getApiPostRetrieve = async (id: string, include: string) => {
        try {
            setLoading(true);
            const res = await RetrieveAPost(id, { include })
            setResPosts_Retrieve(res.data)
        } catch (error: any) {
            toast.error(`Posts: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

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
        getApiPostRetrieve(String(id), "post_category")
        getApiPosts()
    }, [])

    const filterPost = useMemo(() => {
        return resPosts_List?.data.filter((r) => r.id !== id)
    }, [resPosts_List, id])

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
                        Post / {resPosts_Retrieve?.data.attributes.title}
                    </span>
                </button>
            </div>

            {/* Main Post Section */}
            {resPosts_Retrieve?.data && (
                <>
                    <div className="relative overflow-hidden group shadow-md aspect-[16/6]">
                        <img
                            src={`${resPosts_Retrieve.data.attributes.image_url}`}
                            alt={resPosts_Retrieve.data.attributes.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 rounded-full text-white px-4 py-1 bg-gradient-to-r from-emerald-500 to-green-600 shadow-md backdrop-blur-md text-sm font-medium">
                            {resPosts_Retrieve.data.attributes.post_category_title}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div className="max-w-[1536px] mx-auto flex flex-col gap-5 px-5 py-5">
                        {/* Thumbnail */}


                        {/* Title & Meta */}
                        <div className="flex flex-col gap-5">
                            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-gray-900 leading-tight" >
                                {resPosts_Retrieve.data.attributes.title}
                            </h1>

                            <div className="flex flex-wrap items-center text-gray-500 text-sm gap-5">
                                <div className="flex items-center gap-2">
                                    <FaRegUser className="text-green-500" />
                                    <span>{resPosts_Retrieve.data.attributes.author_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRegCalendarAlt className="text-green-500" />
                                    <span>
                                        {new Date(resPosts_Retrieve.data.attributes.published_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Description / Content */}
                            {resPosts_Retrieve.data.attributes.content_html && (
                                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: resPosts_Retrieve.data.attributes.content_html,
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* Related Posts */}
            <div className="max-w-[1536px] mx-auto px-5 py-10 flex flex-col gap-5">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-semibold tracking-wide ">
                        You may be interested
                    </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filterPost?.map((res, id) => (
                        <div
                            key={id}
                            className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
                            onClick={() => router.push(`/post/${res.id}`)}
                        >
                            <img
                                src={res.attributes.image_url!}
                                alt={res.attributes.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                <h3 className="text-lg text-white font-semibold group-hover:text-green-300 transition-colors">
                                    {res.attributes.title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1">
                                    {res.attributes.author_name} •{" "}
                                    {new Date(res.attributes.published_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default PostDetail