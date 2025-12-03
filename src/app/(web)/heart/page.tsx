"use client"
import { CreateAWishlist, DeleteAWishlist, ListAllWishlists, RetrieveAWishlist } from "@/service/storefront/wishlists";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { useState_ResWishlists } from "@/useState/useStatestorefront";
import { Dialog, DialogContent, Menu, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import type { SxProps, Theme } from "@mui/material/styles";

import React, { useState, useEffect, useMemo } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineErrorOutline } from "react-icons/md";
import { WishlistCreate } from "@/interface/sendData/interfaceStorefront";
import { DeleteItemFromWishlist, DeleteItemsFromWishlist } from "@/service/storefront/wishlistsWishedItems";
import { IncludedImage, IncludedVariant, ProcessedWishedItem } from "@/interface/interface";
import { Product, WishListItem } from "@/interface/responseData/interfaceStorefront";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsBox2Heart } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

const HeartFrom: React.FC = () => {
    const router = useRouter()
    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-white)",
            height: '45px',
            // boxShadow: 'var(--shadow-lg)',
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
            border: '1px solid var(--color-gray-200)',
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
            color: 'black',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }

    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: 'calc(100%)',
            background: 'rgb(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
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
        color: 'rgb(0,0,0,0.7)',
        zIndex: 100,
        '&:hover': {
            background: 'rgb(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--color-green-600) !important',
            fontWeight: 600
        },
    }

    const {
        setLoading, setSelectNav } = useStateGeneral()

    const { resWishlists_List, setResWishlists_List, resWishlists, setResWishlists } = useState_ResWishlists()

    const getApiListWishlist = async (include: string) => {
        try {
            setLoading(true);
            const res = await ListAllWishlists({ include })
            setResWishlists_List(res.data)
        } catch (error: any) {
            toast.error(`Wish lists: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiRetrieveWishlist = async (token: string, include: string) => {
        try {
            setLoading(true);
            const res = await RetrieveAWishlist(token, { include })
            setResWishlists(res.data)
        } catch (error: any) {
            toast.error(`Wish lists items: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const [selectedWishlist, setSelectedWishlist] = useState<string | null>(null);

    useEffect(() => {
        setSelectNav(null)
        AOS.init({
            duration: 2000,
            once: false,
            mirror: true,
        });
        const token = localStorage.getItem("token")
        if (token) {
            getApiListWishlist("wished_items")
        }
        else {
            router.push('/')
        }
    }, [])

    const handleOpenWishList = (token: string) => {
        setSelectedWishlist(token)
        getApiRetrieveWishlist(token, "wished_items.variant,wished_items.variant.product,wished_items.variant.images")
    }


    const [newNameWishlist, setNewNameWishlist] = useState<string>("")
    const [errorNewNameWishlist, setErrorNewNameWishlist] = useState<string>("")
    const [errorCreateWishlist, setErrorCreateWishlist] = useState<string>("")

    const handleCreateWishlist = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newNameWishlist || newNameWishlist.trim() === "") {
            setErrorNewNameWishlist("Unable to leave empty!")
            return
        }

        const data: WishlistCreate = {
            name: newNameWishlist,
            is_private: false,
            is_default: true
        }

        try {
            setLoading(true);
            const res = await CreateAWishlist(data)
            setErrorCreateWishlist("")
            setOpenCreateWishlist(false)
            getApiListWishlist("wished_items")
        } catch (error: any) {
            setErrorCreateWishlist(error.response.data.error)
            console.log(error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
            setNewNameWishlist("")
        }
    }

    const [openCreateWishlist, setOpenCreateWishlist] = useState<boolean>(false)

    const handleDeleteWistlist = async (token: string) => {
        try {
            setLoading(true);
            const res = await DeleteAWishlist(token)
            getApiListWishlist("wished_items")
            if (selectedWishlist === token) {
                setResWishlists(undefined)
                setSelectedWishlist(null)
            }

        } catch (error: any) {
            toast.error(`delete wistlist: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const handleRemoveAItemWishlist = async (token: string, item_id: string) => {
        try {
            setLoading(true);
            const res = await DeleteItemFromWishlist(token, item_id)
            getApiRetrieveWishlist(token, "wished_items.variant,wished_items.variant.product,wished_items.variant.images")
        } catch (error: any) {
            toast.error(`delete item wistlist: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const handleRemoveAllItemWistlist = async (token: string, ids: string[]) => {
        const data = {
            wished_items_ids: ids
        };

        try {
            setLoading(true);
            const res = await DeleteItemsFromWishlist(data, token)
            getApiRetrieveWishlist(token, "wished_items.variant,wished_items.variant.product,wished_items.variant.images")
        } catch (error: any) {
            toast.error(`delete item wistlist: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const processedWishedItems = useMemo((): ProcessedWishedItem[] => {
        if (!resWishlists?.data?.relationships?.wished_items?.data || !resWishlists?.included) {
            return [];
        }

        const wishedItems: ProcessedWishedItem[] = [];

        // Lấy tất cả wished items từ relationships
        resWishlists.data.relationships.wished_items.data.forEach(wishedItemRef => {
            // Tìm wished item trong included
            const wishedItem = resWishlists.included.find(
                (item): item is WishListItem =>
                    item.type === 'wished_item' && item.id === wishedItemRef.id
            );

            if (wishedItem) {
                // Tìm variant tương ứng
                const variantId = wishedItem.relationships.variant.data.id;
                const variant = resWishlists.included.find(
                    (item): item is IncludedVariant =>
                        item.type === 'variant' && item.id === variantId
                );

                if (variant) {
                    // Tìm product tương ứng thông qua variant
                    let product: Product | undefined;
                    if (variant.relationships?.product?.data?.id) {
                        product = resWishlists.included.find(
                            (item): item is Product =>
                                item.type === 'product' &&
                                item.id === variant.relationships!.product!.data.id
                        );
                    }

                    // Tìm image cho variant
                    let original_url = '';
                    if (variant.relationships?.images?.data && variant.relationships.images.data.length > 0) {
                        const imageId = variant.relationships.images.data[0].id;
                        const image = resWishlists.included.find(
                            (item): item is IncludedImage =>
                                item.type === 'image' && item.id === imageId
                        );
                        if (image) {
                            original_url = image.attributes.original_url;
                        }
                    }
                    // Nếu không tìm thấy image từ variant, thử tìm từ product
                    if (!original_url && product?.relationships?.images?.data && product.relationships.images.data.length > 0) {
                        const imageId = product.relationships.images.data[0].id;
                        const image = resWishlists.included.find(
                            (item): item is IncludedImage =>
                                item.type === 'image' && item.id === imageId
                        );
                        if (image) {
                            original_url = image.attributes.original_url;
                        }
                    }

                    wishedItems.push({
                        id: wishedItem.id,
                        variantId: variant.id,
                        original_url,
                        quantity: wishedItem.attributes.quantity,
                        price: wishedItem.attributes.price,
                        compare_at_price: product?.attributes.compare_at_price || "",
                        display_price: wishedItem.attributes.display_price,
                        product_name: product?.attributes.name || 'Unknown Product',
                        options_text: variant.attributes.options_text,
                        slug: product?.attributes.slug || ""
                    });
                }
            }
        });

        return wishedItems;
    }, [resWishlists]);

    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const [anchorElEditMode, setAnchorElEditMode] = useState<null | HTMLElement>(null);
    const openEditMode = Boolean(anchorElEditMode);
    const handleClickEditMode = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElEditMode(event.currentTarget);
    };
    const handleCloseEditMode = () => {
        setAnchorElEditMode(null);
    };

    return (
        <>
            <div className="max-w-[1535px] mx-auto max-2xl:px-5 py-5 flex flex-col">
                <div className="grid lg:grid-cols-[300px_1fr] lg:gap-10 gap-5">
                    <aside className="grid h-fit max-lg:hidden  gap-5 "
                        data-aos="fade-right"
                        data-aos-duration="3000"
                    >
                        <div className="flex items-center justify-between h-[40px]">
                            <h2 className="text-xl font-semibold">My Wish Lists</h2>
                            {/* <button className="text-sm text-red-500 hover:underline flex items-center gap-2"><FaTrashAlt className="text-red-500" />Delete all</button> */}
                        </div>
                        <div className="flex flex-col gap-2">
                            {resWishlists_List?.data.map((res) => (
                                <button
                                    aria-label="click wishlist"
                                    onClick={() =>
                                        handleOpenWishList(res.attributes.token)
                                    }
                                    className={`w-full items-center flex justify-between transition-all duration-300 hover:bg-green-50 hover:text-green-600 hover:pl-2
                                ${selectedWishlist === res.attributes.token ? 'pl-2  border-l-[4px] bg-green-100 border-l-green-500 text-green-800' : 'text-gray-500'}
                                `} key={res.id}>
                                    <button

                                        className={` py-4  text-lg`}
                                    >
                                        <p className="relative z-10 text-start ">{res.attributes.name}</p>
                                    </button>
                                    <button
                                        aria-label="delete wishlist"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteWistlist(res.attributes.token)
                                        }}
                                        className="mr-2 transition-all duration-300 
                                    text-xs text-red-400 hover:text-red-600 hover:scale-110">
                                        Delete
                                    </button>

                                </button>
                            ))}
                            {errorCreateWishlist && (
                                <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                    <MdOutlineErrorOutline className="mx-auto" size={21} />
                                    <span>{errorCreateWishlist}</span>
                                </div>
                            )}

                            <form onSubmit={handleCreateWishlist} className="flex flex-col gap-6">
                                <div className="flex gap-3 pt-2">
                                    <div className="flex flex-col gap-2">

                                        <div className="relative">
                                            <TextField
                                                type="text"
                                                required
                                                placeholder="e.g. Birthday Wishes, Christmas List"
                                                name="name"
                                                value={newNameWishlist}
                                                variant="outlined"
                                                sx={sxTextField}
                                                onChange={(e) => setNewNameWishlist(e.target.value)}
                                                error={Boolean(errorNewNameWishlist)}
                                                helperText={errorNewNameWishlist}
                                            />
                                        </div>
                                    </div>


                                    <button
                                        type="submit"
                                        className="h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-5 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                    >
                                        <span className="relative z-10">Add</span>
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </aside>
                    <div className="lg:hidden flex overflow-x-auto scroll-x gap-5 py-3"
                        data-aos="fade-right"
                        data-aos-duration="3000"
                    >
                        {resWishlists_List?.data.map((res) => (
                            <>
                                <div className="relative group">
                                    <button
                                        aria-label="click wishlist"
                                        className={`${selectedWishlist === res.attributes.token ? 'text-white border border-green-700 shadow-lg' : 'bg-gray-100 group-hover:bg-green-100 group-hover:border-green-200'} text-lg flex group items-center  group-hover:shadow-lg w-fit  gap-3 px-4 h-[45px] rounded-xl  transition-all duration-300`}
                                        onClick={() =>
                                            handleOpenWishList(res.attributes.token)
                                        }>
                                        <p className={`${selectedWishlist === res.attributes.token ? 'text-green-700 font-bold' : 'text-slate-700 group-hover:text-green-700'} max-sm:text-sm text-lg whitespace-nowrap transition-all duration-500`}>{res.attributes.name}</p>
                                    </button>
                                    <button
                                        aria-label={`delete wishlist ${res.id}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteWistlist(res.attributes.token)
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
                                </div>
                            </>

                        ))}
                        <button
                            onClick={() => setOpenCreateWishlist(true)}
                            className="flex px-4 h-[45px] gap-3 max-sm:text-sm text-lg whitespace-nowrap items-center rounded-xl border-[3px] border-dashed transition-all duration-300 border-gray-200 hover:shadow-lg">
                            Add WishList
                        </button>
                        <Dialog open={openCreateWishlist} onClose={() => setOpenCreateWishlist(false)}>
                            <DialogContent
                                sx={{
                                    padding: 0,
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    background: "transparent",
                                }}
                            >
                                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                    <div className="w-full max-w-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-2xl relative overflow-hidden">
                                        <button
                                            onClick={() => setOpenCreateWishlist(false)}
                                            className="absolute top-3 right-3 w-10 h-10 z-50 flex items-center justify-center
    rounded-full bg-white/70 backdrop-blur-md shadow-lg
    hover:bg-white hover:shadow-xl hover:-translate-y-0.5
    transition-all duration-300 border border-white/60"
                                        >
                                            <span className="text-gray-600 text-xl font-bold">×</span>
                                        </button>
                                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-200/30 rounded-full blur-xl"></div>
                                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-200/30 rounded-full blur-xl"></div>
                                        <div className="relative z-10">
                                            <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text mb-2">
                                                Create An Wishlist
                                            </h1>
                                            {errorCreateWishlist &&
                                                <div className="p-4 mb-6 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                                    <MdOutlineErrorOutline className="mx-auto" size={21} />
                                                    <span>{errorCreateWishlist}</span>
                                                </div>
                                            }
                                            <form onSubmit={handleCreateWishlist} className="flex flex-col gap-5">
                                                <div className="flex flex-col gap-1">
                                                    <label htmlFor="name" className="block text-md font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        autoComplete='name'
                                                        placeholder="e.g. Birthday Wishes, Christmas List"
                                                        name="name"
                                                        value={newNameWishlist}
                                                        variant="outlined"
                                                        sx={sxTextField}
                                                        onChange={(e) => setNewNameWishlist(e.target.value)}
                                                        error={Boolean(errorNewNameWishlist)}
                                                        helperText={errorNewNameWishlist}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenCreateWishlist(false)}
                                                        className="
                                    flex-1 py-3 rounded-xl 
                                    text-lg font-semibold text-gray-700
                                    bg-gray-100 hover:bg-gray-200
                                    shadow-md hover:shadow-lg
                                    transition-all duration-300
                                "
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                                    >
                                                        <span className="relative z-10">Create An Address</span>
                                                        <div className="absolute inset-0 overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                        </div>
                                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    {(selectedWishlist && resWishlists?.data && resWishlists?.included) ?
                        <section className="flex flex-col gap-5"
                            data-aos="fade-left"
                            data-aos-duration="3000">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                        {resWishlists?.data.attributes.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1">
                                        {resWishlists?.data.relationships.wished_items.data.length || 0} items in this list
                                    </p>
                                </div>
                                <div className="flex gap-5 max-sm:hidden">
                                    <button
                                        onClick={() => {
                                            handleDeleteWistlist(resWishlists.data.attributes.token)
                                        }}
                                        className="text-red-500 hover:underline text-sm font-medium">
                                        Delete Wishlist
                                    </button>
                                    {resWishlists?.included.length > 0 &&
                                        <button
                                            onClick={() => handleRemoveAllItemWistlist(resWishlists?.data.attributes.token, resWishlists?.included.map((item) => item.id))}
                                            className="flex items-center bg-red-50 text-red-600 px-3 py-2 rounded-xl hover:bg-red-100 text-sm font-medium transition"
                                        >
                                            Clear All Items
                                        </button>
                                    }
                                </div>
                                <button
                                    onClick={handleClickEditMode}
                                    className="sm:hidden flex hover:underline transition-all duration-300 items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition"
                                >
                                    <span className="">{openEditMode ? "Done" : "Edit"}</span>
                                </button>
                                <Menu
                                    anchorEl={anchorElEditMode}
                                    open={openEditMode}
                                    onClose={handleCloseEditMode}
                                    PaperProps={PaperProps}
                                    MenuListProps={MenuListProps}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseEditMode()
                                            handleDeleteWistlist(resWishlists.data.attributes.token)
                                        }}
                                        sx={sxMenuItem}>
                                        Delete Wishlist
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            handleCloseEditMode()
                                            handleRemoveAllItemWistlist(resWishlists?.data.attributes.token, resWishlists?.included.map((item) => item.id))
                                        }}

                                        sx={sxMenuItem}>
                                        Clear All Items
                                    </MenuItem>
                                </Menu>
                            </div>
                            {processedWishedItems ?
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                    {processedWishedItems.map((res) => (
                                        <button
                                            onClick={() => {
                                                router.push(`/product/${res?.slug}`)
                                            }}
                                            className="group relative hover:bg-gradient-to-br hover:from-white hover:via-gray-50 hover:to-gray-100 hover:rounded-xl hover:shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden border border-transparent hover:border-gray-100" key={res.id}>
                                            <div className="relative overflow-hidden hover:rounded-t-xl">
                                                <img src={res.original_url} alt={`img ${res.id}`}
                                                    className="w-full aspect-[1/1] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                                <div className="absolute top-3 left-3 ">

                                                    {(res?.compare_at_price && priceInfo(res?.price, res?.compare_at_price) > 0) &&
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow">
                                                            -{priceInfo(res?.price, res?.compare_at_price)}%
                                                        </span>
                                                    }

                                                </div>
                                                <button
                                                    aria-label="click heart"
                                                    className="absolute bottom-3 right-3 bg-white/90 hover:bg-red-600 text-gray-800 hover:text-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveAItemWishlist(resWishlists.data.attributes.token, res.id)
                                                    }}
                                                >
                                                    <FaTrashAlt className="text-lg" />
                                                </button>

                                            </div>
                                            <div className="flex flex-col gap-3 p-5">
                                                <h3 className="font-semibold text-start text-gray-900 text-base tracking-wide line-clamp-2 group-hover:text-green-700 transition-colors duration-300">
                                                    {res.product_name}
                                                </h3>
                                                <span className="text-sm text-start text-gray-500">{res.options_text}</span>
                                                <span className="text-sm flex items-center gap-2 font-semibold">
                                                    Quantity: {res.quantity || 1}
                                                </span>
                                                <div className="flex items-center gap-4" >
                                                    <div className="flex items-end gap-2">
                                                        <span className="text-2xl font-bold text-green-700">
                                                            ${res?.price}
                                                        </span>
                                                        {Number(res?.compare_at_price) > 0 && (
                                                            <span className="text-md text-gray-400 line-through">
                                                                ${res?.compare_at_price}
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                :
                                <div className="flex flex-col gap-5 justify-center items-center">
                                    <img className="w-56" src="../../no-items-in-wishlist.webp" alt="no items in wishlist" />
                                    <button
                                        onClick={() => router.push('/all-product')}
                                        className="flex items-center justify-center gap-2 group transition-all duration-300 text-green-500 hover:text-green-700"
                                    >
                                        <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow group-hover:shadow-lg transition-all">
                                            <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                                        </span>
                                        Continue shopping</button>
                                </div>
                            }
                            <button
                                onClick={() => router.push('/all-product')}
                                className="flex items-center justify-center gap-2 group transition-all duration-300 text-green-500 hover:text-green-700"
                            >
                                <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow group-hover:shadow-lg transition-all">
                                    <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                                </span>
                                Add item</button>
                        </section>
                        :
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <img className="w-56" src="../../no-items-in-wishlist.webp" alt="no items in wishlist" />
                            <p className="text-center text-gray-500 text-md">Please select wishlist</p>

                        </div>
                    }
                </div >
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default HeartFrom