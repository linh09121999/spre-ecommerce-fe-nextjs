import {
    Type,
    PaginationMeta,
    PaginationLinks,
    Time_Attributes
} from "../interface";

// Addresses
interface Address_Attributes {
    firstname: string;
    lastname: string;
    address1: string;
    address2: string | null;
    city: string;
    zipcode: string;
    phone: string;
    state_name: string | null;
    alternative_phone: string | null;
    company: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    label: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface Address_Relationships {
    country: {
        data: Type;
    };
    state: {
        data: Type | null;
    };
    user: {
        data: Type | null;
    };
}

interface Address {
    id: string;
    type: string;
    attributes: Address_Attributes;
    relationships: Address_Relationships;
}

export interface ResAddress_ListAll {
    data: Address[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResAddress {
    data: Address
}

// Adjustments
interface Adjustment_Attributes {
    source_type: string;
    adjustable_type: string;
    amount: string;
    label: string;
    mandatory: boolean | null;
    eligible: boolean;
    created_at: string;
    updated_at: string;
    state: string; // Could be other states like "closed", "finalized", etc.
    included: boolean;
    display_amount: string;
}

interface Adjustment_Relationships {
    order: {
        data: Type;
    };
    adjustable: {
        data: Type;
    };
    source: {
        data: Type;
    };
}

interface Adjustment {
    id: string;
    type: string;
    attributes: Adjustment_Attributes;
    relationships: Adjustment_Relationships;
}

export interface ResAdjustments_ListAll {
    data: Adjustment[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResAdjustments {
    data: Adjustment
}

// Classifications
interface Classification_Attributes {
    position: number;
    created_at: string;
    updated_at: string;
}

interface Classification_Relationships {
    product: {
        data: Type;
    };
    taxon: {
        data: Type;
    };
}

interface Classification {
    id: string;
    type: string;
    attributes: Classification_Attributes;
    relationships: Classification_Relationships;
}

export interface ResClassifications_ListAll {
    data: Classification[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResClassifications {
    data: Classification
}

// Countries
interface Country_Attributes {
    iso_name: string;
    iso: string;
    iso3: string;
    name: string;
    numcode: number;
    states_required: boolean;
    updated_at: string;
    zipcode_required: boolean;
    created_at: string;
}

interface Country_Relationships {
    states: {
        data: Type[];
    };
}

interface Country {
    id: string;
    type: string;
    attributes: Country_Attributes;
    relationships: Country_Relationships;
}

export interface ResCountries_ListAll {
    data: Country[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResCountries {
    data: Country
}
// Data Feeds

interface DataFeed_Attributes {
    name: string;
    type: string;
    slug: string;
    active: boolean;
}

interface DataFeed_Relationships {
    store: {
        data: Type
    }
}

interface DataFeed {
    id: string;
    type: string;
    attributes: DataFeed_Attributes;
    relationships?: DataFeed_Relationships
}


export interface ResDataFeeds_ListAll {
    data: DataFeed[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResDataFeeds {
    data: DataFeed
}

// Digital Links
interface DigitalLink_Attributes {
    token: string;
    access_counter: number;
}

interface DigitalLink_Relationships {
    digital: {
        data: Type;
    };
    line_item: {
        data: Type;
    };
}

interface DigitalLink {
    id: string;
    type: string;
    attributes: DigitalLink_Attributes;
    relationships: DigitalLink_Relationships;
}

export interface ResDigitalLinks_ListAll {
    data: DigitalLink[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResDigitalLinks {
    data: DigitalLink
}

// Digital Assets
interface DigitalsAssets_Attributes {
    url: string;
    content_type: string;
    filename: string;
    byte_size: number;
}

interface DigitalsAssets_Relationships {
    variant: {
        data: Type;
    };
}

interface DigitalsAssets {
    id: string;
    type: string;
    attributes: DigitalsAssets_Attributes;
    relationships: DigitalsAssets_Relationships;
}

export interface ResDigitalsAssets_ListAll {
    data: DigitalsAssets[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResDigitalsAssets {
    data: DigitalsAssets
}

// Line Items
interface LineItem_Attributes {
    quantity: number;
    price: string;
    created_at: string;
    updated_at: string;
    currency: string;
    cost_price: string;
    adjustment_total: string;
    additional_tax_total: string;
    promo_total: string;
    included_tax_total: string;
    pre_tax_amount: string;
    taxable_adjustment_total: string;
    non_taxable_adjustment_total: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    display_discounted_amount: string;
    display_amount: string;
    display_final_amount: string;
    display_subtotal: string;
    display_pre_tax_amount: string;
    display_price: string;
    display_adjustment_total: string;
    display_additional_tax_total: string;
    display_promo_total: string;
    display_total: string;
    display_included_tax_total: string;
}

interface LineItem_Relationships {
    order: {
        data: Type;
    };
    tax_category: {
        data: Type;
    };
    variant: {
        data: Type;
    };
    adjustments: {
        data: Type[];
    };
    inventory_units: {
        data: Type[];
    };
    digital_links: {
        data: Type[];
    };
}

interface LineItem {
    id: string;
    type: string;
    attributes: LineItem_Attributes;
    relationships: LineItem_Relationships;
}

export interface ResLineItems_ListAll {
    data: LineItem[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResLineItems {
    data: LineItem
}

// Option Types
interface OptionType_Attributes {
    name: string;
    presentation: string;
    position: number;
    created_at: string;
    updated_at: string;
    filterable: boolean;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface OptionType_Relationships {
    option_values: {
        data: Type[];
    };
}

interface OptionType {
    id: string;
    type: string;
    attributes: OptionType_Attributes;
    relationships: OptionType_Relationships;
}

export interface ResOptionTypes_ListAll {
    data: OptionType[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResOptionTypes {
    data: OptionType
}

// Option Values
interface OptionValue_Attributes {
    position: number;
    name: string;
    presentation: string;
    created_at: string;
    updated_at: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface OptionValue_Relationships {
    option_type: {
        data: Type;
    };
}

interface OptionValue {
    id: string;
    type: string;
    attributes: OptionValue_Attributes;
    relationships: OptionValue_Relationships;
}

export interface ResOptionValues_ListAll {
    data: OptionValue[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResOptionValues {
    data: OptionValue
}

// Orders
interface Order_Attributes {
    number: string;
    item_total: string;
    total: string;
    state: string;
    adjustment_total: string;
    completed_at: string | null;
    payment_total: string;
    shipment_state: string | null;
    payment_state: string | null;
    email: string;
    special_instructions: string | null;
    created_at: string;
    updated_at: string;
    currency: string;
    last_ip_address: string | null;
    shipment_total: string;
    additional_tax_total: string;
    promo_total: string;
    channel: string;
    included_tax_total: string;
    item_count: number;
    approved_at: string | null;
    confirmation_delivered: boolean;
    canceled_at: string | null;
    state_lock_version: number;
    taxable_adjustment_total: string;
    non_taxable_adjustment_total: string;
    store_owner_notification_delivered: boolean | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    internal_note: string | null;
    display_ship_total: string;
    display_shipment_total: string;
    display_outstanding_balance: string;
    display_item_total: string;
    display_adjustment_total: string;
    display_included_tax_total: string;
    display_additional_tax_total: string;
    display_tax_total: string;
    display_promo_total: string;
    display_total: string;
    display_cart_promo_total: string;
    display_pre_tax_item_amount: string;
    display_pre_tax_total: string;
    display_total_applicable_store_credit: string;
    display_total_applied_store_credit: string;
    display_order_total_after_store_credit: string;
    display_total_available_store_credit: string;
    display_store_credit_remaining_after_capture: string;
}

interface Order_Relationships {
    user: {
        data: Type | null;
    };
    created_by: {
        data: Type | null;
    };
    approver: {
        data: Type | null;
    };
    canceler: {
        data: Type | null;
    };
    bill_address: {
        data: Type | null;
    };
    ship_address: {
        data: Type | null;
    };
    line_items: {
        data: Type[];
    };
    payments: {
        data: Type[]
    };
    shipments: {
        data: Type[]
    };
    state_changes: {
        data: Type[]
    };
    return_authorizations: {
        data: Type[]
    };
    reimbursements: {
        data: Type[]
    };
    adjustments: {
        data: Type[]
    };
    all_adjustments: {
        data: Type[]
    };
    order_promotions: {
        data: Type[]
    };
}

interface Order {
    id: string;
    type: string;
    attributes: Order_Attributes;
    relationships: Order_Relationships;
}

export interface ResOrders_ListAll {
    data: Order[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResOrders {
    data: Order
}

// Payment Methods
interface PaymentMethod_Attributes {
    name: string;
    type: string;
    description: string | null;
    active: boolean;
    display_on: string;
    auto_capture: boolean | null;
    position: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    preferences: {
        dummy_key?: string;
        test_mode?: boolean;
        server?: string
    };
}

interface PaymentMethod_Relationships {
    stores: {
        data: Type[];
    };
}

interface PaymentMethod {
    id: string;
    type: string;
    attributes: PaymentMethod_Attributes;
    relationships: PaymentMethod_Relationships;
}

export interface ResPaymentMethods_ListAll {
    data: PaymentMethod[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPaymentMethods {
    data: PaymentMethod
}

// Payments
interface Payment_Attributes {
    amount: string;
    source_type: string;
    state: string;
    response_code: string;
    avs_response: string | null;
    created_at: string;
    updated_at: string;
    number: string;
    cvv_response_code: string | null;
    cvv_response_message: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    display_amount: string;
}

interface Payment_Relationships {
    order: {
        data: Type;
    };
    payment_method: {
        data: Type;
    };
    source: {
        data: Type | null;
    };
    log_entries: {
        data: Type[];
    };
    state_changes: {
        data: Type[];
    };
    payment_capture_events: {
        data: Type[];
    };
    refunds: {
        data: Type[];
    };
}

interface Payment {
    id: string;
    type: string;
    attributes: Payment_Attributes;
    relationships: Payment_Relationships;
}

export interface ResPayments_ListAll {
    data: Payment[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPayments {
    data: Payment
}

// Products
interface Product_Attributes {
    name: string;
    description: string;
    available_on: string;
    deleted_at: string | null;
    slug: string;
    meta_description: string | null;
    meta_keywords: string | null;
    created_at: string;
    updated_at: string;
    promotionable: boolean;
    meta_title: string | null;
    discontinue_on: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    status: string;
    make_active_at: string;
    display_compare_at_price: string | null;
    display_price: string;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    available: boolean;
    currency: string;
    price: string;
    compare_at_price: string | null;
}

interface Product_Relationships {
    tax_category: {
        data: Type;
    };
    primary_variant: {
        data: Type;
    };
    default_variant: {
        data: Type;
    };
    variants: {
        data: Type[];
    };
    option_types: {
        data: Type[];
    };
    product_properties: {
        data: Type[];
    };
    taxons: {
        data: Type[];
    };
    images: {
        data: Type[];
    };
}

interface Product {
    id: string;
    type: string;
    attributes: Product_Attributes;
    relationships: Product_Relationships;
}

export interface ResProducts_ListAll {
    data: Product[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResProducts {
    data: Product
}

// Promotion Actions
interface PromotionAction_Attributes {
    position: number | null;
    type: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

interface PromotionAction_Relationships {
    promotion: {
        data: Type;
    };
}

interface PromotionAction {
    id: string;
    type: string;
    attributes: PromotionAction_Attributes;
    relationships: PromotionAction_Relationships;
}

export interface ResPromotionActions_ListAll {
    data: PromotionAction[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPromotionActions {
    data: PromotionAction
}

// Promotion Categories
interface PromotionCategory_Attributes extends Time_Attributes {
    code: string;
}

interface PromotionCategory_Relationships {
    promotions: {
        data: Type[];
    };
}

interface PromotionCategory {
    id: string;
    type: string;
    attributes: PromotionCategory_Attributes;
    relationships: PromotionCategory_Relationships;
}

export interface ResPromotionCategories_ListAll {
    data: PromotionCategory[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPromotionCategories {
    data: PromotionCategory
}

// Promotion Rules

interface PromotionRule_Attributes {
    type: string | null;
    created_at: string;
    updated_at: string;
    code: string | null;
    preferences: Record<string, any>;
}

interface PromotionRule_Relationships {
    promotion: {
        data: Type;
    };
}

interface PromotionRule {
    id: string;
    type: string;
    attributes: PromotionRule_Attributes;
    relationships: PromotionRule_Relationships;
}

export interface ResPromotionRules_ListAll {
    data: PromotionRule[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPromotionRules {
    data: PromotionRule
}

// Promotions
interface Promotion_Attributes {
    description: string | null;
    expires_at: string | null;
    starts_at: string | null;
    name: string;
    type: string | null;
    usage_limit: number | null;
    match_policy: string;
    code: string | null;
    advertise: boolean;
    path: string | null;
    created_at: string;
    updated_at: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface Promotion_Relationships {
    promotion_category: {
        data: Type | null;
    };
    promotion_rules: {
        data: Type[];
    };
    promotion_actions: {
        data: Type[];
    };
    stores: {
        data: Type[];
    };
}

interface Promotion {
    id: string;
    type: string;
    attributes: Promotion_Attributes;
    relationships: Promotion_Relationships;
}

export interface ResPromotions_ListAll {
    data: Promotion[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPromotions {
    data: Promotion
}

// Roles
interface Role {
    id: string;
    type: string;
    attributes: Time_Attributes;
}


export interface ResRoles_ListAll {
    data: Role[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResRoles {
    data: Role
}

// Shipments
interface Shipment_Attributes {
    tracking: string;
    number: string;
    cost: string;
    shipped_at: string | null;
    state: string;
    created_at: string;
    updated_at: string;
    adjustment_total: string;
    additional_tax_total: string;
    promo_total: string;
    included_tax_total: string;
    pre_tax_amount: string;
    taxable_adjustment_total: string;
    non_taxable_adjustment_total: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    display_discounted_cost: string;
    display_item_cost: string;
    display_amount: string;
    display_final_price: string;
    display_cost: string;
    tracking_url: string | null;
}

interface Shipment_Relationships {
    order: {
        data: Type;
    };
    address: {
        data: null | Type;
    };
    stock_location: {
        data: Type;
    };
    adjustments: {
        data: Type[];
    };
    inventory_units: {
        data: Type[];
    };
    shipping_rates: {
        data: Type[];
    };
    state_changes: {
        data: Type[];
    };
    selected_shipping_rate: {
        data: Type;
    };
}

interface Shipment {
    id: string;
    type: string;
    attributes: Shipment_Attributes;
    relationships: Shipment_Relationships;
}

export interface ResShipment_ListAll {
    data: Shipment[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResShipment {
    data: Shipment
}

// Shipping Categories

interface ShippingCategory {
    id: string;
    type: string;
    attributes: Time_Attributes;
}

export interface ResShippingCategories_ListAll {
    data: ShippingCategory[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResShippingCategories {
    data: ShippingCategory
}

// Shipping Methods
interface ShippingMethod_Attributes {
    name: string;
    code: string;
    admin_name: string | null;
    display_on: string; // Could be more specific: "both" | "back_end" | "front_end"
    tracking_url: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface ShippingMethod_Relationships {
    shipping_categories: {
        data: Type[];
    };
    shipping_rates: {
        data: Type[];
    };
    tax_category: {
        data: null | Type;
    };
    calculator: {
        data: Type;
    };
}

interface ShippingMethod {
    id: string;
    type: string;
    attributes: ShippingMethod_Attributes;
    relationships: ShippingMethod_Relationships;
}

export interface ResShippingMethods_ListAll {
    data: ShippingMethod[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResShippingMethods {
    data: ShippingMethod
}

// States
interface State_Attributes {
    name: string;
    abbr: string;
    updated_at: string;
    created_at: string;
}

interface State_Relationships {
    country: {
        data: Type;
    };
}

interface State {
    id: string;
    type: string;
    attributes: State_Attributes;
    relationships: State_Relationships;
}

export interface ResStates_ListAll {
    data: State[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStates {
    data: State
}

// Stock Items
interface StockItem_Attributes {
    count_on_hand: number;
    created_at: string;
    updated_at: string;
    backorderable: boolean;
    deleted_at: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    is_available: boolean;
}

interface StockItem_Relationships {
    stock_location: {
        data: Type;
    };
    variant: {
        data: Type;
    };
}

interface StockItem {
    id: string;
    type: string;
    attributes: StockItem_Attributes;
    relationships: StockItem_Relationships;
}

export interface ResStockItems_ListAll {
    data: StockItem[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStockItems {
    data: StockItem
}

// Stock Locations
interface StockLocation_Attributes extends Time_Attributes {
    default: boolean;
    address1: string;
    address2: string | null;
    city: string;
    state_name: string | null;
    zipcode: string;
    phone: string;
    active: boolean;
    backorderable_default: boolean;
    propagate_all_variants: boolean;
    admin_name: string | null;
}

interface StockLocation_Relationships {
    country: {
        data: Type;
    };
}

interface StockLocation {
    id: string;
    type: string;
    attributes: StockLocation_Attributes;
    relationships: StockLocation_Relationships;
}

export interface ResStockLocations_ListAll {
    data: StockLocation[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStockLocations {
    data: StockLocation
}

// Store Credit Categories
interface StoreCreditCategory {
    id: string;
    type: string;
    attributes: Time_Attributes;
}

export interface ResStoreCreditCategories_ListAll {
    data: StoreCreditCategory[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStoreCreditCategories {
    data: StoreCreditCategory
}

// Store Credit Types
interface StoreCreditType_Attributes extends Time_Attributes {
    priority: number;
}

interface StoreCreditType {
    id: string;
    type: string;
    attributes: StoreCreditType_Attributes;
}

export interface ResStoreCreditTypes_ListAll {
    data: StoreCreditType[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStoreCreditTypes {
    data: StoreCreditType
}

// Store Credits
interface StoreCredit_Attributes {
    amount: string;
    amount_used: string;
    memo: string | null;
    deleted_at: string | null;
    currency: string;
    amount_authorized: string;
    originator_type: string | null;
    created_at: string;
    updated_at: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    display_amount: string;
    display_amount_used: string;
}

interface StoreCredit_Relationships {
    user: {
        data: Type;
    };
    created_by: {
        data: Type;
    };
    store_credit_category: {
        data: Type;
    };
    store_credit_type: {
        data: Type;
    };
    store_credit_events: {
        data: Type[];
    };
}

interface StoreCredit {
    id: string;
    type: string;
    attributes: StoreCredit_Attributes;
    relationships: StoreCredit_Relationships;
}

export interface ResStoreCredits_ListAll {
    data: StoreCredit[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResStoreCredits {
    data: StoreCredit
}

// Tax Categories
interface TaxCategory_Attributes {
    name: string;
    description: string;
    is_default: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    tax_code: string | null;
}

interface TaxCategory_Relationships {
    tax_rates: {
        data: Type[];
    };
}

interface TaxCategory {
    id: string;
    type: string;
    attributes: TaxCategory_Attributes;
    relationships: TaxCategory_Relationships;
}

export interface ResTaxCategories_ListAll {
    data: TaxCategory[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResTaxCategories {
    data: TaxCategory
}

// Tax Rates
interface TaxRate_Attributes {
    amount: string;
    included_in_price: boolean;
    created_at: string;
    updated_at: string;
    name: string;
    show_rate_in_label: boolean;
    deleted_at: string | null;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface TaxRate_Relationships {
    zone: {
        data: Type;
    };
    tax_category: {
        data: Type;
    };
}

interface TaxRate {
    id: string;
    type: string;
    attributes: TaxRate_Attributes;
    relationships: TaxRate_Relationships;
}

export interface ResTaxRates_ListAll {
    data: TaxRate[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResTaxRates {
    data: TaxRate
}

// Taxonomies
interface Taxonomy_Attributes {
    name: string;
    created_at: string;
    updated_at: string;
    position: number;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
}

interface Taxonomy_Relationships {
    taxons: {
        data: Type[];
    };
    root: {
        data: Type;
    };
}

interface Taxonomy {
    id: string;
    type: string;
    attributes: Taxonomy_Attributes;
    relationships: Taxonomy_Relationships;
}

export interface ResTaxonomies_ListAll {
    data: Taxonomy[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResTaxonomies {
    data: Taxonomy
}

// Taxons
interface Taxon_Attributes {
    position: number;
    name: string;
    permalink: string;
    lft: number;
    rgt: number;
    description: string | null;
    created_at: string;
    updated_at: string;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    depth: number;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    pretty_name: string;
    seo_title: string;
    is_root: boolean;
    is_child: boolean;
    is_leaf: boolean;
}

interface Taxon_Relationships {
    parent: {
        data: Type | null;
    };
    taxonomy: {
        data: Type;
    };
    children: {
        data: Type[];
    };
    image: {
        data: Type | null;
    };
}

interface Taxon {
    id: string;
    type: string;
    attributes: Taxon_Attributes;
    relationships: Taxon_Relationships;
}

export interface ResTaxons_ListAll {
    data: Taxon[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResTaxons {
    data: Taxon
}

// Users
interface User_Attributes {
    email: string;
    first_name: string;
    last_name: string;
    selected_locale: string;
    created_at: string;
    updated_at: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    average_order_value: any[];
    lifetime_value: any[];
    store_credits: any[];
}

interface User_Relationships {
    bill_address: {
        data: Type | null;
    };
    ship_address: {
        data: Type | null;
    };
}

interface User {
    id: string;
    type: string;
    attributes: User_Attributes;
    relationships: User_Relationships;
}

export interface ResUsers_ListAll {
    data: User[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResUsers {
    data: User
}

// Variants
interface Variant_Attributes {
    sku: string;
    weight: string;
    height: string | null;
    depth: string | null;
    deleted_at: string | null;
    is_master: boolean;
    cost_price: string;
    position: number;
    cost_currency: string;
    track_inventory: boolean;
    updated_at: string;
    discontinue_on: string | null;
    created_at: string;
    public_metadata: Record<string, unknown>;
    private_metadata: Record<string, unknown>;
    barcode: string | null;
    display_price: string;
    display_compare_at_price: string | null;
    name: string;
    options_text: string;
    total_on_hand: number;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    available: boolean;
    currency: string;
    price: string;
    compare_at_price: string | null;
}

interface Variant_Relationships {
    product: {
        data: Type;
    };
    tax_category: {
        data: Type | null;
    };
    digitals: {
        data: Type[];
    };
    images: {
        data: Type[];
    };
    option_values: {
        data: Type[];
    };
    stock_items: {
        data: Type[];
    };
    stock_locations: {
        data: Type[];
    };
}

interface Variant {
    id: string;
    type: string;
    attributes: Variant_Attributes;
    relationships: Variant_Relationships;
}

export interface ResVariants_ListAll {
    data: Variant[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResVariants {
    data: Variant
}

// Webhook Events
interface WebhookEvent_Attributes {
    execution_time: number;
    name: string;
    request_errors: string;
    response_code: string;
    success: boolean;
    url: string;
    created_at: string;
    updated_at: string;
}

interface WebhookEvent_Relationships {
    subscriber: {
        data: Type;
    };
}

interface WebhookEvent {
    id: string;
    type: string;
    attributes: WebhookEvent_Attributes;
    relationships: WebhookEvent_Relationships;
}

export interface ResWebhookEvents {
    data: WebhookEvent[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

// Webhook Subscribers
interface WebhookSubscriber_Attributes {
    url: string;
    active: boolean;
    subscriptions: string[];
    created_at: string;
    updated_at: string;
}

interface WebhookSubscriber {
    id: string;
    type: string;
    attributes: WebhookSubscriber_Attributes;
}

export interface ResWebhookSubscribers_ListAll {
    data: WebhookSubscriber[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResWebhookSubscribers {
    data: WebhookSubscriber
}

// Wished Items
interface WishedItem_Attributes {
    quantity: number;
    created_at: string;
    updated_at: string;
    display_total: string;
    display_price: string;
    price: string;
    total: string;
}

interface WishedItem_Relationships {
    variant: {
        data: Type;
    };
}

interface WishedItem {
    id: string;
    type: string;
    attributes: WishedItem_Attributes;
    relationships: WishedItem_Relationships;
}

export interface ResWishedItems_ListAll {
    data: WishedItem[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResWishedItems {
    data: WishedItem
}

// Wishlists
interface Wishlist_Attributes {
    name: string;
    is_private: boolean;
    is_default: boolean;
    created_at: string;
    updated_at: string;
    token: string;
    variant_included: boolean;
}

interface Wishlist_Relationships {
    wished_items: {
        data: Type[];
    };
}

interface Wishlist {
    id: string;
    type: string;
    attributes: Wishlist_Attributes;
    relationships: Wishlist_Relationships;
}

export interface ResWishlists_ListAll {
    data: Wishlist[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResWishlists {
    data: Wishlist
}

// Zones
interface Zone_Attributes {
    name: string;
    description: string;
    default_tax: boolean;
    zone_members_count: number;
    created_at: string;
    updated_at: string;
    kind: string;
}

interface Zone_Relationships {
    zone_members: {
        data: Type[];
    };
}

interface Zone {
    id: string;
    type: string;
    attributes: Zone_Attributes;
    relationships: Zone_Relationships;
}

export interface ResZones_ListAll {
    data: Zone[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResZones {
    data: Zone
}