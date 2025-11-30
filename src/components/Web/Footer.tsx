"use client"
import React from 'react';
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";;
import { useState_ResStores } from '@/useState/useStatestorefront';
import { useRouter } from "next/navigation";

import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

const FooterWeb: React.FC = () => {
    const router = useRouter();

    const sxButton: SxProps<Theme> = {
        background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        border: "none",
        color: 'white',
        borderRadius: '25px',
        width: '100px',
        fontWeight: '600',
        fontSize: 'var(--text-xl)',
        position: "relative",
        overflow: "hidden",
        textTransform: "none",
        "&:active": { transform: "scale(0.95)" },
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "50%",
            height: "100%",
            width: 0,
            background: "linear-gradient(135deg, var(--color-green-600), var(--color-emerald-600))",
            opacity: 0,
            transition: "all 0.5s ease",
            zIndex: -1,
        },
        "&:hover::before": {
            border: 'none',
            left: 0,
            width: "100%",
            opacity: 1,
        },
        "& span": {
            display: 'block',
            transition: 'all 0.3s ease-in-out'
        },
        "& svg": {
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-in-out',
        },
        ":hover svg": {
            transform: ' rotate(45deg) scale(1.1)',
            transition: 'translateX(5rem) transform 0.3s ease-in-out',

        },
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }

    const sxText: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "30px",
            background: 'white',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-300)',
            height: '60px',
            "&:hover": { borderColor: "var(--color-green-400)" },
            "& input": {
                paddingLeft: "14px",
                color: "var(--color-green-700)",
                fontSize: "1rem",
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'var(--color-green-300)',
            paddingLeft: '14px',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }


    const year = new Date().getFullYear()

    const { setYourMail, yourMail, pages, setSelectNav } = useStateGeneral()

    const { resStores } = useState_ResStores()

    const textSubject = "Hello, I'm "
    const body = encodeURIComponent('I am interested in this website');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setYourMail(value)
    }

    return (
        <>
            <section className="px-5 py-16 bg-gradient-to-b from-gray-100 to-gray-200 text-black">
                <div className="max-w-[900px] mx-auto flex flex-col gap-6 items-center text-center">
                    <h3 className="text-3xl uppercase font-bold tracking-wide 
      bg-gradient-to-r from-green-500 to-green-700 text-transparent bg-clip-text">
                        Subscribe to our newsletter
                    </h3>

                    <p className="text-black/60 text-lg max-w-[700px] leading-relaxed">
                        Stay updated with our latest products, offers and exclusive deals.
                        Every subscription goes directly to your customer dashboard for easy management.
                    </p>

                    <div className="flex w-full max-w-[600px]">
                        <TextField
                            aria-label="input email"
                            placeholder="Enter your email..."
                            name="email"
                            sx={sxText}
                            value={yourMail}
                            onChange={handleChangeEmail}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            className='group relative transition-all duration-300 hover:scale-105'
                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${resStores?.data.attributes.customer_support_email}&su=${encodeURIComponent(textSubject + yourMail)}&body=${body}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={sxButton}
                                        >
                                            <div className="relative flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    className="text-green-600 group-hover:text-white transition"
                                                >
                                                    <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                                </svg>
                                            </div>
                                            <div className="absolute inset-0 overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                            </div>
                                            <div className="absolute inset-0 rounded-[25px] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </section>

            <footer className="px-5 pb-7 pt-14 bg-white text-black border-t border-gray-300">
                <div className="max-w-[1500px] mx-auto grid gap-10 md:grid-cols-[2fr_3fr]">

                    {/* Logo + Des */}
                    <div className="flex flex-col gap-4">
                        <a onClick={() => router.push('/')} className="cursor-pointer">
                            <img
                                className="w-44"
                                alt="Spree Commerce DEMO logo"
                                src="../../LogoFullBlack.webp"
                            />
                        </a>
                        <p className="text-black/60 leading-relaxed">
                            {resStores?.data.attributes.meta_description}
                        </p>
                    </div>

                    <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                        {/* Shop */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold tracking-wide">Shop</h3>
                            <ul className="flex flex-col gap-3">
                                {pages?.map((page, index) => (
                                    <a
                                        key={index}
                                        onClick={() => {
                                            setSelectNav(index)
                                            router.push(page.path)
                                        }}
                                        className="cursor-pointer hover:text-green-600 transition flex items-center gap-2 group"
                                    >
                                        <span className="group-hover:translate-x-1 transition">{page.title}</span>
                                    </a>
                                ))}
                            </ul>
                        </div>

                        {/* Account */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold tracking-wide">Account</h3>
                            <ul className="flex flex-col gap-3 ">
                                <li>
                                    <button
                                        onClick={() => router.push('/setting')}
                                        className="cursor-pointer hover:text-green-600 transition flex items-center gap-2 group">
                                        <span className="group-hover:translate-x-1 transition uppercase text-sm">My Account</span>
                                    </button>
                                </li>

                                <li>
                                    <button
                                        onClick={() => router.push('/heart')}
                                        className="cursor-pointer hover:text-green-600 transition flex items-center gap-2 group">
                                        <span className="group-hover:translate-x-1 transition uppercase text-sm">Favorites</span>
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-semibold tracking-wide">Contact</h3>

                            {resStores?.data.attributes.facebook && (
                                <div className="flex gap-3 items-center">
                                    <a
                                        href={resStores?.data.attributes.facebook}
                                        className="h-12 w-12 flex justify-center items-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 hover:text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                    >
                                        <FaFacebookF className='mx-auto'/>
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </a>
                                    <span className="text-black/70">Facebook</span>
                                </div>
                            )}

                            {resStores?.data.attributes.twitter && (
                                <div className="flex gap-3 items-center">
                                    <a
                                        href={resStores?.data.attributes.twitter}
                                        className="h-12 w-12 flex justify-center items-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 hover:text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                    >
                                        <BsTwitterX className='mx-auto'/>
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="afullute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </a>
                                    <span className="text-black/70">Twitter</span>
                                </div>
                            )}

                            {resStores?.data.attributes.instagram && (
                                <div className="flex gap-3 items-center">
                                    <a
                                        href={resStores?.data.attributes.instagram}
                                        className="h-12 w-12 flex justify-center items-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 hover:text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                    >
                                        <FaInstagram className='mx-auto'/>
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="afullute inset-0 rounded-full border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </a>
                                    <span className="text-black/70">Instagram</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10 text-center text-black/60 text-sm">
                    © {year} Spree Commerce DEMO. All Rights Reserved. Provided by{" "}
                    <a
                        href="https://spreecommerce.org/docs/api-reference"
                        className="font-semibold hover:text-green-600 transition"
                    >
                        Spree Ecommerce
                    </a>
                </div>
            </footer>

        </>

    )
}

export default FooterWeb;