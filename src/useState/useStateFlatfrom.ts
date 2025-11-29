import { create } from 'zustand'

import {
    ResAddress,
    ResAddress_ListAll, ResAdjustments,
    ResAdjustments_ListAll, ResClassifications,
    ResClassifications_ListAll, ResCountries,
    ResCountries_ListAll, ResDataFeeds, ResDataFeeds_ListAll,
    ResDigitalLinks, ResDigitalLinks_ListAll, ResDigitalsAssets,
    ResDigitalsAssets_ListAll, ResLineItems, ResLineItems_ListAll,
    ResOptionTypes, ResOptionTypes_ListAll, ResOptionValues,
    ResOptionValues_ListAll, ResOrders, ResOrders_ListAll,
    ResPaymentMethods, ResPaymentMethods_ListAll, ResPayments,
    ResPayments_ListAll, ResProducts, ResProducts_ListAll,
    ResPromotionActions, ResPromotionActions_ListAll,
    ResPromotionCategories, ResPromotionCategories_ListAll,
    ResPromotionRules, ResPromotionRules_ListAll, ResPromotions,
    ResPromotions_ListAll, ResRoles, ResRoles_ListAll,
    ResShipment, ResShipment_ListAll, ResShippingCategories, ResShippingCategories_ListAll,
    ResShippingMethods, ResShippingMethods_ListAll, ResStates,
    ResStates_ListAll, ResStockItems, ResStockItems_ListAll,
    ResStockLocations, ResStockLocations_ListAll, ResStoreCreditCategories,
    ResStoreCreditCategories_ListAll, ResStoreCreditTypes, ResStoreCreditTypes_ListAll,
    ResStoreCredits, ResStoreCredits_ListAll, ResTaxCategories,
    ResTaxCategories_ListAll, ResTaxRates, ResTaxRates_ListAll,
    ResTaxonomies, ResTaxonomies_ListAll, ResTaxons, ResTaxons_ListAll,
    ResUsers, ResUsers_ListAll, ResVariants, ResVariants_ListAll, ResWebhookEvents,
    ResWebhookSubscribers, ResWebhookSubscribers_ListAll, ResWishedItems,
    ResWishedItems_ListAll, ResWishlists, ResWishlists_ListAll,
    ResZones, ResZones_ListAll
} from '@/interface/responseData/interfaceFlatform'

// Addresses
interface State_ResAddress {
    resAddress_List: ResAddress_ListAll | undefined;
    setResAddress_List: (data: ResAddress_ListAll) => void;
    resAddress: ResAddress | undefined;
    setResAddress: (data: ResAddress) => void;
}

export const useState_ResAddress = create<State_ResAddress>((set) => ({
    resAddress_List: undefined,
    setResAddress_List: (data) => set({ resAddress_List: data }),
    resAddress: undefined,
    setResAddress: (data) => set({ resAddress: data })
}))

// Adjustments
interface State_ResAdjustments {
    resAdjustments_List: ResAdjustments_ListAll | undefined;
    setResAdjustments_List: (data: ResAdjustments_ListAll) => void;
    resAdjustments: ResAdjustments | undefined;
    setResAdjustments: (data: ResAdjustments) => void;
}

export const useState_ResAdjustments = create<State_ResAdjustments>((set) => ({
    resAdjustments_List: undefined,
    setResAdjustments_List: (data) => set({ resAdjustments_List: data }),
    resAdjustments: undefined,
    setResAdjustments: (data) => set({ resAdjustments: data })
}))

// Classifications
interface State_ResClassifications {
    resClassifications_List: ResClassifications_ListAll | undefined;
    setResClassifications_List: (data: ResClassifications_ListAll) => void;
    resClassifications: ResClassifications | undefined;
    setResClassifications: (data: ResClassifications) => void;
}

export const useState_ResClassifications = create<State_ResClassifications>((set) => ({
    resClassifications_List: undefined,
    setResClassifications_List: (data) => set({ resClassifications_List: data }),
    resClassifications: undefined,
    setResClassifications: (data) => set({ resClassifications: data })
}))

// Countries
interface State_ResCountries {
    resCountries_List: ResCountries_ListAll | undefined;
    setResCountries_List: (data: ResCountries_ListAll) => void;
    resCountries: ResCountries | undefined;
    setResCountries: (data: ResCountries) => void;
}

export const useState_ResCountries = create<State_ResCountries>((set) => ({
    resCountries_List: undefined,
    setResCountries_List: (data) => set({ resCountries_List: data }),
    resCountries: undefined,
    setResCountries: (data) => set({ resCountries: data })
}))

// Data Feeds
interface State_ResDataFeeds {
    resDataFeeds_List: ResDataFeeds_ListAll | undefined;
    setResDataFeeds_List: (data: ResDataFeeds_ListAll) => void;
    resDataFeeds: ResDataFeeds | undefined;
    setResDataFeeds: (data: ResDataFeeds) => void;
}

export const useState_ResDataFeeds = create<State_ResDataFeeds>((set) => ({
    resDataFeeds_List: undefined,
    setResDataFeeds_List: (data) => set({ resDataFeeds_List: data }),
    resDataFeeds: undefined,
    setResDataFeeds: (data) => set({ resDataFeeds: data })
}))

// Digital Links
interface State_ResDigitalLinks {
    resDigitalLinks_List: ResDigitalLinks_ListAll | undefined;
    setResDigitalLinks_List: (data: ResDigitalLinks_ListAll) => void;
    resDigitalLinks: ResDigitalLinks | undefined;
    setResDigitalLinks: (data: ResDigitalLinks) => void;
}

export const useState_ResDigitalLinks = create<State_ResDigitalLinks>((set) => ({
    resDigitalLinks_List: undefined,
    setResDigitalLinks_List: (data) => set({ resDigitalLinks_List: data }),
    resDigitalLinks: undefined,
    setResDigitalLinks: (data) => set({ resDigitalLinks: data })
}))

// Digital Assets
interface State_ResDigitalsAssets {
    resDigitalsAssets_List: ResDigitalsAssets_ListAll | undefined;
    setResDigitalsAssets_List: (data: ResDigitalsAssets_ListAll) => void;
    resDigitalsAssets: ResDigitalsAssets | undefined;
    setResDigitalsAssets: (data: ResDigitalsAssets) => void;
}

export const useState_ResDigitalsAssets = create<State_ResDigitalsAssets>((set) => ({
    resDigitalsAssets_List: undefined,
    setResDigitalsAssets_List: (data) => set({ resDigitalsAssets_List: data }),
    resDigitalsAssets: undefined,
    setResDigitalsAssets: (data) => set({ resDigitalsAssets: data })
}))

// Line Items
interface State_ResLineItems {
    resLineItems_List: ResLineItems_ListAll | undefined;
    setResLineItems_List: (data: ResLineItems_ListAll) => void;
    resLineItems: ResLineItems | undefined;
    setResLineItems: (data: ResLineItems) => void;
}

export const useState_ResLineItems = create<State_ResLineItems>((set) => ({
    resLineItems_List: undefined,
    setResLineItems_List: (data) => set({ resLineItems_List: data }),
    resLineItems: undefined,
    setResLineItems: (data) => set({ resLineItems: data })
}))

// Option Types
interface State_ResOptionTypes {
    resOptionTypes_List: ResOptionTypes_ListAll | undefined;
    setResOptionTypes_List: (data: ResOptionTypes_ListAll) => void;
    resOptionTypes: ResOptionTypes | undefined;
    setResOptionTypes: (data: ResOptionTypes) => void;
}

export const useState_ResOptionTypes = create<State_ResOptionTypes>((set) => ({
    resOptionTypes_List: undefined,
    setResOptionTypes_List: (data) => set({ resOptionTypes_List: data }),
    resOptionTypes: undefined,
    setResOptionTypes: (data) => set({ resOptionTypes: data })
}))

// Option Values
interface State_ResOptionValues {
    resOptionValues_List: ResOptionValues_ListAll | undefined;
    setResOptionValues_List: (data: ResOptionValues_ListAll) => void;
    resOptionValues: ResOptionValues | undefined;
    setResOptionValues: (data: ResOptionValues) => void;
}

export const useState_ResOptionValues = create<State_ResOptionValues>((set) => ({
    resOptionValues_List: undefined,
    setResOptionValues_List: (data) => set({ resOptionValues_List: data }),
    resOptionValues: undefined,
    setResOptionValues: (data) => set({ resOptionValues: data })
}))

// Orders
interface State_ResOrders {
    resOrders_List: ResOrders_ListAll | undefined;
    setResOrders_List: (data: ResOrders_ListAll) => void;
    resOrders: ResOrders | undefined;
    setResOrders: (data: ResOrders) => void;
}

export const useState_ResOrders = create<State_ResOrders>((set) => ({
    resOrders_List: undefined,
    setResOrders_List: (data) => set({ resOrders_List: data }),
    resOrders: undefined,
    setResOrders: (data) => set({ resOrders: data })
}))

// Payment Methods
interface State_ResPaymentMethods {
    resPaymentMethods_List: ResPaymentMethods_ListAll | undefined;
    setResPaymentMethods_List: (data: ResPaymentMethods_ListAll) => void;
    resPaymentMethods: ResPaymentMethods | undefined;
    setResPaymentMethods: (data: ResPaymentMethods) => void;
}

export const useState_ResPaymentMethods = create<State_ResPaymentMethods>((set) => ({
    resPaymentMethods_List: undefined,
    setResPaymentMethods_List: (data) => set({ resPaymentMethods_List: data }),
    resPaymentMethods: undefined,
    setResPaymentMethods: (data) => set({ resPaymentMethods: data })
}))

// Payments
interface State_ResPayments {
    resPayments_List: ResPayments_ListAll | undefined;
    setResPayments_List: (data: ResPayments_ListAll) => void;
    resPayments: ResPayments | undefined;
    setResPayments: (data: ResPayments) => void;
}

export const useState_ResPayments = create<State_ResPayments>((set) => ({
    resPayments_List: undefined,
    setResPayments_List: (data) => set({ resPayments_List: data }),
    resPayments: undefined,
    setResPayments: (data) => set({ resPayments: data })
}))

// Products
interface State_ResProducts {
    resProducts_List: ResProducts_ListAll | undefined;
    setResProducts_List: (data: ResProducts_ListAll) => void;
    resProducts: ResProducts | undefined;
    setResProducts: (data: ResProducts) => void;
}

export const useState_ResProducts = create<State_ResProducts>((set) => ({
    resProducts_List: undefined,
    setResProducts_List: (data) => set({ resProducts_List: data }),
    resProducts: undefined,
    setResProducts: (data) => set({ resProducts: data })
}))

// Promotion Actions
interface State_ResPromotionActions {
    resPromotionActions_List: ResPromotionActions_ListAll | undefined;
    setResPromotionActions_List: (data: ResPromotionActions_ListAll) => void;
    resPromotionActions: ResPromotionActions | undefined;
    setResPromotionActions: (data: ResPromotionActions) => void;
}

export const useState_ResPromotionActions = create<State_ResPromotionActions>((set) => ({
    resPromotionActions_List: undefined,
    setResPromotionActions_List: (data) => set({ resPromotionActions_List: data }),
    resPromotionActions: undefined,
    setResPromotionActions: (data) => set({ resPromotionActions: data })
}))

// Promotion Categories
interface State_ResPromotionCategories {
    resPromotionCategories_List: ResPromotionCategories_ListAll | undefined;
    setResPromotionCategories_List: (data: ResPromotionCategories_ListAll) => void;
    resPromotionCategoriess: ResPromotionCategories | undefined;
    setResPromotionCategories: (data: ResPromotionCategories) => void;
}

export const useState_ResPromotionCategories = create<State_ResPromotionCategories>((set) => ({
    resPromotionCategories_List: undefined,
    setResPromotionCategories_List: (data) => set({ resPromotionCategories_List: data }),
    resPromotionCategoriess: undefined,
    setResPromotionCategories: (data) => set({ resPromotionCategoriess: data })
}))

// Promotion Rules
interface State_ResPromotionRules {
    resPromotionRules_List: ResPromotionRules_ListAll | undefined;
    setResPromotionRules_List: (data: ResPromotionRules_ListAll) => void;
    resPromotionRules: ResPromotionRules | undefined;
    setResPromotionRules: (data: ResPromotionRules) => void;
}

export const useState_ResPromotionRules = create<State_ResPromotionRules>((set) => ({
    resPromotionRules_List: undefined,
    setResPromotionRules_List: (data) => set({ resPromotionRules_List: data }),
    resPromotionRules: undefined,
    setResPromotionRules: (data) => set({ resPromotionRules: data })
}))

// Promotions
interface State_ResPromotions {
    resPromotions_List: ResPromotions_ListAll | undefined;
    setResPromotions_List: (data: ResPromotions_ListAll) => void;
    resPromotions: ResPromotions | undefined;
    setResPromotions: (data: ResPromotions) => void;
}

export const useState_ResPromotions = create<State_ResPromotions>((set) => ({
    resPromotions_List: undefined,
    setResPromotions_List: (data) => set({ resPromotions_List: data }),
    resPromotions: undefined,
    setResPromotions: (data) => set({ resPromotions: data })
}))

// Roles
interface State_ResRoles {
    resRoles_List: ResRoles_ListAll | undefined;
    setResRoles_List: (data: ResRoles_ListAll) => void;
    resRoles: ResRoles | undefined;
    setResRoles: (data: ResRoles) => void;
}

export const useState_ResRoles = create<State_ResRoles>((set) => ({
    resRoles_List: undefined,
    setResRoles_List: (data) => set({ resRoles_List: data }),
    resRoles: undefined,
    setResRoles: (data) => set({ resRoles: data })
}))

// Shipments
interface State_ResShipment {
    resShipment_List: ResShipment_ListAll | undefined;
    setResShipment_List: (data: ResShipment_ListAll) => void;
    resShipment: ResShipment | undefined;
    setResShipment: (data: ResShipment) => void;
}

export const useState_ResShipment = create<State_ResShipment>((set) => ({
    resShipment_List: undefined,
    setResShipment_List: (data) => set({ resShipment_List: data }),
    resShipment: undefined,
    setResShipment: (data) => set({ resShipment: data })
}))

// Shipping Categories
interface State_ResShippingCategories {
    resShippingCategories_List: ResShippingCategories_ListAll | undefined;
    setResShippingCategories_List: (data: ResShippingCategories_ListAll) => void;
    resShippingCategories: ResShippingCategories | undefined;
    setResShippingCategories: (data: ResShippingCategories) => void;
}

export const useState_ResShippingCategories = create<State_ResShippingCategories>((set) => ({
    resShippingCategories_List: undefined,
    setResShippingCategories_List: (data) => set({ resShippingCategories_List: data }),
    resShippingCategories: undefined,
    setResShippingCategories: (data) => set({ resShippingCategories: data })
}))

// Shipping Methods
interface State_ResShippingMethods {
    resShippingMethods_List: ResShippingMethods_ListAll | undefined;
    setResShippingMethods_List: (data: ResShippingMethods_ListAll) => void;
    resShippingMethods: ResShippingMethods | undefined;
    setResShippingMethods: (data: ResShippingMethods) => void;
}

export const useState_ResShippingMethods = create<State_ResShippingMethods>((set) => ({
    resShippingMethods_List: undefined,
    setResShippingMethods_List: (data) => set({ resShippingMethods_List: data }),
    resShippingMethods: undefined,
    setResShippingMethods: (data) => set({ resShippingMethods: data })
}))

// States
interface State_ResStates {
    resStates_List: ResStates_ListAll | undefined;
    setResStates_List: (data: ResStates_ListAll) => void;
    resStates: ResStates | undefined;
    setResStates: (data: ResStates) => void;
}

export const useState_ResStates = create<State_ResStates>((set) => ({
    resStates_List: undefined,
    setResStates_List: (data) => set({ resStates_List: data }),
    resStates: undefined,
    setResStates: (data) => set({ resStates: data })
}))

// Stock Items
interface State_ResStockItems {
    resStockItems_List: ResStockItems_ListAll | undefined;
    setResStockItems_List: (data: ResStockItems_ListAll) => void;
    resStockItems: ResStockItems | undefined;
    setResStockItems: (data: ResStockItems) => void;
}

export const useState_ResStockItems = create<State_ResStockItems>((set) => ({
    resStockItems_List: undefined,
    setResStockItems_List: (data) => set({ resStockItems_List: data }),
    resStockItems: undefined,
    setResStockItems: (data) => set({ resStockItems: data })
}))

// Stock Locations
interface State_ResStockLocations {
    resStockLocations_List: ResStockLocations_ListAll | undefined;
    setResStockLocations_List: (data: ResStockLocations_ListAll) => void;
    resStockLocations: ResStockLocations | undefined;
    setResStockLocations: (data: ResStockLocations) => void;
}

export const useState_ResStockLocations = create<State_ResStockLocations>((set) => ({
    resStockLocations_List: undefined,
    setResStockLocations_List: (data) => set({ resStockLocations_List: data }),
    resStockLocations: undefined,
    setResStockLocations: (data) => set({ resStockLocations: data })
}))

// Store Credit Categories
interface State_ResStoreCreditCategories {
    resStoreCreditCategories_List: ResStoreCreditCategories_ListAll | undefined;
    setResStoreCreditCategories_List: (data: ResStoreCreditCategories_ListAll) => void;
    resStoreCreditCategories: ResStoreCreditCategories | undefined;
    setResStoreCreditCategories: (data: ResStoreCreditCategories) => void;
}

export const useState_ResStoreCreditCategories = create<State_ResStoreCreditCategories>((set) => ({
    resStoreCreditCategories_List: undefined,
    setResStoreCreditCategories_List: (data) => set({ resStoreCreditCategories_List: data }),
    resStoreCreditCategories: undefined,
    setResStoreCreditCategories: (data) => set({ resStoreCreditCategories: data })
}))

// Store Credit Types
interface State_ResStoreCreditTypes {
    resStoreCreditTypes_List: ResStoreCreditTypes_ListAll | undefined;
    setResStoreCreditTypes_List: (data: ResStoreCreditTypes_ListAll) => void;
    resStoreCreditTypes: ResStoreCreditTypes | undefined;
    setResStoreCreditTypes: (data: ResStoreCreditTypes) => void;
}

export const useState_ResStoreCreditTypes = create<State_ResStoreCreditTypes>((set) => ({
    resStoreCreditTypes_List: undefined,
    setResStoreCreditTypes_List: (data) => set({ resStoreCreditTypes_List: data }),
    resStoreCreditTypes: undefined,
    setResStoreCreditTypes: (data) => set({ resStoreCreditTypes: data })
}))

// Store Credits
interface State_ResStoreCredits {
    resStoreCredits_List: ResStoreCredits_ListAll | undefined;
    setResStoreCredits_List: (data: ResStoreCredits_ListAll) => void;
    resStoreCredits: ResStoreCredits | undefined;
    setResStoreCredits: (data: ResStoreCredits) => void;
}

export const useState_ResStoreCredits = create<State_ResStoreCredits>((set) => ({
    resStoreCredits_List: undefined,
    setResStoreCredits_List: (data) => set({ resStoreCredits_List: data }),
    resStoreCredits: undefined,
    setResStoreCredits: (data) => set({ resStoreCredits: data })
}))

// Tax Categories
interface State_ResTaxCategories {
    resTaxCategories_List: ResTaxCategories_ListAll | undefined;
    setResTaxCategories_List: (data: ResTaxCategories_ListAll) => void;
    resTaxCategories: ResTaxCategories | undefined;
    setResTaxCategories: (data: ResTaxCategories) => void;
}

export const useState_ResTaxCategories = create<State_ResTaxCategories>((set) => ({
    resTaxCategories_List: undefined,
    setResTaxCategories_List: (data) => set({ resTaxCategories_List: data }),
    resTaxCategories: undefined,
    setResTaxCategories: (data) => set({ resTaxCategories: data })
}))

// Tax Rates
interface State_ResTaxRates {
    resTaxRates_List: ResTaxRates_ListAll | undefined;
    setResTaxRates_List: (data: ResTaxRates_ListAll) => void;
    resTaxRates: ResTaxRates | undefined;
    setResTaxRates: (data: ResTaxRates) => void;
}

export const useState_ResTaxRates = create<State_ResTaxRates>((set) => ({
    resTaxRates_List: undefined,
    setResTaxRates_List: (data) => set({ resTaxRates_List: data }),
    resTaxRates: undefined,
    setResTaxRates: (data) => set({ resTaxRates: data })
}))

// Taxonomies
interface State_ResTaxonomies {
    resTaxonomies_List: ResTaxonomies_ListAll | undefined;
    setResTaxonomies_List: (data: ResTaxonomies_ListAll) => void;
    resTaxonomies: ResTaxonomies | undefined;
    setResTaxonomies: (data: ResTaxonomies) => void;
}

export const useState_ResTaxonomies = create<State_ResTaxonomies>((set) => ({
    resTaxonomies_List: undefined,
    setResTaxonomies_List: (data) => set({ resTaxonomies_List: data }),
    resTaxonomies: undefined,
    setResTaxonomies: (data) => set({ resTaxonomies: data })
}))

// Taxons
interface State_ResTaxons {
    resTaxons_List: ResTaxons_ListAll | undefined;
    setResTaxons_List: (data: ResTaxons_ListAll) => void;
    resTaxons: ResTaxons | undefined;
    setResTaxons: (data: ResTaxons) => void;
}

export const useState_ResTaxons = create<State_ResTaxons>((set) => ({
    resTaxons_List: undefined,
    setResTaxons_List: (data) => set({ resTaxons_List: data }),
    resTaxons: undefined,
    setResTaxons: (data) => set({ resTaxons: data })
}))

// Users
interface State_ResUsers {
    resUsers_List: ResUsers_ListAll | undefined;
    setResUsers_List: (data: ResUsers_ListAll) => void;
    resUsers: ResUsers | undefined;
    setResUsers: (data: ResUsers) => void;
}

export const useState_ResUsers = create<State_ResUsers>((set) => ({
    resUsers_List: undefined,
    setResUsers_List: (data) => set({ resUsers_List: data }),
    resUsers: undefined,
    setResUsers: (data) => set({ resUsers: data })
}))

// Variants
interface State_ResVariants {
    resVariants_List: ResVariants_ListAll | undefined;
    setResVariants_List: (data: ResVariants_ListAll) => void;
    resVariants: ResVariants | undefined;
    setResVariants: (data: ResVariants) => void;
}

export const useState_ResVariants = create<State_ResVariants>((set) => ({
    resVariants_List: undefined,
    setResVariants_List: (data) => set({ resVariants_List: data }),
    resVariants: undefined,
    setResVariants: (data) => set({ resVariants: data })
}))

// Webhook Events
interface State_ResWebhookEvents {
    resWebhookEvents: ResWebhookEvents | undefined;
    setResWebhookEvents: (data: ResWebhookEvents) => void;
}

export const useState_ResWebhookEvents = create<State_ResWebhookEvents>((set) => ({
    resWebhookEvents: undefined,
    setResWebhookEvents: (data) => set({ resWebhookEvents: data })
}))

// Webhook Subscribers
interface State_ResWebhookSubscribers {
    resWebhookSubscribers_List: ResWebhookSubscribers_ListAll | undefined;
    setResWebhookSubscribers_List: (data: ResWebhookSubscribers_ListAll) => void;
    resWebhookSubscribers: ResWebhookSubscribers | undefined;
    setResWebhookSubscribers: (data: ResWebhookSubscribers) => void;
}

export const useState_ResWebhookSubscribers = create<State_ResWebhookSubscribers>((set) => ({
    resWebhookSubscribers_List: undefined,
    setResWebhookSubscribers_List: (data) => set({ resWebhookSubscribers_List: data }),
    resWebhookSubscribers: undefined,
    setResWebhookSubscribers: (data) => set({ resWebhookSubscribers: data })
}))

// Wished Items
interface State_ResWishedItems {
    resWishedItems_List: ResWishedItems_ListAll | undefined;
    setResWishedItems_List: (data: ResWishedItems_ListAll) => void;
    resWishedItems: ResWishedItems | undefined;
    setResWishedItems: (data: ResWishedItems) => void;
}

export const useState_ResWishedItems = create<State_ResWishedItems>((set) => ({
    resWishedItems_List: undefined,
    setResWishedItems_List: (data) => set({ resWishedItems_List: data }),
    resWishedItems: undefined,
    setResWishedItems: (data) => set({ resWishedItems: data })
}))

// Wishlists
interface State_ResWishlists {
    resWishlists_List: ResWishlists_ListAll | undefined;
    setResWishlists_List: (data: ResWishlists_ListAll) => void;
    resWishlists: ResWishlists | undefined;
    setResWishlists: (data: ResWishlists) => void;
}

export const useState_ResWishlists = create<State_ResWishlists>((set) => ({
    resWishlists_List: undefined,
    setResWishlists_List: (data) => set({ resWishlists_List: data }),
    resWishlists: undefined,
    setResWishlists: (data) => set({ resWishlists: data })
}))

// Zones
interface State_ResZones {
    resZones_List: ResZones_ListAll | undefined;
    setResZones_List: (data: ResZones_ListAll) => void;
    resZones: ResZones | undefined;
    setResZones: (data: ResZones) => void;
}

export const useState_ResZones = create<State_ResZones>((set) => ({
    resZones_List: undefined,
    setResZones_List: (data) => set({ resZones_List: data }),
    resZones: undefined,
    setResZones: (data) => set({ resZones: data })
}))