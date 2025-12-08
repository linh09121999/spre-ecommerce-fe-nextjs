"use client"
import React, { useState, useEffect, useMemo, useRef, Fragment } from 'react';
import Nav from './Nav';
import {
    TextField,
    InputAdornment, MenuItem, Menu,
    IconButton, Avatar, Stack, Badge, styled, Backdrop,
    Autocomplete,
    debounce,
    CircularProgress,
    Typography,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@mui/material'
import type { SxProps, Theme } from "@mui/material/styles";
import { Box, display, height, keyframes } from "@mui/system";

import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResAccount, useState_ResProducts, useState_ResStores, useState_ResTaxons } from '@/useState/useStatestorefront';
import { FaChevronDown, FaChevronUp, FaRegHeart, FaRegUser } from 'react-icons/fa';
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
import { ListAllProducts } from '@/service/storefront/products';
import { IncludedImage } from '@/interface/interface';
import { RiMenuFoldLine, RiMenuUnfold3Line, RiMenuUnfoldLine } from 'react-icons/ri';
import { useMediaQuery } from '@mui/material';

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
            border: '1px solid var(--color-gray-300)',
            height: '60px',
            '@media(max-width: 1024px)': {
                height: '45px',
            }
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
            // color: 'var(--color-green-300)',
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
        color: 'var(--color-red-500)',
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

    const sxButtonSearch: SxProps<Theme> = {
        background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        border: "none",
        color: 'white',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        '@media(max-width: 1024px)': {
            width: '32px',
            height: '32px',
        },
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
        "&:hover .svgWrapper": {
            animation: `${fly1} 0.6s ease-in-out infinite alternate`,
            color: 'black'
        },
    }

    const componentsProps: SxProps<Theme> = {
        paper: {
            sx: {
                background: 'rgb(255,255,255)',
                backdropFilter: 'blur(20px)',
                zIndex: 100,
                minHeight: '70px',
                '& .MuiAutocomplete-noOptions': {
                    minHeight: '30px !important',
                    // color: 'var(--color-green-600) !important',
                },
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    // color: 'var(--color-green-600) !important',
                },
                '& .MuiAutocomplete-option:hover': {
                    background: 'rgb(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--color-green-600) !important',
                    fontWeight: 600
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    background: 'rgb(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--color-green-600) !important',
                    fontWeight: 600
                }
            }
        }
    }

    const sxPaperPropsDrawer: SxProps<Theme> = {
        sx: {
            background: 'white',
            backdropFilter: 'blur(10px)'
        }
    }

    const sxDivider: SxProps<Theme> = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }

    const sxListItemDrawer: SxProps<Theme> = {
        padding: '8px 24px',
        cursor: 'pointer',
        '&:hover': {
            color: 'var(--color-green-600) !important',
            background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const sxListItemDrawer1: SxProps<Theme> = {
        padding: '8px 40px',
        cursor: 'pointer',
        '&:hover': {
            color: 'var(--color-green-600) !important',
            background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const sxBox1Drawer = {
        width: '100vw',
        height: '95vh',
        display: 'grid',
    }

    const sxPrimaryTypographyProps = {
        fontSize: '1rem',
        fontWeight: 'medium',
        transition: 'all 0.3s ease',
    }

    const router = useRouter();

    const { setResStores } = useState_ResStores()
    const { resTaxons_List, setResTaxons_List } = useState_ResTaxons()
    const { resAccount, setResAccount } = useState_ResAccount()
    const { resDataIcludes_Search, resDataProducts_Search, setResDataIcludes_Search, setResDataProduct_Search } = useState_ResProducts()

    const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

    const getApiProducts = async (filter_name: string, page: number, per_page: number, include: string) => {
        try {
            setLoadingSearch(true)
            const res = await ListAllProducts({ filter_name, page, per_page, include })
            setResDataProduct_Search(res.data.data);
            setResDataIcludes_Search(res.data.included)
        } catch (error: any) {
            toast.error(`Products: ` + error.response.data.error)
            setResDataProduct_Search([])
            setResDataIcludes_Search([])
        }
        finally {
            setLoadingSearch(false);
        }
    }

    const {
        setLoading, heartNumber, pages, setSelectNav,
        setIsSearch, isSearch, loading,
        hoveredNav, setHoveredNav } = useStateGeneral()

    const [error500, setError500] = useState<number>(201)

    const getApiStores = async () => {
        try {
            setLoading(true);
            const res = await ReturnTheCurrentStore()
            setResStores(res.data)
        } catch (error: any) {
            toast.error(`Stores: ` + error.response.data.error)
            setError500(error.response.status)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const isXL = useMediaQuery('(min-width:1280px)');
    useEffect(() => {
        if (isXL && openDrawer) {
            setOpenDrawer(false);
        }
    }, [isXL]);

    useEffect(() => {
        if (error500 === 500) {
            router.push('/500')
        }
    }, [error500, getApiStores])

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

    const { handleLogOut, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            getApiAccount("default_billing_address")
        }
    }, [isAuthenticated])

    useEffect(() => {
        getApiStores()
        getApiTaxons(1, 100)
        postApiCart()
    }, [])


    const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
    const openAccount = Boolean(anchorElAccount);

    const handleClickAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
        isAuthenticated ?
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
        if (isAuthenticated) {
            router.push('/heart')
        } else {
            router.push('/login')
        }
    }
    const lastQueryRef = useRef("");
    const [selectSearchSlug, setSelectSearchSlug] = useState<string | null>(null)

    const debouncedFetch = useMemo(
        () =>
            debounce(async (value: string) => {
                const trimmed = value.trim();
                // Nếu từ khóa giống lần trước thì bỏ qua (chặn call liên tục)
                if (trimmed === lastQueryRef.current) return;

                lastQueryRef.current = trimmed;

                if (trimmed.length > 0) {
                    getApiProducts(trimmed, 1, 25, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
                } else {
                    setResDataProduct_Search([])
                    setResDataIcludes_Search([])
                }
            }, 400),
        []
    );

    const handleChangeSearch = (_: any, newValue: any | null) => {
        if (!newValue) {
            setResDataProduct_Search([]);
            setResDataIcludes_Search([]);
            lastQueryRef.current = "";
            return;
        };

        const productSlug = newValue.attributes?.slug;
        if (!productSlug) return;

        setSelectSearchSlug(productSlug);

        // Clear kết quả tìm kiếm sau khi chọn
        setResDataProduct_Search([]);
        setResDataIcludes_Search([]);
        lastQueryRef.current = "";

        router.push(`/product/${productSlug}`);
    };

    const handleInputChange = (_: any, value: string, reason: string) => {
        // MUI gọi event "reset" khi chọn option → bỏ qua tránh gọi lại API
        if (reason === "clear" || reason === "reset") {
            setResDataProduct_Search([]);
            setResDataIcludes_Search([]);
            lastQueryRef.current = "";
            return;
        }
        // Nếu input rỗng, clear kết quả ngay lập tức
        if (value.trim().length === 0) {
            setResDataProduct_Search([]);
            setResDataIcludes_Search([]);
            lastQueryRef.current = "";
            return;
        } else {
            debouncedFetch(value);
        }
    };

    useEffect(() => {
        return () => {
            debouncedFetch.clear();
        };
    }, [debouncedFetch]);

    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpenDrawer(newOpen);
    };

    const [showFashion, setShowFashion] = useState<boolean>(false);
    const [showWellness, setShowWellness] = useState<boolean>(false);

    const handleClickAccountDrawer = () => {
        if (isAuthenticated) {
            setOpenDrawer(false)
            router.push('/setting')
        } else {
            setOpenDrawer(false)
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
                    <div className='lg:hidden flex md:gap-3 items-center'>
                        <IconButton
                            onClick={toggleDrawer(true)}
                        >
                            <RiMenuUnfoldLine className='mx-auto' size={24} />
                        </IconButton>
                        <button className='p-2 css-icon ' aria-label='search'
                            onClick={() => setIsSearch(true)}
                        >
                            <span className='text-black text-2xl  svgWrapper'>
                                <IoMdSearch className="mx-auto" />
                            </span>
                        </button>
                        <Drawer
                            anchor="left"
                            open={openDrawer}
                            onClose={toggleDrawer(false)}
                            PaperProps={sxPaperPropsDrawer}
                        >
                            <Box sx={sxBox1Drawer}>
                                <div className='max-h-70vh flex flex-col overflow-y-auto scroll-y'>
                                    <div className='flex justify-between items-center px-[16px] py-[12px] cursor-pointer'>
                                        <a onClick={() => {
                                            setOpenDrawer(false)
                                            router.push('/')
                                        }}>
                                            <img className="w-30 custom-desktop-height "
                                                alt="Spree Commerce DEMO logo"
                                                src="../../LogoFullBlack.webp" />
                                        </a>
                                        <IconButton onClick={toggleDrawer(false)} >
                                            <RiMenuFoldLine className='mx-auto' size={24} />
                                        </IconButton>
                                    </div>
                                    <Divider sx={sxDivider} />
                                    <List>
                                        {pages.map((page, index) => (
                                            <Fragment key={index}>
                                                <ListItem
                                                    component="button"
                                                    onClick={() => {
                                                        if (index === 1) {
                                                            setShowFashion(!showFashion)
                                                        }
                                                        else if (index === 2) {
                                                            setShowWellness(!showWellness)
                                                        }
                                                        else {
                                                            setOpenDrawer(false)
                                                            setSelectNav(index)
                                                            router.push(page.path)
                                                        }
                                                    }}
                                                    sx={sxListItemDrawer}
                                                >
                                                    <div className='flex justify-between w-full items-center'>
                                                        <ListItemText
                                                            primary={page.title}
                                                            primaryTypographyProps={sxPrimaryTypographyProps}
                                                        />
                                                        {(index === 1) &&
                                                            <span className="">{showFashion ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</span>

                                                        }
                                                        {(index === 2) &&
                                                            <span className="">{showWellness ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}</span>

                                                        }
                                                    </div>

                                                </ListItem>
                                                {(showFashion && index === 1) &&
                                                    <div className='flex flex-col'>
                                                        {[
                                                            { filter: filterFashionMen, title: "Men" },
                                                            { filter: filterFashionWomen, title: "Women" },
                                                            { filter: filterFashionAccessories, title: "Accessories" },
                                                        ].map(({ filter, title }, index) => (
                                                            <ListItem
                                                                component="button"
                                                                key={index}
                                                                onClick={() => {
                                                                    setOpenDrawer(false)
                                                                    router.push(`/${toPath(title)}`)
                                                                }}
                                                                sx={sxListItemDrawer1}
                                                            >
                                                                <ListItemText
                                                                    primary={title}
                                                                    primaryTypographyProps={sxPrimaryTypographyProps}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </div>
                                                }
                                                {(showWellness && index === 2) &&
                                                    <div className='flex flex-col'>
                                                        {[
                                                            { filter: filterWellnessFitness, title: "Fitness" },
                                                            { filter: filterWellnessRelaxation, title: "Relaxation" },
                                                            { filter: filterWellnessMentalStimulation, title: "Mental Stimulation" },
                                                            { filter: filterWellnessNutrition, title: "Nutrition" },
                                                        ].map(({ filter, title }, index) => (
                                                            <ListItem
                                                                component="button"
                                                                key={index}
                                                                onClick={() => {
                                                                    setOpenDrawer(false)
                                                                    router.push(`/${toPath(title)}`)
                                                                }}
                                                                sx={sxListItemDrawer1}
                                                            >
                                                                <ListItemText
                                                                    primary={title}
                                                                    primaryTypographyProps={sxPrimaryTypographyProps}
                                                                />
                                                            </ListItem>
                                                        ))}
                                                    </div>
                                                }
                                            </Fragment>
                                        ))}
                                    </List>
                                </div>
                                <div className='flex flex-col gap-4 px-[24px] p-5 mt-auto'>
                                    <button className="h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl uppercase
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                        onClick={handleClickAccountDrawer}
                                    >
                                        {isAuthenticated ? 'My Account' : 'Login'}
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                    {isAuthenticated &&
                                        <button
                                            onClick={() => {
                                                handleLogOut()
                                            }}
                                            className='px-16 uppercase h-[45px] rounded-xl border border-green-600 text-green-600 font-semibold transition-transform hover:border-green-700 hover:scale-105'
                                        >Log out</button>
                                    }
                                </div>
                            </Box>
                        </Drawer>
                    </div>

                    <a onClick={() => {
                        router.push('/')
                    }}>
                        <img className="w-30 custom-desktop-height "
                            alt="Spree Commerce DEMO logo"
                            src="../../LogoFullBlack.webp" />
                    </a>
                    <Nav
                        classNameUl='flex list-none gap-7 uppercase text-lg max-lg:hidden'
                        classNameA={` size-[24px] relative cursor-pointer transiton-all duration-300 mo-underline after:absolute after:bottom-[-5px] after:left-0 after:h-[2px]  after:transistion-all after:duration-300 after:w-full after:visible after:scale-x-0 hover:after:w-full hover:after:scale-x-100  menu-item header--nav-link`}
                        classNameAActive='text-green-500 after:scale-x-100 after:bg-green-500'
                        classNameAHover=' after:scale-x-100 after:bg-gray-200'
                        classNameADeactive='text-gray-500'
                    />
                    <div className='flex justify-between md:gap-4 gap-1 items-center'>
                        {/* search */}
                        <div className='max-lg:hidden'>
                            <button className='p-2 css-icon ' aria-label='search'
                                onClick={() => setIsSearch(true)}
                            >
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <IoMdSearch className="mx-auto" />
                                </span>
                            </button>
                        </div>
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
                        <button className='p-2 css-icon ' aria-label='heart'
                            onClick={handleHeart}
                        >
                            <Badge badgeContent={heartNumber} sx={sxBadge}>
                                <span className='text-black text-2xl max-md:text-xl svgWrapper'>
                                    <FaRegHeart className="mx-auto" />
                                </span>
                            </Badge >
                        </button>
                        {/* user */}
                        <div className='max-lg:hidden'>
                            <button className='p-2 css-icon ' aria-label='user'
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
                            {isAuthenticated &&
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
                                    {/* <MenuItem sx={sxMenuItem}
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

                                    </MenuItem> */}
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
                                        }}
                                    >
                                        <div className='flex gap-3 items-center'>
                                            <span className='text-xl rotate-[180deg]'><FiLogOut /></span>
                                            <span className={` text-lg transition-all duration-300 ease-in-out`}>Logout</span>
                                        </div>
                                    </MenuItem>
                                </Menu>
                            }
                        </div>
                    </div>
                    {isSearch &&
                        <Backdrop
                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                            open={isSearch}
                        >
                            <div className="w-full min-w-[340px] max-w-[600px] px-5">
                                <Autocomplete
                                    noOptionsText={loadingSearch ?
                                        < Backdrop
                                            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                            open={loading}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                        : <p className='text-center h-full items-center'>There is no data</p>}
                                    options={resDataProducts_Search}
                                    componentsProps={componentsProps}
                                    getOptionLabel={(option) => option.attributes.name}
                                    renderOption={(props, option) => {
                                        const { key, ...optionProps } = props;
                                        const getProductImage = () => {
                                            try {
                                                if (!option.relationships?.images?.data?.length) return null;

                                                const imageId = option.relationships.images.data[0].id;
                                                const imageData = resDataIcludes_Search?.find(
                                                    (item): item is IncludedImage => item.type === 'image' && item.id === imageId
                                                );

                                                return imageData?.attributes?.original_url || null;
                                            } catch (error) {
                                                console.error('Error loading product image:', error);
                                                return null;
                                            }
                                        };

                                        const productImage = getProductImage();
                                        return (
                                            <Box
                                                key={key}
                                                component="li"
                                                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                                {...optionProps}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', py: 1, gap: 2 }}>
                                                    {productImage ? (
                                                        <div className="relative overflow-hidden rounded-xl w-21 h-21">
                                                            <img src={productImage} alt={option.attributes.name} />
                                                            <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                                            {(option.attributes.compare_at_price && priceInfo(option.attributes.price, option.attributes.compare_at_price) > 0) &&
                                                                <span className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm">
                                                                    -{priceInfo(option.attributes.price, option.attributes.compare_at_price)}%
                                                                </span>
                                                            }
                                                        </div>

                                                    ) : (
                                                        // Placeholder khi không có image
                                                        <Box
                                                            sx={{
                                                                width: 60,
                                                                height: 60,
                                                                bgcolor: 'grey.200',
                                                                mr: 2,
                                                                borderRadius: 1,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                flexShrink: 0
                                                            }}
                                                        >
                                                            <span style={{ color: 'grey.500', fontSize: 12 }}>No Image</span>
                                                        </Box>
                                                    )}

                                                    <Box>
                                                        <Typography variant="body1" fontWeight="medium">
                                                            {option.attributes.name}
                                                        </Typography>
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xl font-semibold text-green-700">${option.attributes.price}</span>
                                                            {Number(option.attributes.compare_at_price) > 0 && (
                                                                <span className="text-gray-400 line-through text-sm">
                                                                    ${option.attributes.compare_at_price}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        );
                                    }}
                                    filterOptions={(x) => x}
                                    value={
                                        selectSearchSlug
                                            ? resDataProducts_Search.find((c) => c.attributes.slug === selectSearchSlug) ?? undefined
                                            : null
                                    }
                                    onChange={handleChangeSearch}
                                    onInputChange={handleInputChange}
                                    renderInput={(params) => (
                                        <TextField  {...params}
                                            type="search"
                                            placeholder="Search of name..."
                                            sx={sxTextField}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            className='group relative transition-all duration-300 hover:scale-105'
                                                            sx={sxButtonSearch}
                                                        >
                                                            <div className="relative flex items-center">
                                                                <IoMdSearch className="mx-auto text-green-600 group-hover:text-white transition" />
                                                            </div>
                                                            <div className="absolute inset-0 overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                            </div>
                                                            <div className="absolute inset-0 rounded-[25px] animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        </IconButton>
                                                        < IconButton
                                                            sx={sxButton}
                                                            onClick={() => {
                                                                setIsSearch(false)
                                                                setResDataProduct_Search([])
                                                                setResDataIcludes_Search([])
                                                            }}>
                                                            <IoClose className=" mx-auto" />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}

                                        />
                                    )}
                                />
                            </div>
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
                                ].map(({ filter, title }, index) => (
                                    <div className='flex-grow gap-4 flex flex-col ' key={index}>
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
                                ].map(({ filter, title }, index) => (
                                    <div className='flex-grow gap-4 flex flex-col ' key={index}>
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

                                {filteredWellnessImg?.map((data, id) =>
                                    data.attributes.header_url && (
                                        <div key={id} className="flex-grow gap-4 flex flex-col">
                                            <img
                                                src={data.attributes.header_url}
                                                alt={data.attributes.name}
                                            />
                                        </div>
                                    )
                                )}

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