'use client';
import React from 'react';
import { ProductRecommendation } from '@/interface/chat';
import { FaLink, FaShoppingBag } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    product: ProductRecommendation;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const router = useRouter()

    const priceInfo = (price: string, comparePrice: string | null) => {
        return comparePrice && comparePrice > price
            ? Math.round(((parseFloat(comparePrice) - parseFloat(price)) / parseFloat(comparePrice)) * 100)
            : 0;
    }

    return (
        <div className="bg-white flex rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow duration-300">
            {product.image_url ? (
                <div className="min-w-[100px] max-w-[120px] bg-green-50 overflow-hidden relative">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    {(product?.compare_at_price && priceInfo(product?.price, product?.compare_at_price) > 0) &&
                        <span className="absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-sm">
                            -{priceInfo(product?.price, product?.compare_at_price)}%
                        </span>
                    }
                </div>
            ) : (
                <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                    <FaShoppingBag className="w-12 h-12 text-green-300" />
                </div>
            )}

            <div className="p-4 w-full ">
                <div className="flex items-start justify-between w-full mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 flex-1">
                        {product.name}
                    </h3>
                </div>

                {/* <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </p> */}

                <div className="flex max-sm:flex-col gap-1 sm:items-center sm:justify-between ">
                    <span className="font-bold text-green-600 text-sm">
                        {product.price}
                        {Number(product?.compare_at_price) > 0 && (
                            <span className="text-gray-400 line-through text-[10px]">
                                ${product?.compare_at_price}
                            </span>
                        )}
                    </span>

                    <button
                        onClick={() => router.push(`${product.product_url}`)}
                        className="inline-flex items-center px-3 py-1.5 w-fit rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold text-sm relative transition-all duration-300 transform  shadow-lg hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105  group"
                    >
                        <FaLink className="w-3 h-3 mr-1.5" />
                        See now
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                        <div className="absolute inset-0 rounded-lg border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;