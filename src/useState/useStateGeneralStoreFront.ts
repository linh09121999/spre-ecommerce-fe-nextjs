import { create } from 'zustand'
import { FilterProduct, FilterProductColor, Pages } from '@/interface/interface'

// import { JSX } from 'react';

interface State {
    pages: Pages[];
    isDashboard: boolean;
    setIsDashboard: (isCheck: boolean) => void;
    selectNav: number | null;
    setSelectNav: (select: number | null) => void;
    loading: boolean;
    setLoading: (isCheck: boolean) => void;
    yourMail: string;
    setYourMail: (mail: string) => void;
    ordersNumber: number;
    setOrdersNumber: (order: number) => void;
    heartNumber: number;
    setHeartNumber: (order: number) => void;
    isSearch: boolean;
    setIsSearch: (isCheck: boolean) => void;
    isCurrency: string;
    setIsCurrency: (isCheck: string) => void;
    hoveredNav: number | null;
    setHoveredNav: (hover: number | null) => void;
    prePage: number;
    loadingReadMore: boolean;
    setLoadingReadMore: (isCheck: boolean) => void;
    totalDatas: number;
    setTotalDatas: (total: number) => void;
    totalPages: number;
    setTotalPages: (total: number) => void;
    currentPage: number;
    setCurrentPage: (current: number) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    sortOption: string;
    setSortOption: (sort: string) => void;
    filterTaxonsAllProduct: FilterProduct[];
    filterCollectonsAllProduct: FilterProduct[];
    filterAvailabity: FilterProduct[];
    filterTaxonsFashion: FilterProduct[];

    filterSize: FilterProduct[];
    checkedSize: number[];
    setCheckedSize: React.Dispatch<React.SetStateAction<number[]>>;

    filterColor: FilterProduct[];
    checkedColor: number[];
    setCheckedColor: React.Dispatch<React.SetStateAction<number[]>>;

    selectTab: number;
    setSelectTab: (tab: number) => void;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>

    valueNameShippingFee: string;
    setValueNameShippingFee: (value: string) => void;

    valuePriceShippingFee: string;
    setValuePriceShippingFee: (value: string) => void;

    valueShippingFee: string;
    setValueShippingFee: (value: string) => void;
}

export const useStateGeneral = create<State>((set) => ({
    pages: [
        {
            id: 0,
            title: 'All Shop',
            path: "/all-product"
        },
        {
            id: 1,
            title: 'Fashion',
            path: "/fashion"
        },
        {
            id: 2,
            title: 'Wellness',
            path: "/wellness"
        },
        {
            id: 3,
            title: 'New Arrivals',
            path: "/new-arrivals"
        },
        {
            id: 4,
            title: 'Sale',
            path: "/sale"
        }
    ],
    isDashboard: false,
    setIsDashboard: (isCheck) => set({ isDashboard: isCheck }),
    selectNav: null,
    setSelectNav: (select) => set({ selectNav: select }),
    loading: true,
    setLoading: (isCheck) => set({ loading: isCheck }),
    yourMail: '',
    setYourMail: (mail) => set({ yourMail: mail }),
    ordersNumber: 0,
    setOrdersNumber: (order) => set({ ordersNumber: order }),
    heartNumber: 0,
    setHeartNumber: (heart) => set({ heartNumber: heart }),
    isSearch: false,
    setIsSearch: (isCheck) => set({ isSearch: isCheck }),
    isCurrency: 'USD',
    setIsCurrency: (isCheck) => set({ isCurrency: isCheck }),
    hoveredNav: null,
    setHoveredNav: (hover) => set({ hoveredNav: hover }),
    prePage: 10,
    loadingReadMore: false,
    setLoadingReadMore: (isCheck) => set({ loadingReadMore: isCheck }),
    currentPage: 0,
    setCurrentPage: (current) => set({ currentPage: current }),
    totalDatas: 0,
    setTotalDatas: (total) => set({ totalDatas: total }),
    totalPages: 0,
    setTotalPages: (total) => set({ totalPages: total }),

    sortBy: "Relevance",
    setSortBy: (sort) => set({ sortBy: sort }),

    sortOption: "relevance",
    setSortOption: (sort) => set({ sortOption: sort }),
    filterTaxonsAllProduct: [
        { id: 176, title: "Men" },
        { id: 180, title: "Women" },
        { id: 179, title: "Accessories" },
        { id: 187, title: "Fitness" },
        { id: 190, title: "Relaxation" },
        { id: 191, title: "Mental Stimulation" },
        { id: 193, title: "Nutrition" }
    ],
    filterCollectonsAllProduct: [
        { id: 173, title: "On sale" },
        { id: 174, title: "New arrivals" }
    ],
    filterAvailabity: [
        { id: 0, title: "In stock" },
        { id: 1, title: "Out of stock" }
    ],
    filterTaxonsFashion: [
        { id: 176, title: "Men" },
        { id: 180, title: "Women" },
        { id: 179, title: "Accessories" }
    ],

    filterSize: [
        { id: 0, title: "S" },
        { id: 1, title: "M" },
        { id: 2, title: "L" },
        { id: 3, title: "XL" },
        { id: 4, title: "Small" },
        { id: 5, title: "Medium" },
        { id: 6, title: "Large" }
    ],
    checkedSize: [],
    setCheckedSize: (value) =>
        set((state) => ({
            checkedSize:
                typeof value === "function"
                    ? (value as (prev: number[]) => number[])(state.checkedSize)
                    : value,
        })),

    filterColor: [
        { id: 0, title: "Olive" },
        { id: 1, title: "Black" },
        { id: 2, title: "White" },
        { id: 3, title: "Red" },
        { id: 4, title: "Green" },
        { id: 5, title: "Blue" },
        { id: 6, title: "Yellow" },
        { id: 7, title: "Orange" },
        { id: 8, title: "Purple" },
        { id: 9, title: "Pink" },
        { id: 10, title: "Brown" },
        { id: 11, title: "Beige" },
        { id: 12, title: "Gold" },
        { id: 13, title: "Grey" },
        { id: 14, title: "Light Blue" },
        { id: 15, title: "Cream" },
        { id: 16, title: "Turquoise" },
        { id: 17, title: "Teal" },
    ],

    checkedColor: [],
    setCheckedColor: (value) =>
        set((state) => ({
            checkedColor:
                typeof value === "function"
                    ? (value as (prev: number[]) => number[])(state.checkedColor)
                    : value,
        })),

    selectTab: 0,
    setSelectTab: (tab) => set({ selectTab: tab }),

    activeStep: 1,
    setActiveStep: (value) =>
        set((state) => ({
            activeStep:
                typeof value === "function"
                    ? (value as (prev: number) => number)(state.activeStep)
                    : value
        })),

    valueNameShippingFee: "",
    setValueNameShippingFee: (value) => set({ valueNameShippingFee: value }),

    valuePriceShippingFee: "",
    setValuePriceShippingFee: (value) => set({ valuePriceShippingFee: value }),

    valueShippingFee: "Free",
    setValueShippingFee: (value) => set({ valueShippingFee: value })
}))