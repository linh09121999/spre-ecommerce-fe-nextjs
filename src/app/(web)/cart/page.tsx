"use client"
import { IncludedImage, IncludedVariant, IncludeLineItem, ProcessedWishedItem } from "@/interface/interface";
import { Variant } from "@/interface/responseData/interfaceStorefront";
import { LineItemUpdate, WishedItem, WishlistCreate } from "@/interface/sendData/interfaceStorefront";
import { RetrieveACart } from "@/service/storefront/cart";
import { RemoveAnItemToCart, SetLineItemQuantity } from "@/service/storefront/cartLineItems";
import { ValidateOrderPayment } from "@/service/storefront/checkout";
import { ListAllProductVariants } from "@/service/storefront/variants";
import { CreateAWishlist, ListAllWishlists } from "@/service/storefront/wishlists";
import { AddItemToWishlist } from "@/service/storefront/wishlistsWishedItems";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { useState_ResCart, useState_ResCheckout, useState_ResVariant, useState_ResWishlists } from "@/useState/useStatestorefront";
import { Dialog, DialogContent, Modal, TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaHeart, FaRegHeart, FaShieldAlt, FaShippingFast, FaTrashAlt, FaUndo } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import Image from 'next/image';

const ViewCart: React.FC = () => {

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

    const router = useRouter();
    const {
        setLoading, setSelectNav } = useStateGeneral()
    const { resCart, setResCart } = useState_ResCart()

    const [modalOpenSelectWishlist, setModalOpenSelectWishlist] = useState<boolean>(false)

    const { setResDataVariant_cart, setResIncludeVariant_cart
    } = useState_ResVariant()

    const getApiVariants = async (product_slug: string, include: string) => {
        try {
            setLoading(true)
            const response = await ListAllProductVariants(product_slug, { include })

            setResDataVariant_cart(prev => {
                // Tránh nối trùng dữ liệu
                const newItems = response.data.data.filter(
                    (item: Variant) => !prev.some(p => p.id === item.id) // check theo id hoặc unique field
                );
                return [...prev, ...newItems];
            });
            setResIncludeVariant_cart(prev => {
                // Tránh nối trùng dữ liệu
                const newItems = response.data.included.filter(
                    (item: IncludedImage) => !prev.some(p => p.id === item.id) // check theo id hoặc unique field
                );
                return [...prev, ...newItems];
            });

        } catch (error: any) {
            toast.error(`Variants: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const itemsWithImages = useMemo((): ProcessedWishedItem[] => {
        if (!resCart?.included || !resCart.data?.relationships?.line_items?.data) {
            return [];
        }

        const items: ProcessedWishedItem[] = [];

        const lineItems = resCart.included.filter(
            (item): item is IncludeLineItem => item.type === 'line_item'
        );

        const variants = resCart.included.filter(
            (item): item is IncludedVariant => item.type === 'variant'
        );

        const images = resCart.included.filter(
            (item): item is IncludedImage => item.type === 'image'
        );

        lineItems.forEach((lineItem) => {
            // Tìm variant tương ứng với line item
            const variantId = lineItem.relationships.variant.data.id;
            const variant = variants.find(v => v.id === variantId);

            if (variant) {
                // Tìm images cho variant này
                const variantImages = variant.relationships.images.data.map(imgRef =>
                    images.find(img => img.id === imgRef.id)
                ).filter(Boolean) as IncludedImage[];

                // Lấy original_url từ image đầu tiên (nếu có)
                const originalUrl = variantImages.length > 0
                    ? variantImages[0].attributes.original_url
                    : '';

                items.push({
                    id: lineItem.id,
                    variantId: variant.id,
                    original_url: originalUrl,
                    quantity: lineItem.attributes.quantity,
                    price: lineItem.attributes.price,
                    compare_at_price: variant.attributes.compare_at_price || "",
                    product_name: lineItem.attributes.name || "",
                    options_text: lineItem.attributes.options_text,
                    slug: lineItem.attributes.slug,
                    display_price: lineItem.attributes.display_price,
                });
            }
        });

        return items;

    }, [resCart])

    const getApiRetrieveCart = async (include: string) => {
        try {
            setLoading(true)
            const response = await RetrieveACart({ include });
            setResCart(response.data)
            const cartNumber = response.data.data?.relationships.line_items.data
            localStorage.setItem("cart_number", cartNumber.length);

        } catch (error: any) {
            toast.error(`Retrieve a cart: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const deleteApiLineItem = async (id: string) => {
        try {
            setLoading(true)
            const response = await RemoveAnItemToCart(id);
        } catch (error: any) {
            toast.error(`Remove item cart ${id}: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
            getApiRetrieveCart("line_items,line_items.variant,line_items.variant.images")
        }
    }

    const setApiLineItem = async (line_item_id: string, quantity: number) => {
        const data: LineItemUpdate = {
            line_item_id: line_item_id,
            quantity: quantity
        }
        try {
            setLoading(true)
            const response = await SetLineItemQuantity(data);
        } catch (error: any) {
            toast.error(`Set item cart ${line_item_id}: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
            getApiRetrieveCart("line_items,line_items.variant,line_items.variant.images")
        }
    }

    const { resWishlists_List, setResWishlists_List } = useState_ResWishlists()

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

    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        setSelectNav(null)
        // getApiEstimatedShippingRate()
        getApiRetrieveCart("line_items,line_items.variant,line_items.variant.images")
        const token = localStorage.getItem("token")
        setToken(token)
        if (token) {
            getApiListWishlist("wished_items")
        }
    }, [])


    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const handleQuantityChange = (id: string, newQuantity: number) => {
        if (newQuantity === 0) {
            handleRemoveItem(id)
        } else {
            setApiLineItem(id, newQuantity)
        }
    };

    const [selectedIdVariant, setSelectedIdVariant] = useState<string | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const openSuccessModal = (message: string, duration: number = 3000) => {
        setSuccessMessage(message);
        setSuccessModalOpen(true);

        // Tự động đóng modal sau 'duration' ms
        setTimeout(() => {
            setSuccessModalOpen(false);
        }, duration);
    };

    const postApiAddItemToWishlist = async (variant_id: string, quantity: number, token: string) => {
        const data: WishedItem = {
            variant_id: variant_id,
            quantity: quantity
        }
        try {
            setLoading(true);
            const res = await AddItemToWishlist(data, token)
            setModalOpenSelectWishlist(false);
            openSuccessModal("Product added to Wish list successfully!");
        } catch (error: any) {
            openSuccessModal("Add item Wish lists failed: " + (error.response?.data?.error || error.message));
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const handleSaveForLater = (id: string, quantity: number) => {
        const token = localStorage.getItem("token")
        if (token) {
            setModalOpenSelectWishlist(true)
            setSelectedIdVariant(id);
            setSelectedQuantity(quantity);
        } else {
            router.push('/login')
        }
    }

    const handleSelectWishlist = (token: string) => {
        if (!selectedIdVariant) return;

        postApiAddItemToWishlist(
            selectedIdVariant,
            selectedQuantity,
            token
        );
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
            setModalOpenSelectWishlist(true)
            getApiListWishlist("wished_items")
        } catch (error: any) {
            setErrorCreateWishlist(error.response.data.error)
            console.log(error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const [openCreateWishlist, setOpenCreateWishlist] = useState<boolean>(false)

    const handleRemoveItem = (id: string) => {
        deleteApiLineItem(id)

    }

    const handleRemoveAllItem = async () => {
        const items = resCart?.included ?? []
        if (items.length === 0) return;

        for (const item of items) {
            try {
                setLoading(true)
                const response = await RemoveAnItemToCart(item.id);
            } catch (error: any) {
                toast.error(`Remove item cart ${item.id}: ` + error.response.data.error)
                throw error;
            } finally {
                setLoading(false);
                getApiRetrieveCart("line_items,line_items.variant,line_items.variant.images")
            }
        }
    }

    const { setResCheckout } = useState_ResCheckout()

    const [errorValidate, setErrorValidate] = useState<string>("")

    const handleValidateOrderPayment = async (include: string) => {
        try {
            setLoading(true);
            const res = await ValidateOrderPayment({ include })
            setResCheckout(res.data)
            setErrorValidate("")

        } catch (error: any) {
            const errRes = error.response;
            setErrorValidate(errRes?.data?.error)
            if (errRes?.data?.data) {
                setResCheckout(errRes.data);   // 👉 lấy data trong lỗi
            }
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
            router.push('/checkout')
        }
    }


    return (
        <>
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-4 text-lg">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow hover:shadow-lg transition-all">
                        <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                        Cart
                    </span>
                </button>
            </div>
            <div className="max-w-[1535px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 p-5">
                <div className="flex flex-col  self-start rounded-xl bg-white p-5 flex-1 shadow-lg order-2 lg:order-1">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                        <div>
                            <h1 className="text-2xl font-bold">Your Cart</h1>
                            <p className="text-sm text-slate-500 mt-1">Review items, adjust quantities, and complete your purchase.</p>
                        </div>

                        {/* Delete All */}
                        {resCart && resCart?.data.relationships.line_items.data.length > 0 && (
                            <button
                                onClick={handleRemoveAllItem}
                                className="flex hover:underline transition-all duration-300 items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition"
                            >
                                <FaTrashAlt className="text-red-500" />
                                Clear All
                            </button>
                        )}
                    </div>
                    {(resCart && resCart?.data.relationships.line_items.data.length === 0) ?
                        <Image src="../../no-items-in-cart.png" alt="no items in cart" />
                        :
                        <>
                            {itemsWithImages && itemsWithImages?.map((res) => (
                                <div
                                    onClick={() => router.push(`/product/${res.slug}`)}
                                    className="flex group relative gap-10 flex-col md:flex-row p-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors rounded-lg">
                                    <div className="relative overflow-hidden rounded-xl ">
                                        <Image src={res.original_url} alt={res?.product_name} className="w-[200px] aspect-[1/1] object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                                        <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                        {(res?.compare_at_price && priceInfo(res?.price, res?.compare_at_price) > 0) &&
                                            <span className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm">
                                                -{priceInfo(res?.price, res?.compare_at_price)}%
                                            </span>
                                        }
                                    </div>
                                    <div className="flex gap-5 justify-between w-full items-center">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{res?.product_name}</h3>

                                                {res?.options_text && (
                                                    <p className="text-gray-600 text-sm leading-relaxed">
                                                        {res?.options_text}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl font-semibold text-green-700">${res?.price}</span>

                                                {Number(res?.compare_at_price) > 0 && (
                                                    <span className="text-gray-400 line-through text-sm">
                                                        ${res?.compare_at_price}
                                                    </span>
                                                )}
                                            </div>
                                            {res?.id &&
                                                <div className="flex items-center gap-4 flex-wrap" >
                                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                                                        <button
                                                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleQuantityChange(res?.id, res?.quantity - 1)
                                                            }}
                                                        >
                                                            −
                                                        </button>
                                                        <span className={`px-5 py-2 bg-white text-center font-semibold `}>{res?.quantity ?? 0}</span>
                                                        <button
                                                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleQuantityChange(res?.id, res?.quantity + 1)
                                                            }}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                </div>
                                            }

                                        </div>
                                        <div className="flex-col flex gap-3">
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Total</p>
                                                <p className="text-2xl font-bold text-green-700">
                                                    ${(parseFloat(res?.price) * (res?.quantity || 0)).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex gap-3 justify-center">
                                                {res?.variantId &&
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleSaveForLater(res?.variantId, res?.quantity)
                                                        }}
                                                        aria-label="Add to Wishlist"
                                                        className="group w-[45px] h-[45px] bg-white border-2 border-gray-300 rounded-xl hover:border-pink-400 transition-all duration-300 hover:scale-110 shadow-md relative overflow-hidden"
                                                    >
                                                        <FaRegHeart className="text-gray-600 text-xl group-hover:text-pink-500 absolute inset-0 m-auto transition-all duration-300 group-hover:scale-110" />
                                                        <FaHeart className="text-pink-500 text-xl absolute inset-0 m-auto scale-0 group-hover:scale-110 transition-all duration-300" />

                                                        {/* Sparkle Effect */}
                                                        <div className="absolute inset-0 overflow-hidden rounded-xl">
                                                            <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-1"></div>
                                                            <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-2"></div>
                                                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-3"></div>
                                                        </div>
                                                    </button>
                                                }
                                                {res?.id &&
                                                    <button aria-label="delete item"
                                                        className="rounded-xl w-[45px] h-[45px] items-center bg-gradient-to-br from-rose-500 to-red-600 text-white font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleRemoveItem(res?.id)
                                                        }}
                                                    >
                                                        <FaTrashAlt className="mx-auto" />
                                                        <div className="absolute inset-0 overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                        </div>
                                                        <div className="absolute inset-0 rounded-xl border-2 border-red-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </button>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
                <Dialog
                    open={modalOpenSelectWishlist}
                    onClose={() => setModalOpenSelectWishlist(false)}
                >
                    <DialogContent
                        sx={{
                            padding: 0,
                            borderRadius: "18px",
                            overflow: "hidden",
                            background: "transparent",
                        }}
                    >
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="w-full max-w-md bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-2xl relative overflow-hidden">

                                {/* Close button */}
                                <button
                                    onClick={() => setModalOpenSelectWishlist(false)}
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
                                        List Wishlist
                                    </h1>

                                    <p className="text-gray-600 text-center mb-6">
                                        Your favorite items are listed here.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        {resWishlists_List?.data &&
                                            <>
                                                {resWishlists_List.data.map((res) => (
                                                    <button
                                                        onClick={() => handleSelectWishlist(res.attributes.token)}
                                                        key={res.id}
                                                        className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group" >
                                                        {res.attributes.name}
                                                        <div className="absolute inset-0 overflow-hidden">
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                        </div>
                                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    </button>
                                                ))}
                                            </>
                                        }
                                        <button
                                            onClick={() => {
                                                setOpenCreateWishlist(true)
                                                setModalOpenSelectWishlist(false)
                                            }}
                                            className="rounded-xl border-2 border-dashed border-gray-300
                                            text-gray-500 font-semibold text-lg flex items-center justify-center gap-2
                                             hover:border-green-400 hover:text-green-600
                                             px-5 py-3
                                              transition-all duration-500 transform hover:scale-105
                                             hover:shadow-xl
                                             bg-white/80 backdrop-blur-sm
                                              group-hover:bg-white/90"
                                        >
                                            <GrAddCircle className="text-2xl" />
                                            <span>Add Wishlist</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
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
                            <div className="w-full max-w-md bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-2xl relative overflow-hidden">
                                {/* Background decorative elements */}
                                <button
                                    onClick={() => {
                                        setOpenCreateWishlist(false)
                                        setModalOpenSelectWishlist(true)
                                    }}
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
                                        Create Wishlist
                                    </h1>

                                    <p className="text-gray-600 text-center mb-6">
                                        Give your wishlist a unique name
                                    </p>

                                    {errorCreateWishlist && (
                                        <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                            <MdOutlineErrorOutline className="mx-auto" size={21} />
                                            <span>{errorCreateWishlist}</span>
                                        </div>
                                    )}

                                    <form onSubmit={handleCreateWishlist} className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                                Wishlist Name
                                            </label>

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

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpenCreateWishlist(false)
                                                    setModalOpenSelectWishlist(true)
                                                }}
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
                                                className="
                                                    flex-1 py-3 rounded-xl 
                                                    text-lg font-semibold text-white
                                                    bg-gradient-to-br from-green-500 to-emerald-600
                                                    hover:from-green-600 hover:to-emerald-700
                                                    shadow-md hover:shadow-lg
                                                    transition-all duration-300
                                                    relative overflow-hidden
                                                "
                                            >
                                                <span className="relative z-10">Create</span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
                <Modal
                    open={successModalOpen}
                    onClose={() => setSuccessModalOpen(false)}
                    aria-labelledby="success-modal-title"
                    aria-describedby="success-modal-description"
                >
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                            onClick={() => setSuccessModalOpen(false)}
                        />

                        {/* Modal Content */}
                        <div className="relative w-full max-w-sm bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl border border-green-200 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-500 to-emerald-600 py-6 px-6 text-center">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="3"
                                    >
                                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h2
                                    id="success-modal-title"
                                    className="text-xl font-bold text-white"
                                >
                                    Success!
                                </h2>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <p
                                    id="success-modal-description"
                                    className="text-gray-700 text-center mb-6 leading-relaxed"
                                >
                                    {successMessage}
                                </p>

                                <button
                                    onClick={() => setSuccessModalOpen(false)}
                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-green-600 hover:to-emerald-700 active:translate-y-0"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <aside className="flex flex-col gap-5 self-start order-1 lg:order-2 ">
                    <div className="flex flex-col gap-5 rounded-xl bg-white p-5 flex-1 shadow-lg">
                        <div className=" items-center pb-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold">Order summary</h3>
                            <p className="text-sm text-slate-500 mt-1">Review your order before checkout</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Provisional estimate ({resCart?.data.attributes.item_count} item{Number(resCart?.data.attributes.item_count) > 1 ? 's' : ''})</span>
                                <span className="font-medium">{resCart?.data.attributes.display_pre_tax_item_amount ?? "$0"}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax</span>
                                <span className="font-medium">{resCart?.data.attributes.display_tax_total ?? "$0"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping fee</span>
                                <span className="font-medium">{resCart?.data.attributes.display_ship_total ?? "$0"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Discount</span>
                                <span className="font-medium">{resCart?.data.attributes.display_promo_total ?? "$0"}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200 ">
                                <span>Total</span>
                                <span id="total-cost">{resCart?.data.attributes.display_total ?? "$0"}</span>
                            </div>
                            {errorValidate &&
                                <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                    <MdOutlineErrorOutline className="mx-auto" size={21} />{errorValidate}</div>
                            }
                            <button
                                onClick={() => {
                                    handleValidateOrderPayment("line_items")
                                }}
                                className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                            >
                                Checkout
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        </div>
                        <div className="flex flex-wrap md:grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div className="flex flex-col justify-center items-center gap-2 ">
                                <FaShippingFast className='text-green-500' />
                                <span className='text-sm'>Free shipping</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <FaUndo className='text-green-500' />
                                <span className='text-sm'>Easy returns</span>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <FaShieldAlt className='text-green-500' />
                                <span className='text-sm'>Secure payment</span>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/all-product')}
                            className="flex items-center justify-center gap-2 group transition-all duration-300 text-green-500 hover:text-green-700"
                        >
                            <span className="inline-flex items-center justify-center w-9 h-9 bg-white rounded-full shadow group-hover:shadow-lg transition-all">
                                <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                            </span>
                            Continue shopping</button>
                    </div>
                </aside>
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default ViewCart