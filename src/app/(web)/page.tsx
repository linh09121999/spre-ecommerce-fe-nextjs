"use client"
import { useRouter } from "next/navigation";
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';

import React, { useEffect } from "react";
import { useState_ResPosts, useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";
import { toast, ToastContainer } from "react-toastify";
import { ListAllProducts } from "@/service/storefront/products";
import ListProductCard from "@/components/cardListProduct";
import { MdNavigateNext } from "react-icons/md";
import { FiShoppingBag, FiUser, FiUsers } from "react-icons/fi";
import { ListAllPost } from "@/service/storefront/posts";
import { GiAppleCore, GiBrain, GiMeditation } from "react-icons/gi";
import { PiBarbell } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaShieldAlt, FaShippingFast, FaUndo } from "react-icons/fa";

const Home: React.FC = () => {
  const router = useRouter();
  const { resTaxons_List } = useState_ResTaxons()
  const {
    resDataIcludes_NewList, resDataIcludes_SaleList,
    resDataProducts_NewList, resDataProducts_SaleList,
    setResDataIcludes_NewList, setResDataIcludes_SaleList, setResDataProduct_NewList, setResDataProduct_SaleList
  } = useState_ResProducts()
  const { resPosts_List, setResPosts_List } = useState_ResPosts()

  const { setLoading, setSelectNav
  } = useStateGeneral()

  const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
    try {
      setLoading(true);
      const res = await ListAllProducts({ filter_taxons, page, per_page, include })
      if (filter_taxons === "173") {
        setResDataIcludes_SaleList(res.data.included)
        setResDataProduct_SaleList(res.data.data)
      } else if (filter_taxons === "174") {
        setResDataIcludes_NewList(res.data.included)
        setResDataProduct_NewList(res.data.data)
      }
    } catch (error: any) {
      toast.error(`Products: ` + error.response.data.error)
      if (filter_taxons === "173") {
        setResDataIcludes_SaleList([])
        setResDataProduct_SaleList([])
      } else if (filter_taxons === "174") {
        setResDataIcludes_NewList([])
        setResDataProduct_NewList([])
      }
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
    getApiProducts("173", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiProducts("174", 1, 5, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    getApiPosts()
    AOS.init({
      duration: 2000,
      once: false,
      mirror: true,
    });
  }, [])

  const toPath = (text: string): string => {
    return text
      .toLowerCase()        // chuyển hết về chữ thường
      .trim()               // bỏ khoảng trắng đầu/cuối
      .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w-]/g, ''); // loại bỏ ký tự đặc biệt
  };

  return (
    <>
      <div className=" max-w-[1535px] mx-auto flex flex-col gap-15 py-10 max-2xl:px-5 overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full">
          <div className="order-2 lg:order-1 flex flex-col gap-10" data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="bg-white/60 flex flex-col gap-5 backdrop-blur-md lg:p-8 lg:rounded-xl lg:shadow-md">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight">Explore Your Style
                <br className="hidden sm:inline" /> With <span className="text-green-600">Spree Commerce</span></h1>
              <p className=" text-slate-600 max-w-xl">Build fully customizable eCommerce experiences with Spree’s powerful open-source platform</p>
              <button
                onClick={() => router.push('/all-product')}
                className="h-[50px] my-3 w-fit flex gap-2 justify-center items-center rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
              >
                Shop Now
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="px-3 py-1 rounded-full bg-green-50 flex justify-center items-center gap-2">
                  <FaShippingFast className='text-green-500' />
                  <span className='text-sm'>Free shipping</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-green-50 flex justify-center items-center gap-2">
                  <FaUndo className='text-green-500' />
                  <span className='text-sm'>Easy returns</span></span>
                <span className="px-3 py-1 rounded-full bg-green-50 flex justify-center items-center gap-2">
                  <FaShieldAlt className='text-green-500 ' />
                  <span className='text-sm'>Secure payment</span>
                </span>
              </div>
            </div>
            <section>
              <h3 className="text-lg font-semibold mb-4">Shop by category</h3>
              <div className=" flex overflow-x-auto scroll-x gap-5 pb-3">
                {[
                  { title: "Men", icon: <FiUser size={18} /> },
                  { title: "Women", icon: <FiUsers size={18} /> },
                  { title: "Accessories", icon: <FiShoppingBag size={18} /> },
                  { title: "Fitness", icon: <PiBarbell size={18} /> },
                  { title: "Relaxation", icon: <GiMeditation size={18} /> },
                  { title: "Mental Stimulation", icon: <GiBrain size={18} /> },
                  { title: "Nutrition", icon: <GiAppleCore size={18} /> },
                ].map(({ title, icon }) => (
                  <button
                    key={title}
                    onClick={() => router.push(`/${toPath(title)}`)}
                    className="flex group items-center w-fit gap-3 whitespace-nowrap px-4 h-[45px] rounded-xl hover:bg-green-50 hover:shadow-lg transition-all duration-500"
                  >
                    <div className=" css-icon text-green-500">{icon}</div>
                    <div className="text-sm text-slate-700 group-hover:text-green-500 transition-all duration-500">{title}</div>
                  </button>
                ))}
              </div>
            </section>
          </div>
          <div className="order-1 lg:order-2 rounded-xl overflow-hidden shadow-lg"
            data-aos-duration="3000"
            data-aos="zoom-in">
            <img
              src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
              alt="banner"
              className=" inset-0 w-full h-64 sm:h-80 lg:h-[500px] object-cover object-cover transition-transform duration-[2s] ease-out hover:scale-125"
            />
            <div className="absolute left-6 bottom-6 bg-gradient-to-tr from-black/30 backdrop-blur-md to-transparent p-4 rounded-xl text-white">
              <div className="text-sm">New collection</div>
              <div className="font-bold text-lg">Autumn '25 Drop</div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch max-md:hidden">
          {resTaxons_List?.data
            .filter(({ attributes }) =>
              ["categories/fashion/men", "categories/fashion/women"].includes(
                attributes.permalink
              )
            )
            .map((res) => (
              <button
                key={res.id}
                data-aos-duration="3000"
                data-aos="fade-up"
                className="relative group overflow-hidden rounded-xl shadow-xl"
                onClick={() => router.push(`/${res.attributes.name.toLowerCase()}`)}
              >
                {res.attributes.header_url &&
                  <img
                    src={res.attributes.header_url} alt={res.attributes.name.toLowerCase()}
                    className="w-full h-73 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                }
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <span className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/40 to-transparent">
                  <h4 className="text-white text-start text-2xl font-semibold">{res.attributes.name}</h4>
                </span>
              </button>
            ))}
        </section>
        <section className="relative flex flex-col gap-5" data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl uppercase font-semibold tracking-wide">Sale</h3>
            <button
              onClick={() => router.push(`/sale`)}
              className="text-green-600 hover:underline items-center flex gap-1 css-next">

              View all
              <span><MdNavigateNext size={22} /></span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <ListProductCard products={resDataProducts_SaleList ?? []} included={resDataIcludes_SaleList ?? []} />
          </div>
        </section>
        <section className="relative flex flex-col gap-5" data-aos="fade-up"
          data-aos-duration="3000"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-2xl uppercase font-semibold tracking-wide">New Arrivals</h3>
            <button
              onClick={() => router.push(`/new-arrivals`)}
              className="text-green-600 hover:underline items-center flex gap-1 css-next">

              View all
              <span><MdNavigateNext size={22} /></span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <ListProductCard products={resDataProducts_NewList ?? []} included={resDataIcludes_NewList ?? []} />
          </div>
        </section>
        <section className='flex-grow gap-5 flex flex-col ' >
          <div
            className="flex justify-between css-next items-center w-full transition-all duration-300 ease">
            <h3 className="text-xl uppercase font-semibold  bg-clip-text tracking-wide">Latest Posts</h3>
            <button
              onClick={() => {
                router.push(`/posts`)
              }}
              className="text-green-600 hover:underline items-center flex gap-1 css-next">

              View all
              <span><MdNavigateNext size={22} /></span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" >

            {/* LEFT — FEATURED POSTS (HAS CONTENT) */}
            <div className="grid gap-5"
              data-aos-duration="3000"
              data-aos="fade-right"
            >
              {resPosts_List?.data
                .filter((p) => p.attributes.content)
                .slice(0, 2) // đổi số tùy bạn
                .map((res) => (
                  <div
                    key={res.id}
                    onClick={() => router.push(`/post/${res.id}`)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md"
                  >
                    <img
                      src={res.attributes.image_url!}
                      alt={res.attributes.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent 
                          opacity-80 group-hover:opacity-90 transition-all"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-semibold text-white group-hover:text-green-300 transition-colors">
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

            {/* RIGHT — SMALL POSTS (NO CONTENT) */}
            <div className="grid grid-cols-2 gap-5"
              data-aos-duration="3000"
              data-aos="fade-left">
              {resPosts_List?.data
                .filter((p) => !p.attributes.content)
                .slice(0, 4)
                .map((res) => (
                  <div
                    key={res.id}
                    onClick={() => router.push(`/post/${res.id}`)}
                    className="cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative overflow-hidden rounded-xl group">
                      <img
                        src={res.attributes.image_url!}
                        alt={res.attributes.title}
                        className="w-full h-50 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                            opacity-70 group-hover:opacity-90 transition-opacity"></div>
                    </div>

                    <div>
                      <h3 className="text-[16px] font-semibold leading-snug line-clamp-2">
                        {res.attributes.title}
                      </h3>
                      <p className="text-black/70 text-xs mt-1">
                        {res.attributes.author_name} •{" "}
                        {new Date(res.attributes.published_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </section>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default Home