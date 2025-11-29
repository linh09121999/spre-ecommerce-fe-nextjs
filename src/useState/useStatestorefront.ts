import { create } from 'zustand'
import {
    ResAccount,
    ResAccountAddress_ListAll,
    ResAccountAddress,
    ResAccountCreditCard_ListAll,
    ResAccountCreditCard_Retrieve,
    ResAccountOrder_ListAll,
    ResAccountOrder_Retrieve,
    ResAdyen, ResCart,
    ResCartOther_List,
    ResCheckoutShipments, ResCountries_ListAll,
    ResCountries_Retrieve, ResCountryDefault,
    ResOrderStatus, ResPolicies_ListAll,
    ResPolicies_Retrieve, ResPostCategories_ListAll,
    ResPostCategories_Retrieve, ResPosts_ListAll,
    ResPosts_Retrieve, ResProduct_ListAll, ResProduct_Retrieve,
    ResStore, ResStripe, ResStripe_CreateSetupIntent,
    ResTaxons_ListAll, ResTaxons_Retrieve,
    ResVendors_ListAll, ResVendors_Retrieve, ResWishlists,
    ResWishlistsWishedItems, ResWishlists_ListAll,
    ResCartOther,
    ResCheckoutPayments_ListAll,
    ResCheckoutPayments,
    Product,
    ResCheckout,
    AccountAddress,
    ResVariant,
    Variant
} from '@/interface/responseData/interfaceStorefront'
import { IncludedImage, IncludedItem } from '@/interface/interface';
import React from 'react';

// Account
interface State_ResAccount {
    resAccount: ResAccount | undefined;
    setResAccount: (data: ResAccount | undefined) => void;
}

export const useState_ResAccount = create<State_ResAccount>((set) => ({
    resAccount: undefined,
    setResAccount: (data) => set({ resAccount: data })
}))

// Account / Address
interface State_ResAccountAddress {
    resAccountAddress_All: ResAccountAddress_ListAll | undefined;
    setResAccountAddress_All: (data: ResAccountAddress_ListAll | undefined) => void;

    resDataAccountAddress_All: AccountAddress[]
    setResDataAccountAddress_All: React.Dispatch<React.SetStateAction<AccountAddress[]>>

    resAccountAddress: ResAccountAddress | undefined;
    setResAccountAddress: (data: ResAccountAddress | undefined) => void;
}

export const useState_ResAccountAddress = create<State_ResAccountAddress>((set) => ({
    resAccountAddress_All: undefined,
    setResAccountAddress_All: (data) => set({ resAccountAddress_All: data }),

    resDataAccountAddress_All: [],
    setResDataAccountAddress_All: (value) =>
        set((state) => ({
            resDataAccountAddress_All:
                typeof value === "function" ? value(state.resDataAccountAddress_All) : value,
        })),

    resAccountAddress: undefined,
    setResAccountAddress: (data) => set({ resAccountAddress: data })
}))

// Account / Credit Cards
interface State_ResAccountCreditCard {
    resAccountCreditCard_All: ResAccountCreditCard_ListAll | undefined;
    setResAccountCreditCard_All: (data: ResAccountCreditCard_ListAll | undefined) => void;
    resAccountCreditCard_Retrieve: ResAccountCreditCard_Retrieve | undefined;
    setResAccountCreditCard_Retrieve: (data: ResAccountCreditCard_Retrieve | undefined) => void;
}

export const useState_ResAccountCreditCard = create<State_ResAccountCreditCard>((set) => ({
    resAccountCreditCard_All: undefined,
    setResAccountCreditCard_All: (data) => set({ resAccountCreditCard_All: data }),
    resAccountCreditCard_Retrieve: undefined,
    setResAccountCreditCard_Retrieve: (data) => set({ resAccountCreditCard_Retrieve: data })
}))

// Account / Orders
interface State_ResAccountOrder {
    resAccountOrder_All: ResAccountOrder_ListAll | undefined;
    setResAccountOrder_All: (data: ResAccountOrder_ListAll | undefined) => void;
    resAccountOrder_Retrieve: ResAccountOrder_Retrieve | undefined;
    setResAccountOrder_Retrieve: (data: ResAccountOrder_Retrieve | undefined) => void;
}

export const useState_ResAccountOrder = create<State_ResAccountOrder>((set) => ({
    resAccountOrder_All: undefined,
    setResAccountOrder_All: (data) => set({ resAccountOrder_All: data }),
    resAccountOrder_Retrieve: undefined,
    setResAccountOrder_Retrieve: (data) => set({ resAccountOrder_Retrieve: data })
}))

// Order Status
interface State_ResOrderStatus {
    resOrderStatus: ResOrderStatus | undefined;
    setResOrderStatus: (data: ResOrderStatus | undefined) => void;
}

export const useState_ResOrderStatus = create<State_ResOrderStatus>((set) => ({
    resOrderStatus: undefined,
    setResOrderStatus: (data) => set({ resOrderStatus: data })
}))

// Cart
interface State_ResCart {
    resCart: ResCart | undefined;
    setResCart: (data: ResCart | undefined) => void;
}

export const useState_ResCart = create<State_ResCart>((set) => ({
    resCart: undefined,
    setResCart: (data) => set({ resCart: data })
}))

// Cart / Other
interface State_ResCartOther {
    resCartOther_List: ResCartOther_List | undefined;
    setResCartOther_List: (data: ResCartOther_List | undefined) => void;
    resCartOther: ResCartOther | undefined;
    setResCartOther: (data: ResCartOther | undefined) => void;
}

export const useState_ResCartOther = create<State_ResCartOther>((set) => ({
    resCartOther_List: undefined,
    setResCartOther_List: (data) => set({ resCartOther_List: data }),
    resCartOther: undefined,
    setResCartOther: (data) => set({ resCartOther: data })
}))

interface State_ResCheckout {
    resCheckout: ResCheckout | undefined;
    setResCheckout: (data: ResCheckout | undefined) => void;
}

export const useState_ResCheckout = create<State_ResCheckout>((set) => ({
    resCheckout: undefined,
    setResCheckout: (data) => set({ resCheckout: data }),
}))

// Checkout / Shipments
interface State_ResCheckoutShipments {
    resCheckoutShipments: ResCheckoutShipments;
    setResCheckoutShipments: (data: ResCheckoutShipments) => void;
}

export const useState_ResCheckoutShipments = create<State_ResCheckoutShipments>((set) => ({
    resCheckoutShipments: {
        data: [],
        included: []
    },
    setResCheckoutShipments: (data) => set({ resCheckoutShipments: data })
}))

// Checkout / Payments
interface State_ResCheckoutPayments {
    resCheckoutPayments_List: ResCheckoutPayments_ListAll | undefined;
    setResCheckoutPayments_List: (data: ResCheckoutPayments_ListAll | undefined) => void;
    resCheckoutPayments: ResCheckoutPayments | undefined;
    setResCheckoutPayments: (data: ResCheckoutPayments | undefined) => void;
}

export const useState_ResCheckoutPayments = create<State_ResCheckoutPayments>((set) => ({
    resCheckoutPayments_List: {
        data: []
    },
    setResCheckoutPayments_List: (data) => set({ resCheckoutPayments_List: data }),
    resCheckoutPayments: undefined,
    setResCheckoutPayments: (data) => set({ resCheckoutPayments: data })
}))

// Stripe
interface State_ResStripe {
    resStripe: ResStripe | undefined;
    setResStripe: (data: ResStripe | undefined) => void;
    resStripe_CreateSetupIntent: ResStripe_CreateSetupIntent | undefined;
    setResStripe_CreateSetupIntent: (data: ResStripe_CreateSetupIntent | undefined) => void;
}

export const useState_ResStripe = create<State_ResStripe>((set) => ({
    resStripe: undefined,
    setResStripe: (data) => set({ resStripe: data }),
    resStripe_CreateSetupIntent: undefined,
    setResStripe_CreateSetupIntent: (data) => set({ resStripe_CreateSetupIntent: data })
}))

// Adyen
interface State_ResAdyen {
    resAdyen: ResAdyen | undefined;
    setResAdyen: (data: ResAdyen | undefined) => void;
}

export const useState_ResAdyen = create<State_ResAdyen>((set) => ({
    resAdyen: undefined,
    setResAdyen: (data) => set({ resAdyen: data })
}))

// Products
interface State_ResProducts {
    resDataProducts_List: Product[]
    setResDataProduct_List: React.Dispatch<React.SetStateAction<Product[]>>
    resDataIcludes_List: IncludedItem[]
    setResDataIcludes_List: React.Dispatch<React.SetStateAction<IncludedItem[]>>

    resProduct_Retrieve: ResProduct_Retrieve | undefined;
    setResProduct_Retrieve: (data: ResProduct_Retrieve | undefined) => void;

    resDataProducts_SaleList: Product[]
    setResDataProduct_SaleList: React.Dispatch<React.SetStateAction<Product[]>>
    resDataIcludes_SaleList: IncludedItem[]
    setResDataIcludes_SaleList: React.Dispatch<React.SetStateAction<IncludedItem[]>>

    resDataProducts_NewList: Product[]
    setResDataProduct_NewList: React.Dispatch<React.SetStateAction<Product[]>>
    resDataIcludes_NewList: IncludedItem[]
    setResDataIcludes_NewList: React.Dispatch<React.SetStateAction<IncludedItem[]>>

    resDataProducts_Related: Product[];
    setResDataProducts_Related: React.Dispatch<React.SetStateAction<Product[]>>
    resDataIcludes_Related: IncludedItem[]
    setResDataIcludes_Related: React.Dispatch<React.SetStateAction<IncludedItem[]>>

    resProduct_Cart: ResProduct_Retrieve[]
    setResProduct_Cart: React.Dispatch<React.SetStateAction<ResProduct_Retrieve[]>>
}

export const useState_ResProducts = create<State_ResProducts>((set) => ({
    resDataProducts_List: [],
    setResDataProduct_List: (value) =>
        set((state) => ({
            resDataProducts_List:
                typeof value === "function" ? value(state.resDataProducts_List) : value,
        })),
    resDataIcludes_List: [],
    setResDataIcludes_List: (value) =>
        set((state) => ({
            resDataIcludes_List:
                typeof value === "function" ? value(state.resDataIcludes_List) : value,
        })),

    resProduct_Retrieve: undefined,
    setResProduct_Retrieve: (data) => set({ resProduct_Retrieve: data }),

    resDataProducts_SaleList: [],
    setResDataProduct_SaleList: (value) =>
        set((state) => ({
            resDataProducts_SaleList:
                typeof value === "function" ? value(state.resDataProducts_SaleList) : value,
        })),
    resDataIcludes_SaleList: [],
    setResDataIcludes_SaleList: (value) =>
        set((state) => ({
            resDataIcludes_SaleList:
                typeof value === "function" ? value(state.resDataIcludes_SaleList) : value,
        })),

    resDataProducts_NewList: [],
    setResDataProduct_NewList: (value) =>
        set((state) => ({
            resDataProducts_NewList:
                typeof value === "function" ? value(state.resDataProducts_NewList) : value,
        })),
    resDataIcludes_NewList: [],
    setResDataIcludes_NewList: (value) =>
        set((state) => ({
            resDataIcludes_NewList:
                typeof value === "function" ? value(state.resDataIcludes_NewList) : value,
        })),

    resDataProducts_Related: [],
    setResDataProducts_Related: (value) =>
        set((state) => ({
            resDataProducts_Related:
                typeof value === "function" ? value(state.resDataProducts_Related) : value,
        })),
    resDataIcludes_Related: [],
    setResDataIcludes_Related: (value) =>
        set((state) => ({
            resDataIcludes_Related:
                typeof value === "function" ? value(state.resDataIcludes_Related) : value,
        })),

    resProduct_Cart: [],
    setResProduct_Cart: (value) =>
        set((state) => ({
            resProduct_Cart:
                typeof value === "function" ? value(state.resProduct_Cart) : value,
        })),
}))

// Vendors
interface State_ResVendors {
    resVendors_List: ResVendors_ListAll | undefined;
    setResVendors_List: (data: ResVendors_ListAll | undefined) => void;
    resVendors_Retrieve: ResVendors_Retrieve | undefined;
    setResVendors_Retrieve: (data: ResVendors_Retrieve | undefined) => void;
}

export const useState_ResVendors = create<State_ResVendors>((set) => ({
    resVendors_List: undefined,
    setResVendors_List: (data) => set({ resVendors_List: data }),
    resVendors_Retrieve: undefined,
    setResVendors_Retrieve: (data) => set({ resVendors_Retrieve: data })
}))

// Stores
interface State_ResStores {
    resStores: ResStore | undefined;
    setResStores: (data: ResStore | undefined) => void;
}

export const useState_ResStores = create<State_ResStores>((set) => ({
    resStores: undefined,
    setResStores: (data) => set({ resStores: data }),
}))

// Policies
interface State_ResPolicies {
    resPolicies_List: ResPolicies_ListAll | undefined;
    setResPolicies_List: (data: ResPolicies_ListAll | undefined) => void;
    resPolicies_Retrieve: ResPolicies_Retrieve | undefined;
    setResPolicies_Retrieve: (data: ResPolicies_Retrieve | undefined) => void;
}

export const useState_ResPolicies = create<State_ResPolicies>((set) => ({
    resPolicies_List: undefined,
    setResPolicies_List: (data) => set({ resPolicies_List: data }),
    resPolicies_Retrieve: undefined,
    setResPolicies_Retrieve: (data) => set({ resPolicies_Retrieve: data })
}))

// posts
interface State_ResPosts {
    resPosts_List: ResPosts_ListAll | undefined;
    setResPosts_List: (data: ResPosts_ListAll | undefined) => void;
    resPosts_Retrieve: ResPosts_Retrieve | undefined;
    setResPosts_Retrieve: (data: ResPosts_Retrieve | undefined) => void;
}

export const useState_ResPosts = create<State_ResPosts>((set) => ({
    resPosts_List: undefined,
    setResPosts_List: (data) => set({ resPosts_List: data }),
    resPosts_Retrieve: undefined,
    setResPosts_Retrieve: (data) => set({ resPosts_Retrieve: data })
}))

// Post Categories
interface State_ResPostCategories {
    resPostCategories_List: ResPostCategories_ListAll | undefined;
    setResPostCategories_List: (data: ResPostCategories_ListAll | undefined) => void;
    resPostCategories_Retrieve: ResPostCategories_Retrieve | undefined;
    setResPostCategories_Retrieve: (data: ResPostCategories_Retrieve | undefined) => void;
}

export const useState_ResPostCategories = create<State_ResPostCategories>((set) => ({
    resPostCategories_List: undefined,
    setResPostCategories_List: (data) => set({ resPostCategories_List: data }),
    resPostCategories_Retrieve: undefined,
    setResPostCategories_Retrieve: (data) => set({ resPostCategories_Retrieve: data })
}))

// Taxons
interface State_ResTaxons {
    resTaxons_List: ResTaxons_ListAll | undefined;
    setResTaxons_List: (data: ResTaxons_ListAll | undefined) => void;
    resTaxons_Retrieve: ResTaxons_Retrieve | undefined;
    setResTaxons_Retrieve: (data: ResTaxons_Retrieve | undefined) => void;
}

export const useState_ResTaxons = create<State_ResTaxons>((set) => ({
    resTaxons_List: undefined,
    setResTaxons_List: (data) => set({ resTaxons_List: data }),
    resTaxons_Retrieve: undefined,
    setResTaxons_Retrieve: (data) => set({ resTaxons_Retrieve: data })
}))

// Countries
interface State_ResCountries {
    resCountries_List: ResCountries_ListAll | undefined;
    setResCountries_List: (data: ResCountries_ListAll | undefined) => void;
    resCountries_Retrieve: ResCountries_Retrieve | undefined;
    setResCountries_Retrieve: (data: ResCountries_Retrieve | undefined) => void;
    resCountryDefault: ResCountryDefault | undefined;
    setResCountryDefault: (data: ResCountryDefault | undefined) => void
}

export const useState_ResCountries = create<State_ResCountries>((set) => ({
    resCountries_List: undefined,
    setResCountries_List: (data) => set({ resCountries_List: data }),
    resCountries_Retrieve: undefined,
    setResCountries_Retrieve: (data) => set({ resCountries_Retrieve: data }),
    resCountryDefault: undefined,
    setResCountryDefault: (data) => set({ resCountryDefault: data }),
}))

// Wishlists
interface State_ResWishlists {
    resWishlists_List: ResWishlists_ListAll | undefined;
    setResWishlists_List: (data: ResWishlists_ListAll | undefined) => void;
    resWishlists: ResWishlists | undefined;
    setResWishlists: (data: ResWishlists | undefined) => void;
}

export const useState_ResWishlists = create<State_ResWishlists>((set) => ({
    resWishlists_List: undefined,
    setResWishlists_List: (data) => set({ resWishlists_List: data }),
    resWishlists: undefined,
    setResWishlists: (data) => set({ resWishlists: data })
}))

// Wishlists / Wished Items
interface State_ResWishlistsWishedItems {
    resWishlistsWishedItems: ResWishlistsWishedItems | undefined;
    setResWishlistsWishedItems: (data: ResWishlistsWishedItems | undefined) => void;
}

export const useState_ResWishlistsWishedItems = create<State_ResWishlistsWishedItems>((set) => ({
    resWishlistsWishedItems: undefined,
    setResWishlistsWishedItems: (data) => set({ resWishlistsWishedItems: data }),
}))

// variant
interface State_ResVariant {
    resVariant: ResVariant | undefined;
    setResVariant: (data: ResVariant | undefined) => void;

    resDataVariant_cart: Variant[]
    setResDataVariant_cart: React.Dispatch<React.SetStateAction<Variant[]>>

    resIncludeVariant_cart: IncludedImage[]
    setResIncludeVariant_cart: React.Dispatch<React.SetStateAction<IncludedImage[]>>
}

export const useState_ResVariant = create<State_ResVariant>((set) => ({
    resVariant: undefined,
    setResVariant: (data) => set({ resVariant: data }),

    resDataVariant_cart: [],
    setResDataVariant_cart: (value) =>
        set((state) => ({
            resDataVariant_cart:
                typeof value === "function" ? value(state.resDataVariant_cart) : value
        })),
    resIncludeVariant_cart: [],
    setResIncludeVariant_cart: (value) =>
        set((state) => ({
            resIncludeVariant_cart:
                typeof value === "function" ? value(state.resIncludeVariant_cart) : value
        })),
}))