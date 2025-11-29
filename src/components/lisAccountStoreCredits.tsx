"use client"

import { ResAccountCreditCard_ListAll } from "@/interface/responseData/interfaceStorefront"
import { RemoveACreditCard } from "@/service/storefront/accountCreditCards";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { JSX } from "react";
import { FaDivide } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

interface ResAccountCreditCard_ListAll_Prop extends ResAccountCreditCard_ListAll {
    fnCredit: () => void
}

type CardType = "visa" | "jcb" | "mastercard" | "amex";

const ListAccountStoreCredits: React.FC<ResAccountCreditCard_ListAll_Prop> = ({ data, included, fnCredit }) => {
    const cardStyles: Record<CardType, { bg: string; logo: JSX.Element }> = {
        visa: {
            bg: "linear-gradient(to bottom right, #1A1F71, #1E3A8A)",
            logo: <svg width="70px" viewBox="0 0 780 500" enable-background="new 0 0 780 500" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3" fill="#e5eaf1ff" /><path d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#F2AE14" /></svg>

        },
        jcb: {
            bg: "linear-gradient(135deg, #0F4DB0, #EB001B, #00A859)",
            logo: <svg width="50px" height="50px" viewBox="0 -29 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                <defs>
                    <linearGradient x1="-57.5270968%" y1="50.1241953%" x2="232.39121%" y2="50.1241953%" id="linearGradient-1">
                        <stop stopColor="#007940" offset="0%"></stop>
                        <stop stopColor="#00873F" offset="22.85%"></stop>
                        <stop stopColor="#40A737" offset="74.33%"></stop>
                        <stop stopColor="#5CB531" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="0.182516704%" y1="49.95997%" x2="100.273441%" y2="49.95997%" id="linearGradient-2">
                        <stop stopColor="#007940" offset="0%"></stop>
                        <stop stopColor="#00873F" offset="22.85%"></stop>
                        <stop stopColor="#40A737" offset="74.33%"></stop>
                        <stop stopColor="#5CB531" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="-62.8015845%" y1="49.8578253%" x2="253.671294%" y2="49.8578253%" id="linearGradient-3">
                        <stop stopColor="#007940" offset="0%"></stop>
                        <stop stopColor="#00873F" offset="22.85%"></stop>
                        <stop stopColor="#40A737" offset="74.33%"></stop>
                        <stop stopColor="#5CB531" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="0.175556793%" y1="50.0058048%" x2="101.808162%" y2="50.0058048%" id="linearGradient-4">
                        <stop stopColor="#1F286F" offset="0%"></stop>
                        <stop stopColor="#004E94" offset="47.51%"></stop>
                        <stop stopColor="#0066B1" offset="82.61%"></stop>
                        <stop stopColor="#006FBC" offset="100%"></stop>
                    </linearGradient>
                    <linearGradient x1="-0.575855512%" y1="49.9142191%" x2="98.13299%" y2="49.9142191%" id="linearGradient-5">
                        <stop stopColor="#6C2C2F" offset="0%"></stop>
                        <stop stopColor="#882730" offset="17.35%"></stop>
                        <stop stopColor="#BE1833" offset="57.31%"></stop>
                        <stop stopColor="#DC0436" offset="85.85%"></stop>
                        <stop stopColor="#E60039" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <g>
                    <path d="M256.000001,157.418094 C256.000001,179.325184 238.16137,197.163815 216.254279,197.163815 L-3.43623867e-08,197.163815 L-3.43623867e-08,39.7457218 C-3.43623867e-08,17.8386312 17.8386309,3.69395977e-07 39.7457214,3.69395977e-07 L256.000001,3.69395977e-07 L256.000001,157.418094 Z" fill="#FFFFFF"></path>
                    <path d="M185.584353,117.046455 L202.01467,117.046455 C202.484108,117.046455 203.579463,116.889977 204.048901,116.889977 C207.178485,116.26406 209.838631,113.447434 209.838631,109.535453 C209.838631,105.779952 207.178485,102.963326 204.048901,102.18093 C203.579463,102.024451 202.640588,102.024451 202.01467,102.024451 L185.584353,102.024451 L185.584353,117.046455 Z" fill="url(#linearGradient-1)"></path>
                    <path d="M200.13692,13.3007339 C184.488999,13.3007339 171.657702,25.9755506 171.657702,41.7799516 L171.657702,71.354524 L211.872861,71.354524 C212.811737,71.354524 213.907092,71.354524 214.689488,71.511003 C223.765282,71.980441 230.493888,76.6748175 230.493888,84.8117365 C230.493888,91.2273845 225.955991,96.7041575 217.506113,97.799512 L217.506113,98.11247 C226.738387,98.738387 233.779952,103.902201 233.779952,111.882641 C233.779952,120.488998 225.955991,126.122251 215.628363,126.122251 L171.501223,126.122251 L171.501223,184.019561 L213.281174,184.019561 C228.929097,184.019561 241.760392,171.344744 241.760392,155.540344 L241.760392,13.3007339 L200.13692,13.3007339 L200.13692,13.3007339 Z" fill="url(#linearGradient-2)"></path>
                    <path d="M207.804402,86.6894875 C207.804402,82.933986 205.144255,80.4303185 202.01467,79.960881 C201.701713,79.960881 200.919316,79.8044015 200.449879,79.8044015 L185.584353,79.8044015 L185.584353,93.574573 L200.449879,93.574573 C200.919316,93.574573 201.858192,93.574573 202.01467,93.4180935 C205.144255,92.948656 207.804402,90.4449885 207.804402,86.6894875 L207.804402,86.6894875 Z" fill="url(#linearGradient-3)"></path>
                    <path d="M42.7188266,13.3007339 C27.0709047,13.3007339 14.2396088,25.9755506 14.2396088,41.7799516 L14.2396088,112.03912 C22.2200489,115.951101 30.5134475,118.454768 38.8068461,118.454768 C48.6650368,118.454768 53.9853305,112.508558 53.9853305,104.371639 L53.9853305,71.1980445 L78.3960885,71.1980445 L78.3960885,104.215159 C78.3960885,117.046455 70.415648,127.530563 43.3447434,127.530563 C26.9144255,127.530563 14.0831296,123.931541 14.0831296,123.931541 L14.0831296,183.863082 L55.863081,183.863082 C71.5110025,183.863082 84.3422985,171.188265 84.3422985,155.383864 L84.3422985,13.3007339 L42.7188266,13.3007339 L42.7188266,13.3007339 Z" fill="url(#linearGradient-4)"></path>
                    <path d="M121.427874,13.3007339 C105.779951,13.3007339 92.9486555,25.9755506 92.9486555,41.7799517 L92.9486555,79.0220055 C100.146699,72.919316 112.665037,69.0073355 132.850856,69.946211 C143.647922,70.4156485 155.227384,73.3887535 155.227384,73.3887535 L155.227384,85.4376535 C149.437654,82.4645485 142.552568,79.8044015 133.633252,79.178485 C118.298289,78.0831305 109.066015,85.594133 109.066015,98.738387 C109.066015,112.03912 118.298289,119.550123 133.633252,118.298289 C142.552568,117.672372 149.437654,114.855746 155.227384,112.03912 L155.227384,124.08802 C155.227384,124.08802 143.804402,127.061126 132.850856,127.530563 C112.665037,128.469438 100.146699,124.557458 92.9486555,118.454768 L92.9486555,184.17604 L134.728607,184.17604 C150.376529,184.17604 163.207824,171.501223 163.207824,155.696822 L163.207824,13.3007339 L121.427874,13.3007339 L121.427874,13.3007339 Z" fill="url(#linearGradient-5)"></path>
                </g>
            </svg>
        },
        mastercard: {
            bg: "linear-gradient(to bottom right, #EB001B, #F79E1B)",
            logo:
                <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 291.791 291.791"
                    enableBackground="new 0 0 291.791 291.791"
                >
                    <g>
                        <path
                            style={{ fill: "#E2574C" }}
                            d="M182.298,145.895c0,50.366-40.801,91.176-91.149,91.176S0,196.252,0,145.895
		s40.811-91.176,91.149-91.176S182.298,95.538,182.298,145.895z"
                        />
                        <path
                            style={{ fill: "#F4B459" }}
                            d="M200.616,54.719c-20.442,0-39.261,6.811-54.469,18.181l0.073,0.009
		c2.991,2.89,6.291,4.924,8.835,8.251l-18.965,0.301c-2.972,3-5.68,6.264-8.233,9.656H161.3c2.544,3.054,4.896,5.708,7.03,9.081
		h-46.536c-1.705,2.936-3.282,5.954-4.659,9.09h56.493c1.477,3.127,2.799,5.489,3.921,8.799h-63.76
		c-1.012,3.146-1.878,6.364-2.535,9.646h68.966c0.675,3.155,1.194,6.072,1.55,9.045h-71.884c-0.301,3-0.456,6.045-0.456,9.118
		h72.859c0,3.228-0.228,6.218-0.556,9.118h-71.847c0.31,3.091,0.766,6.127,1.368,9.118h68.856c-0.711,2.954-1.532,5.926-2.562,9.008
		h-63.969c0.966,3.118,2.143,6.145,3.428,9.099h56.621c-1.568,3.319-3.346,5.972-5.306,9.081h-46.691
		c1.842,3.191,3.875,6.236,6.081,9.154l33.589,0.501c-2.863,3.437-6.537,5.507-9.884,8.516c0.182,0.146-5.352-0.018-16.248-0.191
		c16.576,17.105,39.744,27.772,65.446,27.772c50.357,0,91.176-40.82,91.176-91.176S250.981,54.719,200.616,54.719z"
                        />
                    </g>
                </svg>
        },
        amex: {
            bg: "linear-gradient(to bottom right, #006FCF, #0077CC)",
            logo: <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" fill="none" viewBox="0 0 24 16" className="p-Logo p-Logo--md p-CardBrandIcon"><g clip-path="url(#clip0_4934_35113)"><path fill="#0193ce" d="M22 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2"></path><path fill="#fff" d="m19.127 8.063 2.278-2.333h-3.037l-.823.883-.696-.883h-3.505v.63h3.252l.949 1.135L18.62 6.36h1.139l-1.646 1.703 1.646 1.575h-1.14l-1.075-1.133-.986 1.133h-3.215v.632h3.505l.696-.883.823.883h3.037z"></path><path fill="#fff" d="M14.19 9.009h1.9l.885-.946-.76-.946h-2.024v.63h1.772v.631H14.19z"></path><path fill="#fff" fillRule="evenodd" d="m5.478 9.514-.262.756H2.595l2.228-4.54h2.102l.258.504V5.73h2.621l.525 1.261.524-1.261h2.49v4.54h-1.972v-.63l-.256.63H9.542l-.262-.63v.63H6.396l-.262-.756zm6.424.126h.782l.004-3.28h-1.31l-1.05 2.27L9.28 6.36H7.97v3.027L6.395 6.36H5.347L3.774 9.64h.918l.262-.757h1.704l.262.757h1.836V7.117l1.18 2.523h.786l1.18-2.523zM6.396 8.252l-.524-1.387-.656 1.387z" clipPath="evenodd"></path></g><defs><clipPath id="clip0_4934_35113"><path fill="#fff" d="M0 0h24v16H0z"></path></clipPath></defs></svg>

        }
    };

    const { setLoading } = useStateGeneral()

    const handleDeleteCard = async (id: string) => {
        try {
            setLoading(true)
            const response = await RemoveACreditCard(id);
            fnCredit()
        } catch (error: any) {
            toast.error(`Retrieve contries: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {data.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.map((res) => {
                        const rawType = res.attributes.cc_type?.toLowerCase();
                        const type = Object.keys(cardStyles).includes(rawType)
                            ? rawType as CardType
                            : 'visa'; // fallback to visa

                        const style = cardStyles[type] 

                        return (
                            <section key={res.id}
                                className="relative group w-full flex items-center justify-center text-white perspective-1000">
                                <div
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className="transition-transform duration-600 hover:rotate-y-180 relative h-[225px] w-[375px] z-10">
                                    <div style={{
                                        background: style.bg,
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden'
                                    }} className=" front-face absolute h-full w-full group text-white p-5 rounded-xl overflow-hidden cursor-pointer shadow-xl flex flex-col gap-5 transition-all duration-500 ease-out hover:scale-102 hover:shadow-2xl">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-20"></div>
                                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-5 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-15"></div>

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                        <div className="text-white relative z-10">
                                            <div className="flex justify-between items-center">
                                                <span className="transition-all duration-300 group-hover:scale-110">{style.logo}</span>
                                                <img src="../../chip.png" alt="chip" className="w-[50px] h-[36px]" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <h6 className="text-[10px] opacity-70">Card Number</h6>
                                            <div className="text-2xl tracking-widest font-mono transition-all duration-300">
                                                •••• •••• •••• {res.attributes.last_digits}
                                            </div>
                                        </div>

                                        <div className="flex justify-between gap-5 items-end">
                                            <p className="text-md font-semibold uppercase transition-all duration-300 group-hover:font-bold">{res.attributes.name}</p>
                                            <div className="flex flex-col justify-between transition-all duration-300 group-hover:gap-4 gap-5">
                                                <div className="transition-transform duration-300 flex flex-col gap-1 items-center justify-start">
                                                    <p className="text-[10px] opacity-70 mr-auto">
                                                        Valid Thru
                                                    </p>
                                                    <p className="text-md font-semibold transition-all duration-300 group-hover:font-bold">{res.attributes.month}/{res.attributes.year}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{
                                        background: style.bg,
                                        transformStyle: 'preserve-3d',
                                        backfaceVisibility: 'hidden'
                                    }} className="rotate-y-180 absolute h-full w-full group text-white p-5 rounded-xl overflow-hidden cursor-pointer shadow-xl flex flex-col gap-5 transition-all duration-500 ease-out hover:scale-102 hover:shadow-2xl">
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-20"></div>
                                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-5 rounded-full transition-all duration-700 group-hover:scale-150 group-hover:opacity-15"></div>

                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                        <h6 className="text-[10px]">
                                            For customer service call +977 4343 3433 or email at {res.attributes.cc_type}@gmail.com
                                        </h6>
                                        <span className="magnetic-strip absolute top-10 left-0 h-[45px] w-full bg-black"></span>
                                        <div className="bg-[repeating-linear-gradient(#fff,#fff_3px,#efefef_0px,#efefef_9px)] flex justify-end items-center mt-12 h-14 w-[90%] rounded">
                                            <i className="text-xs p-1 rounded bg-white text-black -mr-[30px] -z-10">{res.attributes.last_digits}</i>
                                        </div>
                                        <h5 className="text-[10px]">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
                                            maiores sed doloremque nesciunt neque beatae voluptatibus doloribus.
                                            Libero et quis magni magnam nihil temporibus? Facere consectetur
                                            dolore reiciendis et veniam.
                                        </h5>
                                    </div>
                                </div>
                                <button
                                    aria-label="delete card"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCard(res.id);
                                    }}
                                    className="
                                absolute -top-2 -right-2 w-8 h-8
                                rounded-full bg-white shadow-lg flex items-center justify-center
                                text-gray-600 text-sm font-bold
                                hover:bg-red-500 hover:text-white hover:shadow-xl
                                active:scale-95 active:bg-red-600
                                transition-all duration-300
                                border border-gray-200
                                hover:scale-110
                                opacity-0 group-hover:opacity-100
                                z-10
                                transform-gpu
                            "
                                >
                                    <IoClose />
                                </button>
                            </section>
                        );
                    })}
                </div >
                :
                <div className="flex flex-col gap-1">
                    <img src="../../no-cerdit.png" alt="no cerdit" className="w-[200px] opacity-30 mx-auto" />
                    <p className="text-center text-gray-500 text-md">No usable store credits</p>
                    <p className="text-center text-gray-500 text-sm">You’ll need credits to complete payment with this method.</p>
                </div>
            }

        </>
    )
}
export default ListAccountStoreCredits