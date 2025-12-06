import { IncludedImage, IncludedVariant, IncludedTaxon, IncludedOptionType, IncludedProductProperty } from '@/interface/interface';
import { ResProduct_Retrieve } from '@/interface/responseData/interfaceStorefront';
import { WishedItem, WishlistCreate } from '@/interface/sendData/interfaceStorefront';
import { RetrieveACart } from '@/service/storefront/cart';
import { AddAnItemToCart } from '@/service/storefront/cartLineItems';
import { CreateAWishlist, ListAllWishlists } from '@/service/storefront/wishlists';
import { AddItemToWishlist } from '@/service/storefront/wishlistsWishedItems';
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResCart, useState_ResWishlists } from '@/useState/useStatestorefront';
import { Dialog, DialogContent, Modal, TextField } from '@mui/material';
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaArrowLeft, FaCheck, FaHeart, FaRegCheckCircle, FaRegHeart, FaShieldAlt, FaShippingFast, FaShoppingCart, FaUndo } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { PiBarcodeBold } from 'react-icons/pi';
import { TbTag } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from './contexts/AuthContext';

interface SelectedOptions {
    [key: string]: string;
}

const ProductDetailCompoment: React.FC<ResProduct_Retrieve> = ({ data, included }) => {
    const router = useRouter();

    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "var(--radius-xl)",
            background: "var(--color-white)",
            height: '44px',
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

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
    const [quantity, setQuantity] = useState(1);

    const variants = useMemo(() =>
        included.filter(item => item.type === 'variant') as IncludedVariant[],
        [included]
    );

    const images = useMemo(() =>
        included.filter(item => item.type === 'image') as IncludedImage[],
        [included]
    );

    const optionTypes = useMemo(() =>
        included.filter(item => item.type === 'option_type') as IncludedOptionType[],
        [included]
    );

    const productProperties = useMemo(() =>
        included.filter(item => item.type === 'product_property') as IncludedProductProperty[],
        [included]
    );

    // Get available options from variants
    const availableOptions = useMemo(() => {
        const options: { [key: string]: Set<string> } = {};

        variants.forEach(variant => {
            variant.attributes.options.forEach(option => {
                if (!options[option.name]) {
                    options[option.name] = new Set();
                }
                options[option.name].add(option.value);
            });
        });

        return options;
    }, [variants]);

    // Find selected variant based on selected options
    const selectedVariant = useMemo(() => {
        return variants.find(variant =>
            variant.attributes.options.every(option =>
                selectedOptions[option.name] === option.value
            )
        );
    }, [variants, selectedOptions]);

    // Initialize selected options
    useEffect(() => {
        if (optionTypes.length > 0 && Object.keys(selectedOptions).length === 0) {
            const initialOptions: SelectedOptions = {};
            optionTypes.forEach(optionType => {
                const optionName = optionType.attributes.name;
                const firstOption = Array.from(availableOptions[optionName] || [])[0];
                if (firstOption) {
                    initialOptions[optionName] = firstOption;
                }
            });
            setSelectedOptions(initialOptions);
        }
    }, [optionTypes, availableOptions]);

    // Get images for selected variant or all product images
    const displayImages = useMemo(() => {
        if (selectedVariant && selectedVariant.relationships.images.data.length > 0) {
            const variantImageIds = selectedVariant.relationships.images.data.map(img => img.id);
            return images.filter(img => variantImageIds.includes(img.id));
        }
        return images;
    }, [selectedVariant, images]);

    const handleOptionChange = (optionName: string, optionValue: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [optionName]: optionValue
        }));
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const {
        setLoading } = useStateGeneral()

    const addItemToCart = async (variant_id: string, quantity: number) => {
        const data = {
            variant_id: variant_id,
            quantity: quantity,
            public_metadata: {
                first_item_order: true
            },
            private_metadata: {
                recommended_by_us: false
            }
        }

        try {
            setLoading(true)
            const response = await AddAnItemToCart(data);
            console.log("Cart created:", response.data);

            return response.data; // trả về dữ liệu nếu cần
        } catch (error: any) {
            toast.error(`Creating item cart: ` + error.response.data.error)
            throw error;
        }
        finally {
            setLoading(false);
            getApiRetrieveCart("line_items")
        }
    }

    const handleAddToCart = () => {
        if (selectedVariant) {
            // Implement add to cart logic here
            console.log('Adding to cart:', {
                variant: selectedVariant.id,
                quantity,
                options: selectedOptions
            });
            addItemToCart(selectedVariant.id, quantity)
        }
    }

    const { setResCart } = useState_ResCart()

    const getApiRetrieveCart = async (include: string) => {
        try {
            setLoading(true)
            const response = await RetrieveACart({ include });
            const cartNumber = response.data.data?.relationships.line_items.data
            localStorage.setItem("cart_number", cartNumber.length);

            setResCart(response.data)
        } catch (error: any) {
            toast.error(`Retrieve cart: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
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

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            getApiListWishlist("wished_items")
        }
    }, [isAuthenticated])

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false,
            mirror: true,
        });
    }, [])

    const [modalOpenSelectWishlist, setModalOpenSelectWishlist] = useState<boolean>(false)

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
            openSuccessModal("Add item Wish lists : " + (error.response?.data?.error || error.message));
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const handleSaveForLater = () => {
        if (isAuthenticated) {
            setModalOpenSelectWishlist(true)
        } else {
            router.push('/login')
        }
    }

    const handleSelectWishlist = (token: string) => {
        if (selectedVariant) {
            postApiAddItemToWishlist(
                selectedVariant.id,
                quantity,
                token
            );
        }
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

    const mainImage = displayImages[selectedImageIndex];

    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    const taxons = useMemo(() =>
        included.filter(item => item.type === 'taxon') as IncludedTaxon[],
        [included]
    );

    const longestPrettyName = taxons.reduce((longest, current) => {
        const currentPrettyName = current.attributes?.pretty_name ?? "";
        return currentPrettyName.length > longest.length ? currentPrettyName : longest;
    }, "");

    const [disableSize, setDisableSize] = useState<boolean | undefined>(false)

    return (
        <>
            {/* Header Navigation */}
            <div className="flex items-center gap-3 px-5 max-w-[1535px] mx-auto py-5 lg:text-lg md:text-md text-sm">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 group transition-all duration-300"
                >
                    <span className="inline-flex items-center justify-center md:w-9 md:h-9 h-6 w-6 bg-white rounded-full shadow hover:shadow-lg transition-all">
                        <FaArrowLeft className="text-green-600 group-hover:-translate-x-1 transition-transform duration-300" />
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                        {taxons && taxons.length > 0 && (
                            <span>{longestPrettyName.replace(/\s*->\s*/g, " / ")}</span>
                        )}
                    </span>
                </button>
            </div>

            {/* Product Section */}
            <div className="max-w-[1535px] mx-auto grid grid-cols-1 lg:grid-cols-[2fr_3fr] md:gap-10 gap-5 px-5 py-5">

                {/* Left: Images */}
                <div className="flex max-lg:flex-col gap-4"
                    data-aos-duration="1200"
                    data-aos="zoom-in"
                >
                    <div className="flex flex-col gap-3 order-2 lg:order-1">
                        {displayImages.map((image, index) => (
                            <button
                                key={image.id}
                                className={` flex-shrink-0 w-20 h-20 rounded-xl overflow-x-auto scroll-x border-2 transition-all duration-300 ${index === selectedImageIndex
                                    ? "border-green-500 ring-2 ring-green-200"
                                    : "border-gray-200 hover:border-green-300"
                                    }`}
                                onClick={() => setSelectedImageIndex(index)}
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={image.attributes.styles[2]?.url || image.attributes.original_url}
                                        alt={`${data?.attributes.name} ${index + 1}`}
                                        className="w-full h-full object-cover aspect-[1/1]"
                                    />
                                    {index === selectedImageIndex && (
                                        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                                            <FaCheck className="text-white text-sm" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                    <div
                        className="order-1 lg:order-2 aspect-square rounded-xl overflow-hidden relative group shadow-lg"
                        rounded-xl="fade-up"
                    >
                        {mainImage && (
                            <img
                                src={mainImage.attributes.original_url}
                                alt={data?.attributes.name ?? ""}
                                className="w-full h-full aspect-[1/1] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col gap-5"
                    data-aos-duration="1200"
                    data-aos="fade-left"
                >
                    <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-gray-900 leading-tight" >
                        {data?.attributes.name}
                    </h1>

                    {/* Price + Discount */}
                    {data && data.attributes && (
                        <div className="flex items-center gap-4" >

                            {priceInfo(data.attributes.price, data.attributes.compare_at_price) > 0 ?
                                <>
                                    <div className="flex items-end gap-2">
                                        <span className="md:text-5xl sm:text-4xl text-3xl font-bold text-green-700">
                                            ${data.attributes.price}
                                        </span>
                                        <span className="md:text-xl sm:text-lg text-md text-gray-400 line-through mb-1">
                                            ${data.attributes.compare_at_price}
                                        </span>
                                    </div>
                                    <span className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                                        -{priceInfo(data.attributes.price, data.attributes.compare_at_price)}% OFF
                                    </span>
                                </>
                                :
                                <span className="md:text-5xl sm:text-4xl text-3xl font-bold text-green-700">
                                    ${data.attributes.price}
                                </span>
                            }
                        </div>
                    )}

                    {/* Options */}
                    <div className="flex flex-col gap-5" rounded-xl="fade-left" rounded-xl-delay="200">
                        {optionTypes.map(optionType => (
                            <div key={optionType.id} className='flex flex-col gap-3'>
                                <label className="text-md font-semibold text-gray-700 tracking-wide">
                                    {optionType.attributes.presentation}
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {Array.from(availableOptions[optionType.attributes.name] || []).map(optionValue => {
                                        const option = variants
                                            .flatMap(v => v.attributes.options)
                                            .find(o => o.name === optionType.attributes.name && o.value === optionValue);
                                        const isSelected = selectedOptions[optionType.attributes.name] === optionValue;
                                        const optionName = optionType.attributes.name.toLowerCase();

                                        if (optionName === "color" || optionName === "màu sắc") {
                                            return (
                                                <button
                                                    key={optionValue}
                                                    onClick={() => handleOptionChange(optionType.attributes.name, optionValue)}
                                                    title={optionValue}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-300 ${isSelected ? "scale-110" : "border-gray-300 hover:scale-105"
                                                        }`}
                                                    style={{ backgroundColor: option?.presentation === 'Cream' ? "lightyellow" : (option?.presentation || optionValue) }}
                                                >
                                                    {isSelected &&
                                                        <svg className="w-4 h-4 text-white mix-blend-difference" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    }
                                                </button>
                                            );
                                        }

                                        return (
                                            <button
                                                key={optionValue}
                                                onClick={() => {
                                                    handleOptionChange(optionType.attributes.name, optionValue)
                                                }}
                                                className={`px-4 py-2 rounded-lg border-[1px] text-sm  transition-all duration-300 ${isSelected
                                                    ? "text-green-600 border-green-600 shadow-lg font-bold"
                                                    : "bg-white border-gray-300 text-gray-800 hover:border-green-300 font-medium"
                                                    } 
                                                         `}
                                            >
                                                {option?.presentation || optionValue}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {(data && data.attributes) &&
                        <div className="flex flex-wrap gap-4">

                            <div className="flex items-center gap-2 ">
                                <PiBarcodeBold className='text-green-500' />
                                <span className='flex items-center text-sm gap-1'>SKU: <strong>{data.attributes.sku}</strong></span>
                            </div>

                            {productProperties.length > 0 &&
                                <div className="flex items-center gap-2 ">
                                    <TbTag className='text-green-500' />
                                    <span className='flex items-center gap-1 text-xs'>Material:
                                        <strong>
                                            {productProperties.map(property => (
                                                <div key={property.id} className="flex justify-between py-2 border-b last:border-0 border-gray-200">
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {property.attributes.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </strong>
                                    </span>
                                </div>
                            }

                            {selectedVariant?.attributes.in_stock ? (
                                <span className="text-success flex gap-2 font-semibold items-center">
                                    <FaRegCheckCircle className='text-green-700' />
                                    <span className="inline-block text-xs font-semibold text-green-700">
                                        In Stock
                                    </span>
                                </span>
                            ) : (
                                <span className="text-success flex gap-2 font-semibold items-center">
                                    <AiOutlineExclamationCircle className='text-red-700' />
                                    <span className="inline-block text-xs font-semibold text-red-700 ">
                                        Out of Stock
                                    </span>
                                </span>
                            )}
                        </div>
                    }

                    {/* Quantity & Add to Cart */}
                    <div className="flex items-center gap-4 flex-wrap" >
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <button
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1 && !selectedVariant?.attributes.in_stock}
                            >
                                −
                            </button>
                            <span className={` ${!selectedVariant?.attributes.in_stock ? "text-gray-300 disabled:cursor-not-allowed" : ""} px-5 py-2 bg-white text-center font-semibold `}>{quantity}</span>
                            <button
                                disabled={!selectedVariant?.attributes.in_stock}
                                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                                onClick={() => handleQuantityChange(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className='flex gap-4 items-center'>
                        {/* Add to Cart Button - Enhanced */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!selectedVariant?.attributes.in_stock}
                            className={`h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white w-fit font-bold text-lg transition-all duration-300 transform  shadow-lg relative overflow-hidden group 
                                ${!selectedVariant?.attributes.in_stock
                                    ? 'opacity-60 cursor-not-allowed'
                                    : 'hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105'}`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {selectedVariant?.attributes.in_stock ? (
                                    <>
                                        <FaShoppingCart className="text-lg" />
                                        Add to Cart
                                    </>
                                ) : (
                                    "Out of Stock"
                                )}
                            </span>

                            {/* Ripple Effect */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>

                            {/* Pulse Animation for In Stock Items */}
                            {selectedVariant?.attributes.in_stock && (
                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            )}
                        </button>

                        {/* Heart Button - Enhanced */}
                        <button
                            onClick={handleSaveForLater}
                            disabled={!selectedVariant?.attributes.in_stock}
                            aria-label="Add to Wishlist"
                            className={`group w-[50px] h-[45px] bg-white border-2 border-gray-300 rounded-xl hover:border-orange-400 transition-all duration-300
                            ${!selectedVariant?.attributes.in_stock ? '' : 'hover:scale-110'}
                             shadow-md relative overflow-hidden`}
                        >
                            <FaRegHeart className={` text-xl ${selectedVariant?.attributes.in_stock && 'group-hover:text-orange-500 group-hover:scale-110 text-gray-600'} absolute inset-0 m-auto transition-all duration-300 `} />
                            {selectedVariant?.attributes.in_stock && <FaHeart className="text-orange-500 text-xl absolute inset-0 m-auto scale-0 group-hover:scale-110 transition-all duration-300" />}

                            {/* Sparkle Effect */}
                            <div className="absolute inset-0 overflow-hidden rounded-xl">
                                <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-1"></div>
                                <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-2"></div>
                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-sparkle-3"></div>
                            </div>
                        </button>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                        {data && <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.attributes.description }} />}
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 ">
                            <FaShippingFast className='text-green-500' />
                            <span className='text-sm'>Free shipping on orders over $50</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUndo className='text-green-500' />
                            <span className='text-sm'>30-day return policy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaShieldAlt className='text-green-500' />
                            <span className='text-sm'>2-year warranty</span>
                        </div>
                    </div>
                </div>
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
                                <h1 className="md:text-2xl text-xl font-extrabold text-center bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text mb-2">
                                    List Wishlist
                                </h1>

                                <p className="text-gray-500 text-sm text-center mb-6">
                                    Your favorite items are listed here.
                                </p>
                                <div className="flex flex-col gap-3">
                                    {resWishlists_List?.data &&
                                        <>
                                            {resWishlists_List.data.map((res) => (
                                                <button
                                                    onClick={() => handleSelectWishlist(res.attributes.token)}
                                                    key={res.id}
                                                    className="h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group" >
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
                                             px-5 h-[45px]
                                              transition-all duration-300 transform hover:scale-105
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
                                <h1 className="md:text-2xl text-xl font-extrabold text-center bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text mb-2">
                                    Create An Wishlist
                                </h1>

                                <p className="text-gray-500 text-center mb-6 text-sm">
                                    Give your wishlist a unique name
                                </p>

                                {errorCreateWishlist && (
                                    <div className="mb-6 p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                        <MdOutlineErrorOutline className="mx-auto" size={21} />
                                        <span>{errorCreateWishlist}</span>
                                    </div>
                                )}

                                <form onSubmit={handleCreateWishlist} className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
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

                                    <div className="grid grid-cols-2 gap-3 pt-2">
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
                                            className="h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                        >
                                            <span className="relative z-10">Create</span>
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
            <ToastContainer position="top-right" autoClose={3000} />

        </>
    )
}

export default ProductDetailCompoment