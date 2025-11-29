"use client"
import React, { useState, useEffect, useMemo } from 'react';
import Nav from './Nav';
import {
    TextField,
    InputAdornment, MenuItem, Menu,
    IconButton, Avatar, Stack, Badge, styled, Backdrop
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";
import { keyframes } from "@mui/system";

import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResAccount, useState_ResStores, useState_ResTaxons } from '@/useState/useStatestorefront';
import { FaRegHeart, FaRegUser } from 'react-icons/fa';
import { MdOutlineSettings, MdOutlineShoppingCart } from 'react-icons/md';
import { IoMdSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { ReturnTheCurrentStore } from '@/service/storefront/stores';
import { ToastContainer, toast } from 'react-toastify';
import { ListAllTaxons } from '@/service/storefront/taxons';
import { GrFormNextLink } from 'react-icons/gr';
import { useRouter } from "next/navigation";
import { Cart } from '@/interface/sendData/interfaceStorefront';
import { CreateACart } from '@/service/storefront/cart';
import { RetrieveAnAccount } from '@/service/storefront/account';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    width: '35px',
    height: '35px',
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const fly1 = keyframes`
  from { transform: translateY(0.1em); }
  to   { transform: translateY(-0.1em); }
`;

const HeaderWeb: React.FC = () => {
    const sxAvata: SxProps<Theme> = {
        width: "100%",
        height: "100%",
        boxShadow: 'var(--shadow-xl)',

    }

    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: '10px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
            maxWidth: 'calc(100%)',
            background: 'white',
            zIndex: 100,
        },
    }

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'black',
        zIndex: 100,
        '&:hover': {
            backgroundColor: 'var(--color-green-100) !important',
            color: 'var(--color-green-700) !important',
            fontWeight: 600
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "30px",
            background: 'white',
            backdropFilter: 'blur(10px)',
            padding: '3px 8px !important',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-800)',
            height: '60px',
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

    const sxBadge: SxProps<Theme> = {
        "& .MuiBadge-badge": {
            background: 'var(--color-green-700)',
            color: "white",
            fontWeight: 'bold',
            fontSize: 'var(--text-sm)',
        }
    }

    const sxButton: SxProps<Theme> = {
        color: 'var(--color-green-500)',
        fontWeight: '600',
        fontSize: 'var(--text-xl)',
        position: "relative",
        overflow: "hidden",
        textTransform: "none",
        "&:active": { transform: "scale(0.95)" },
        "& span": {
            display: 'block',
            transition: 'all 0.3s ease-in-out'
        },
        "& svg": {
            display: 'block',
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-in-out',
        },
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }

    const router = useRouter();

    const { setResStores } = useState_ResStores()
    const { resTaxons_List, setResTaxons_List } = useState_ResTaxons()
    const { resAccount, setResAccount } = useState_ResAccount()

    const {
        setLoading, heartNumber,
        setIsSearch, isSearch,
        hoveredNav, setHoveredNav } = useStateGeneral()

    const getApiStores = async () => {
        try {
            setLoading(true);
            const res = await ReturnTheCurrentStore()
            setResStores(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiTaxons = async (page: number, per_page: number) => {
        try {
            setLoading(true);
            const res = await ListAllTaxons({ page, per_page })
            setResTaxons_List(res.data)
        } catch (error: any) {
            toast.error(`Taxons: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const postApiCart = async () => {
        const existingToken = localStorage.getItem("order_token");
        if (existingToken) {
            // token đã có, có thể fetch cart hiện tại nếu muốn
            setLoading(false);
            return;
        }

        const data: Cart = {
            public_metadata: {
                total_weight: 3250,
            },
            private_metadata: {
                had_same_cart_items: true,
            },
        };

        try {
            setLoading(true)
            const response = await CreateACart(data);
            console.log("Cart created:", response.data);

            // Nếu API trả về order_token thì lưu vào localStorage
            const orderToken = response.data.data?.attributes?.token
            if (orderToken) {
                localStorage.setItem("order_token", orderToken);
            }

            return response.data; // trả về dữ liệu nếu cần
        } catch (error: any) {
            toast.error(`Creating cart: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    };

    const getApiAccount = async (include: string) => {
        try {
            setLoading(true);
            const res = await RetrieveAnAccount({ include })
            setResAccount(res.data)
        } catch (error: any) {
            toast.error(`Account: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        getApiStores()
        getApiTaxons(1, 100)
        postApiCart()
        const token = localStorage.getItem("token")
        setToken(token);
        if (token) {
            getApiAccount("default_billing_address")
        }
    }, [])
    const { handleLogOut } = useAuth();

    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const openAccount = Boolean(anchorElAccount);

    const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        const token = localStorage.getItem('token')
        token ?
            (
                setAnchorElAccount(event.currentTarget)
            )
            :
            (
                router.push('/login')
            )
    }

    const handleCloseAccount = () => {
        setAnchorElAccount(null);
    };

    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Khi scroll xuống và quá 100px thì ẩn header
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setHidden(true);
            } else if (currentScrollY < lastScrollY) {
                // Khi scroll lên thì hiện header
                setHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const filteredFashionImg = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.name.toLowerCase().includes("fashion".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionMen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/men/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionWomen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/women/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionAccessories = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/accessories/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filteredWellnessImg = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.name.toLowerCase().includes("wellness".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessFitness = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/fitness/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessRelaxation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/relaxation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessMentalStimulation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/mental-stimulation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessNutrition = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/nutrition/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const toPath = (text: string): string => {
        return text
            .toLowerCase()        // chuyển hết về chữ thường
            .trim()               // bỏ khoảng trắng đầu/cuối
            .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w-]/g, ''); // loại bỏ ký tự đặc biệt
    };

    const handleHeart = () => {
        const token = localStorage.getItem("token")
        if (token) {
            router.push('/heart')
        } else {
            router.push('/login')
        }
    }

    return (
        <>
            <header
                className={`top-0 sticky z-100 px-5 py-4 bg-white backdrop-blur-[10px] border-b border-b-gray-700 transition-transform duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"
                    }`}
            >
                <div className='max-w-[1535px] mx-auto flex justify-between items-center'>
                    <a onClick={() => {
                        router.push('/')
                    }}>
                        <img className="w-30 custom-desktop-height "
                            alt="Spree Commerce DEMO logo"
                            src="../../LogoFullBlack.webp" />
                    </a>
                    <Nav
                        classNameUl='flex list-none gap-7 uppercase text-lg'
                        classNameA={` size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px]  after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100  menu-item header--nav-link`}
                        classNameAActive='text-green-500 after:scale-x-100 after:bg-green-500'
                        classNameAHover=' after:scale-x-100 after:bg-gray-200'
                        classNameADeactive='text-gray-500'
                    />
                    <div className='flex justify-between gap-4 items-center'>
                        {/* search */}
                        <button className='p-2 css-icon' aria-label='search'
                            onClick={() => setIsSearch(true)}
                        >
                            <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                <IoMdSearch className="mx-auto" />
                            </span>
                        </button>

                        {/* cart */}
                        <button className='p-2 css-icon' aria-label='cart'
                            onClick={() => router.push('/cart')}
                        >
                            <Badge badgeContent={typeof window !== "undefined"
                                ? Number(localStorage.getItem("cart_number")) || 0
                                : 0} sx={sxBadge}>
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <MdOutlineShoppingCart className="mx-auto" />
                                </span>
                            </Badge >
                        </button>
                        <button className='p-2 css-icon' aria-label='heart'
                            onClick={handleHeart}
                        >
                            <Badge badgeContent={heartNumber} sx={sxBadge}>
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <FaRegHeart className="mx-auto" />
                                </span>
                            </Badge >
                        </button>
                        {/* user */}
                        <button className='p-2 css-icon' aria-label='user'
                            onClick={handleClickAccount}
                        >
                            <Stack direction="row" spacing={2}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar
                                        sx={sxAvata}
                                    >
                                        {resAccount?.data.attributes.first_name.charAt(0).toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                    </Avatar>
                                </StyledBadge >
                            </Stack>
                        </button>
                        {token &&
                            <Menu
                                anchorEl={anchorElAccount}
                                open={openAccount}
                                onClose={handleCloseAccount}
                                PaperProps={PaperProps}
                                MenuListProps={MenuListProps}
                            >
                                <div className='bg-green-50 px-5 text-green-900 p-2 flex gap-3 items-center'>
                                    <Stack direction="row" spacing={2}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                sx={sxAvata}
                                            >
                                                {resAccount?.data.attributes.first_name.charAt(0).toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                            </Avatar>
                                        </StyledBadge >
                                    </Stack>
                                    <div className='flex flex-col gap-1'>
                                        <p className='flex gap-1'>{resAccount?.data.attributes.first_name} {resAccount?.data.attributes.last_name}</p>
                                        <p>{resAccount?.data.attributes.email}</p>
                                    </div>
                                </div>
                                <MenuItem sx={sxMenuItem}
                                    onClick={() => {
                                        // router.push('/dashboard')
                                        window.location.href = 'https://demo.spreecommerce.org/admin_user';
                                        setAnchorElAccount(null);
                                    }}
                                >
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-xl rotate-[180deg]'><LuLayoutDashboard /></span>
                                        <span className={` text-lg transition-all duration-300 ease-in-out`}>Dashboard</span>
                                    </div>

                                </MenuItem>
                                <MenuItem sx={sxMenuItem}
                                    onClick={() => {
                                        router.push('/setting')
                                        setAnchorElAccount(null);
                                    }}
                                >
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-xl rotate-[180deg]'><MdOutlineSettings /></span>
                                        <span className={` text-lg transition-all duration-300 ease-in-out`}>Setting</span>
                                    </div>

                                </MenuItem>
                                <MenuItem sx={sxMenuItem}
                                    onClick={() => {
                                        handleLogOut()
                                    }

                                    }
                                >
                                    <div className='flex gap-3 items-center'>
                                        <span className='text-xl rotate-[180deg]'><FiLogOut /></span>
                                        <span className={` text-lg transition-all duration-300 ease-in-out`}>Logout</span>
                                    </div>
                                </MenuItem>
                            </Menu>
                        }
                    </div>
                    {isSearch &&
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={isSearch}
                        >
                            <>
                                <div className="w-full md:w-[600px] sm:w-auto ">
                                    <TextField
                                        type="search"
                                        placeholder="Search..."
                                        sx={sxTextField}
                                        // onChange={(e) => setInputValueSources(e.target.value)}
                                        // value={inputValueSources}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        sx={{
                                                            ...sxButton,
                                                            background: "rgba(74, 222, 128, 0.1)",
                                                            border: '1px solid rgba(74, 222, 128, 0.2)',
                                                            color: 'var(--color-green-500)',
                                                            borderRadius: '25px',
                                                            fontWeight: '600',
                                                            fontSize: 'var(--text-xl)',
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            textTransform: "none",
                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                top: 0,
                                                                left: "50%",
                                                                height: "100%",
                                                                width: 0,
                                                                background: "var(--color-green-400)",
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
                                                        }}
                                                    >
                                                        <div className="relative flex items-center gap-2 svgWrapper">
                                                            <IoMdSearch className="mx-auto" />
                                                        </div>
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                < IconButton
                                    sx={sxButton}
                                    onClick={() => setIsSearch(false)}>
                                    <IoClose className=" mx-auto" />
                                </IconButton>
                            </>
                        </Backdrop>
                    }
                </div>
                {(hoveredNav === 1 || hoveredNav === 2) &&
                    <div
                        onMouseEnter={() => setHoveredNav(hoveredNav)} // Giữ hiển thị khi rê qua div này
                        onMouseLeave={() => setHoveredNav(null)} // Ẩn khi rời ra ngoài
                        className="absolute left-0 top-full w-full bg-white shadow-lg p-6 z-40 transition-all duration-300"
                    >
                        {hoveredNav === 1 &&
                            // fashion
                            <div className='max-w-[1535px] mx-auto grid grid-cols-4 '>
                                {[
                                    { filter: filterFashionMen, title: "Men" },
                                    { filter: filterFashionWomen, title: "Women" },
                                    { filter: filterFashionAccessories, title: "Accessories" },
                                ].map(({ filter, title }) => (
                                    <div className='flex-grow gap-4 flex flex-col '>
                                        <h3 className='text-lg font-semibold uppercase'>{title}</h3>
                                        <ul className='grid gap-4'>
                                            {filter?.map((data, id) => (
                                                <a key={id}
                                                    onClick={() => {
                                                        router.push(`/${toPath(data.attributes.name)}`)
                                                    }}
                                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                                >
                                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                        {data.attributes.name}
                                                    </div>
                                                </a>
                                            ))}
                                            <a
                                                onClick={() => {
                                                    router.push(`/${toPath(title)}`)
                                                }}
                                                className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                            >
                                                <div className='uppercase flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                    View All
                                                    <GrFormNextLink />
                                                </div>
                                            </a>
                                        </ul>
                                    </div>
                                ))}
                                {filteredFashionImg?.map((data, id) => (
                                    <div key={id} className='flex-grow gap-4 flex flex-col '>
                                        <img src={data.attributes.header_url} alt={data.attributes.name} className='rounded-xl' />
                                    </div>
                                ))}
                            </div>
                        }
                        {/* wellness */}
                        {hoveredNav === 2 &&
                            <div className='max-w-[1535px] mx-auto grid grid-cols-4'>
                                {[
                                    { filter: filterWellnessFitness, title: "Fitness" },
                                    { filter: filterWellnessRelaxation, title: "Relaxation" },
                                    { filter: filterWellnessMentalStimulation, title: "Mental Stimulation" },
                                    { filter: filterWellnessNutrition, title: "Nutrition" },
                                ].map(({ filter, title }) => (
                                    <div className='flex-grow gap-4 flex flex-col '>
                                        <h3 className='text-lg font-semibold uppercase'>{title}</h3>
                                        <ul className='grid gap-4'>
                                            {filter?.map((data, id) => (
                                                <a key={id}
                                                    onClick={() => {
                                                        router.push(`/${toPath(data.attributes.name)}`)
                                                    }}
                                                    className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                                >
                                                    <div className='flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                        {data.attributes.name}
                                                    </div>
                                                </a>
                                            ))}
                                            <a
                                                onClick={() => {
                                                    router.push(`/${toPath(title)}`)
                                                }}
                                                className='cursor-pointer transiton-all duration-300 hover:text-green-400'
                                            >
                                                <div className='uppercase flex gap-3 items-center transiton-all duration-300 transform hover:translate-x-2'>
                                                    View All
                                                    <GrFormNextLink />
                                                </div>
                                            </a>
                                        </ul>
                                    </div>
                                ))}

                                {filteredWellnessImg?.map((data, id) => (
                                    <>
                                        {data.attributes.header_url &&
                                            <div key={id} className='flex-grow gap-4 flex flex-col '>
                                                <img src={data.attributes.header_url} alt={data.attributes.name} />
                                            </div>
                                        }
                                    </>

                                ))}
                            </div>
                        }
                    </div>
                }
            </header >

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default HeaderWeb;