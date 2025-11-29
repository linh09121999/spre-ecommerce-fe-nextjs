import {
    Type,
    PaginationMeta,
    Included,
    PaginationLinks,
    PaginationMetaProduct_OptionType,
    IncludedItem,
    IncludedImage,
    IncludeLineItem,
    IncludedVariant,
    IncludePayment,
    IncludeShipment,
    IncludeUser,
    IncludedAddress
} from "../interface";

// Account
interface Account_Attributes {
    email: string;
    first_name: string;
    last_name: string;
    selected_locale: string;
    store_credits: number;
    completed_orders: number;
    tags: string[];
    public_metadata: {
        user_segment: string;
    };
    stripe_customer_id: string;
    phone: string
};


interface Account_Relationships {
    default_billing_address: {
        data: Type
    };
    default_shipping_address: {
        data: Type
    };
}

export interface IncludeAccount {
    id: string;
    type: string;
    attributes: {
        firstname: string;
        lastname: string;
        address1: string;
        address2: string | null;
        city: string;
        zipcode: string;
        phone: string;
        state_name: string;
        company: string | null;
        country_name: string;
        country_iso3: string;
        country_iso: string;
        label: string | null;
        public_metadata: Record<string, unknown>;
        state_code: string;
    };
    relationships: {
        metafields: {
            data: Type[];
        };
    };
}

export interface Account {
    id: string;
    type: string;
    attributes: Account_Attributes;
    relationships: Account_Relationships
}


export interface ResAccount {
    data: Account;
    included?: IncludeAccount[]
}

// Account / Address
export interface AccountAddress_Attributes {
    firstname: string;
    lastname: string;
    address1: string;
    address2: string | null;
    city: string;
    zipcode: string;
    phone: string;
    state_name: string;
    company: string | null;
    country_name: string;
    country_iso3: string;
    country_iso: string;
    label: string | null;
    state_code: string;
}

export interface AccountAddress {
    id: string;
    type: string;
    attributes: AccountAddress_Attributes;
}

export interface ResAccountAddress_ListAll {
    data: AccountAddress[];
    meta?: PaginationMeta;
    links?: PaginationLinks;
}

export interface ResAccountAddress {
    data: AccountAddress
}

// Account / Credit Cards
interface AccountCreditCard_Include_Attributes {
    type: string;
    name: string;
    description: string;
    preferences: Record<string, unknown>;
    public_metadata: Record<string, unknown>;
    publishable_key: string
}

interface AccountCreditCard_Include {
    id: string;
    type: string;
    attributes: AccountCreditCard_Include_Attributes;
}

interface AccountCreditCard_Attributes {
    cc_type: string;
    last_digits: string;
    month: number;
    year: number;
    name: string;
    gateway_payment_profile_id?: string;
    default: boolean;
}

interface AccountCreditCard_Relationships {
    payment_method: {
        data: Type
    };
}

interface AccountCreditCard {
    id: string;
    type: string;
    attributes: AccountCreditCard_Attributes;
    relationships: AccountCreditCard_Relationships;
}
export interface ResAccountCreditCard_ListAll {
    data: AccountCreditCard[];
    included: AccountCreditCard_Include[];
    meta?: PaginationMeta;
    links?: PaginationLinks;
}
export interface ResAccountCreditCard_Retrieve {
    data: AccountCreditCard;
    included: AccountCreditCard_Include[];
}

// Account / Orders

export interface AccountOrder_Attributes {
    number: string;
    item_total: string;
    total: string;
    ship_total: string;
    adjustment_total: string;
    created_at: string;
    updated_at: string;
    completed_at: string;                   // non-null when order is complete
    included_tax_total: string;
    additional_tax_total: string;
    display_additional_tax_total: string;
    display_included_tax_total: string;
    tax_total: string;
    currency: string;
    state: string;                          // e.g., "complete", "canceled", "returned", etc.
    token: string;
    email: string;
    display_item_total: string;
    display_ship_total: string;
    display_adjustment_total: string;
    display_tax_total: string;
    promo_total: string;
    display_promo_total: string;
    item_count: number;
    special_instructions: string | null;
    display_total: string;
    pre_tax_item_amount: string;
    display_pre_tax_item_amount: string;
    pre_tax_total: string;
    display_pre_tax_total: string;
    shipment_state: string | null;          // e.g., "ready", "shipped", "pending"
    payment_state: string;                  // e.g., "paid", "failed", "balance_due"
    public_metadata: Record<string, unknown>;
    total_minus_store_credits: string;
    display_total_minus_store_credits: string;
    subtotal_cents: number;
    ship_total_cents: number;
    store_credit_total_cents: number;
    promo_total_cents: number;
    tax_total_cents: number;
    total_cents: number;
    total_minus_store_credits_cents: number;
}

interface AccountOrder_Relationships {
    metafields: { data: Type[] };
    line_items: { data: Type[] };
    variants: { data: Type[] };
    promotions: { data: Type[] };
    payments: { data: Type[] };
    shipments: { data: Type[] };
    user: { data: Type | null };
    billing_address: { data: Type | null };
    shipping_address: { data: Type | null };
    gift_card: { data: Type | null };
    vendors: { data: Type[] };
    vendor: { data: Type | null }
}


export interface AccountOrder {
    id: string;
    type: string;
    attributes: AccountOrder_Attributes;
    relationships: AccountOrder_Relationships;
}

export type AccountOrder_Include = IncludeLineItem | IncludedVariant | IncludePayment | IncludeShipment | IncludeUser | IncludedAddress

export interface ResAccountOrder_ListAll {
    data: AccountOrder[];
    included: AccountOrder_Include[]
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResAccountOrder_Retrieve {
    data: AccountOrder
}

// Order Status
interface OrderStatus_Attributes {
    number: string;
    item_total: string;
    total: string;
    subtotal_cents: number;
    store_credit_total_cents: number;
    total_cents: number;
    total_minus_store_credits: string;
    total_minus_store_credits_cents: number;
    ship_total: string;
    ship_total_cents: number;
    adjustment_total: string;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
    included_tax_total: string;
    additional_tax_total: string;
    display_additional_tax_total: string;
    display_included_tax_total: string;
    tax_total: string;
    tax_total_cents: number;
    currency: string;
    state: string;
    token: string;
    email: string | null;
    display_item_total: string;
    display_ship_total: string;
    display_adjustment_total: string;
    display_tax_total: string;
    promo_total: string;
    display_promo_total: string;
    promo_total_cents: number;
    item_count: number;
    special_instructions: string | null;
    display_total: string;
    display_total_minus_store_credits: string;
    pre_tax_item_amount: string;
    display_pre_tax_item_amount: string;
    pre_tax_total: string;
    display_pre_tax_total: string;
    shipment_state: string | null;
    payment_state: string | null;
}

interface OrderStatus {
    id: string;
    type: string;
    attributes: OrderStatus_Attributes;
    relationships: AccountOrder_Relationships;
}

export interface ResOrderStatus {
    data: OrderStatus;
}

// Cart
interface Cart_Attributes {
    number: string;
    item_total: string;
    total: string;
    subtotal_cents: number;
    store_credit_total_cents: number;
    total_cents: number;
    total_minus_store_credits: string;
    total_minus_store_credits_cents: number;
    ship_total: string;
    ship_total_cents: number;
    adjustment_total: string;
    created_at: string;
    updated_at: string;
    completed_at: string | null;
    included_tax_total: string;
    additional_tax_total: string;
    display_additional_tax_total: string;
    display_included_tax_total: string;
    tax_total: string;
    tax_total_cents: number;
    currency: string;
    state: string;
    token: string;
    email: string | null;
    display_item_total: string;
    display_ship_total: string;
    display_adjustment_total: string;
    display_tax_total: string;
    promo_total: string;
    display_promo_total: string;
    promo_total_cents: number;
    item_count: number;
    special_instructions: string | null;
    display_total: string;
    display_total_minus_store_credits: string;
    pre_tax_item_amount: string;
    display_pre_tax_item_amount: string;
    pre_tax_total: string;
    display_pre_tax_total: string;
    shipment_state: string | null;
    payment_state: string | null;
}


interface Cart {
    id: string;
    type: string;
    attributes: Cart_Attributes;
    relationships: AccountOrder_Relationships;
}

export interface ResCart {
    data: Cart;
    included: (IncludeLineItem | IncludedImage | IncludedVariant | Product)[]
}

// Cart / Other

interface CartOther_Attributes {
    name: string;
    selected: boolean;
    cost: string;
    tax_amount: string;
    final_price: string;
    shipping_method_id: string;
    display_cost: string;
    display_final_price: string;
    display_tax_amount: string;
    free: boolean;
}

interface CartOther_Relationships {
    shipping_method: {
        data: Type;
    };
}

interface CartOther {
    id: string | null;
    type: string;
    attributes: CartOther_Attributes;
    relationships: CartOther_Relationships;
}

export interface ResCartOther_List {
    data: CartOther[];
}

export interface ResCartOther {
    data: CartOther
}

// checkout
export interface IncludedCheckoutLineItem {
    id: string;
    type: string;
    attributes: {
        name: string;
        quantity: number;
        price: string;
        slug: string;
        options_text: string;
        currency: string;
        display_price: string;
        total: string;
        display_total: string;
        adjustment_total: string;
        display_adjustment_total: string;
        additional_tax_total: string;
        discounted_amount: string;
        display_discounted_amount: string;
        display_additional_tax_total: string;
        promo_total: string;
        display_promo_total: string;
        included_tax_total: string;
        display_included_tax_total: string;
        pre_tax_amount: string;
        display_pre_tax_amount: string;
        compare_at_amount: string;
        display_compare_at_amount: string;
        public_metadata: {
            first_item_order: boolean;
        };
    };
    relationships: {
        metafields: {
            data: Type[];
        };
        variant: {
            data: Type;
        };
        digital_links: {
            data: Type[];
        };
        vendor: {
            data: Type | null;
        };
    };
}

export interface Checkout {
    id: string;
    type: 'cart';
    attributes: {
        number: string;
        item_total: string;
        total: string;
        ship_total: string;
        adjustment_total: string;
        created_at: string;
        updated_at: string;
        completed_at: string | null;
        included_tax_total: string;
        additional_tax_total: string;
        display_additional_tax_total: string;
        display_included_tax_total: string;
        tax_total: string;
        currency: string;
        state: string;
        token: string;
        email: string;
        display_item_total: string;
        display_ship_total: string;
        display_adjustment_total: string;
        display_tax_total: string;
        promo_total: string;
        display_promo_total: string;
        item_count: number;
        special_instructions: string | null;
        display_total: string;
        pre_tax_item_amount: string;
        display_pre_tax_item_amount: string;
        pre_tax_total: string;
        display_pre_tax_total: string;
        shipment_state: string | null;
        payment_state: string;
        public_metadata: {
            total_weight: number;
        };
        total_minus_store_credits: string;
        display_total_minus_store_credits: string;
        subtotal_cents: number;
        ship_total_cents: number;
        store_credit_total_cents: number;
        promo_total_cents: number;
        tax_total_cents: number;
        total_cents: number;
        total_minus_store_credits_cents: number;
    };
    relationships: {
        metafields: {
            data: Type[];
        };
        line_items: {
            data: Type[];
        };
        variants: {
            data: Type[];
        };
        promotions: {
            data: Type[];
        };
        payments: {
            data: Type[];
        };
        shipments: {
            data: Type[];
        };
        user: {
            data: Type | null;
        };
        billing_address: {
            data: Type;
        };
        shipping_address: {
            data: Type;
        };
        gift_card: {
            data: Type | null;
        };
        vendors: {
            data: Type[];
        };
    };
}

export interface CheckoutIncludedShippingAddress {
    id: string;
    type: 'address';
    attributes: {
        firstname: string;
        lastname: string;
        address1: string;
        address2: string | null;
        city: string;
        zipcode: string;
        phone: string;
        state_name: string;
        company: string | null;
        country_name: string;
        country_iso3: string;
        country_iso: string;
        label: string | null;
        public_metadata: Record<string, unknown>;
        state_code: string;
    };
    relationships: {
        metafields: {
            data: Type[];
        };
    };
}


export interface ResCheckout {
    data: Checkout
    included: (IncludedCheckoutLineItem | CheckoutIncludedShippingAddress | IncludedImage | IncludedVariant | Product)[];
    meta: {
        messages: string[];
    };
}

// Checkout / Shipments

interface CheckoutShipments_Include_Rate_Attributes {
    name: string;
    selected: boolean;
    final_price: string;
    display_final_price: string;
    cost: string;
    display_cost: string;
    tax_amount: string;
    display_tax_amount: string;
    shipping_method_id: string;
    free: boolean;
    final_price_cents: number;
    delivery_range: string;
    display_delivery_range: string
}

interface CheckoutShipments_Include_Rate_Relationships {
    shipping_method: {
        data: Type;
    };
}

export interface CheckoutShipments_Include_Rate {
    id: string;
    type: string;
    attributes: CheckoutShipments_Include_Rate_Attributes;
    relationships: CheckoutShipments_Include_Rate_Relationships;
}

interface CheckoutShipments_Include_Location_Attributes {
    name: string;
}

interface CheckoutShipments_Include_Location {
    id: string;
    type: string;
    attributes: CheckoutShipments_Include_Location_Attributes;
}

interface CheckoutShipments_Attributes {
    number: string;
    final_price: string;
    display_final_price: string;
    state: string;
    shipped_at: string | null;
    tracking_url: string | null;
    free: boolean;
}

interface CheckoutShipments_ShipmentRelationships {
    shipping_rates: {
        data: Type[];
    };
    stock_location: {
        data: Type;
    };
}

interface CheckoutShipments {
    id: string;
    type: string;
    attributes: CheckoutShipments_Attributes;
    relationships: CheckoutShipments_ShipmentRelationships;
}

export interface ResCheckoutShipments {
    data: CheckoutShipments[];
    included: (CheckoutShipments_Include_Rate | CheckoutShipments_Include_Location)[];
}

// Checkout / Payments
interface CheckoutPayments_Attributes {
    type: string;
    name: string;
    description: string;
    preferences: Record<string, unknown>;
    publishable_key: string
}

interface CheckoutPayments {
    id: string;
    type: string;
    attributes: CheckoutPayments_Attributes;
}

export interface ResCheckoutPayments_ListAll {
    data: CheckoutPayments[];
}

export interface ResCheckoutPayments {
    data: CheckoutPayments
}

// Stripe
interface Stripe_Attributes {
    stripe_id: string;
    client_secret: string;
    ephemeral_key_secret: string;
    customer_id: string;
    amount: string;
    stripe_payment_method_id: string;
}

interface Stripe {
    id: string;
    type: string;
    attributes: Stripe_Attributes;
}

export interface ResStripe {
    data: Stripe;
}

export interface ResStripe_CreateSetupIntent {
    customer_id: string;
    ephemeral_key_secret: string;
    setup_intent_client_secret: string;
}

// Adyen
interface Adyen_Attributes {
    adyen_id: string;
    amount: string;
    currency: string;
    channel: string;
    adyen_data: string;
    client_key: string;
    status: string;
    expires_at: string;
    return_url: string;
}

interface Adyen_Relationships {
    order: {
        data: Type;
    };
    payment_method: {
        data: Type;
    };
    user: {
        data: Type | null;
    };
}

interface Adyen {
    id: string;
    type: string;
    attributes: Adyen_Attributes;
    relationships: Adyen_Relationships;
}

export interface ResAdyen {
    data: Adyen;
}

// Products
interface Product_Attributes {
    name: string;
    description: string;
    available_on: string;
    slug: string;
    meta_description: string | null;
    meta_keywords: string | null;
    updated_at: string;
    sku: string;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    available: boolean;
    currency: string;
    price: string;
    display_price: string;
    compare_at_price: string | null;
    display_compare_at_price: string | null;
    localized_slugs: {
        de: string;
        en: string
    };
    tags: Record<string, any>[];
    labels: Record<string, any>[];
}

interface Product_Relationships {
    variants: {
        data: Type[]
    };
    option_types: {
        data: Type[]
    };
    product_properties: {
        data: Type[]
    };
    taxons: {
        data: Type[]
    };
    images: {
        data: Type[] // Empty array in the example
    };
    default_variant: {
        data: Type
    };
    primary_variant: {
        data: Type
    };
}

interface PaginationMetaProduct_ProductPropertiesr_Value {
    value: string;
    filter_param: string;
}

interface PaginationMetaProduct_ProductPropertiesr {
    id: number;
    name: string;
    presentation: string;
    values: PaginationMetaProduct_ProductPropertiesr_Value[]
}


interface PaginationMetaProduct extends PaginationMeta {
    filters: {
        option_types: PaginationMetaProduct_OptionType[];
        product_properties: PaginationMetaProduct_ProductPropertiesr[];
    };
}

export interface Product {
    id: string;
    type: string;
    attributes: Product_Attributes;
    relationships: Product_Relationships;

}

export interface ResProduct_ListAll {
    data: Product[];
    included: IncludedItem[];
    // include: IncludedImage[]
    meta: PaginationMetaProduct;
    links: PaginationLinks
}

export interface ResProduct_Retrieve {
    data: Product | undefined;
    included: IncludedItem[];
}

// Vendors
interface Vendor_Attributes {
    name: string;
    email: string;
    slug: string;
    about_us: string;
    logo_url: string;
    cover_photo_url: string;
}

interface Vendor {
    id: string;
    type: string;
    attributes: Vendor_Attributes;
}

export interface ResVendors_ListAll {
    data: Vendor[];
}

export interface ResVendors_Retrieve {
    data: Vendor
}

// Stores
interface Store_Attributes {
    logo: string;
    mailer_logo: string | null;
    name: string;
    url: string;
    meta_description: string;
    meta_keywords: string;
    seo_title: string;
    default_currency: string;
    default: boolean;
    supported_currencies: string;
    facebook: string;
    twitter: string;
    instagram: string;
    default_locale: string;
    customer_support_email: string;
    description: string;
    address: string;
    contact_phone: string;
    supported_locales: string;
    favicon_path: string | null;
}


interface Store_Relationships {
    default_country: {
        data: Type;
    };
}

interface Store {
    id: string;
    type: string;
    attributes: Store_Attributes;
    relationships: Store_Relationships;
}

export interface ResStore {
    data: Store;
}

// Policies
interface Policy_Attributes {
    name: string;
    slug: string;
    created_at: string; // ISO 8601 date-time string
    updated_at: string; // ISO 8601 date-time string
    body: string;
    body_html: string;
}

interface Policy {
    id: string;
    type: string;
    attributes: Policy_Attributes;
}

export interface ResPolicies_ListAll {
    data: Policy[];
}

export interface ResPolicies_Retrieve {
    data: Policy
}

// posts
interface Post_Attributes {
    title: string;
    slug: string;
    published_at: string; // ISO 8601 date-time string
    meta_title: string;
    meta_description: string;
    created_at: string; // ISO 8601 date-time string
    updated_at: string; // ISO 8601 date-time string
    excerpt: string | null;
    content: string;
    content_html: string;
    description: string;
    shortened_description: string;
    author_name: string;
    post_category_title: string;
    tags: string[];
    image_url: string | null;
}


interface Post_Relationships {
    post_category: {
        data: Type;
    };
}

interface Post {
    id: string;
    type: string;
    attributes: Post_Attributes;
    relationships: Post_Relationships;
}

export interface ResPosts_ListAll {
    data: Post[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPosts_Retrieve {
    data: Post
}

// Post Categories
interface PostCategory_Attributes {
    title: string;
    slug: string;
    created_at: string; // ISO 8601 date-time string
    updated_at: string; // ISO 8601 date-time string
    description: string | null;
}

interface PostCategory_Relationships {
    metafields?: {
        data: Type[];
    };
    posts?: {
        data: Type[]
    }
}

interface PostCategory {
    id: string;
    type: string;
    attributes: PostCategory_Attributes;
    relationships: PostCategory_Relationships;
}

export interface ResPostCategories_ListAll {
    data: PostCategory[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResPostCategories_Retrieve {
    data: PostCategory
}

// Taxons
interface Taxon_Attributes {
    name: string;
    pretty_name: string;
    permalink: string;
    seo_title: string;
    description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    meta_keywords: string | null;
    left: number;
    right: number;
    position: number;
    depth: number;
    updated_at: string; // ISO 8601 date-time string
    public_metadata?: Record<string, any>;
    has_products?: boolean;
    header_url?: string;
    is_root: boolean;
    is_child: boolean;
    is_leaf: boolean;
    localized_slugs?: {
        de: string;
        en: string
    }
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

export interface ResTaxons_Retrieve {
    data: Taxon
}

// Countries
interface Country_Attributes {
    iso: string;
    iso3: string;
    iso_name: string;
    name: string;
    states_required: boolean;
    zipcode_required: boolean;
    default: boolean;
}

interface Country_Relationships {
    checkout_zone_applicable_states: {
        data: Type[];
    };
}

export interface Country {
    id: string;
    type: string;
    attributes: Country_Attributes;
    relationships: Country_Relationships
}

export interface CountryInclude {
    id: string;
    type: string;
    attributes: {
        abbr: string;
        name: string
    }
}

export interface ResCountries_ListAll {
    data: Country[];
    included: CountryInclude[];
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResCountries_Retrieve {
    data: Country;
    included: CountryInclude[];
}

interface CountryDefault_Attributes {
    iso: string;
    iso3: string;
    iso_name: string;
    name: string;
    states_required: boolean;
    zipcode_required: boolean;
    default: boolean;
}

interface CountryDefault_Relationships {
    states: {
        data: Included[]
    };
}

interface CountryDefault {
    id: string;
    type: string;
    attributes: CountryDefault_Attributes;
    relationships: CountryDefault_Relationships
    included: Included[]
}

export interface ResCountryDefault {
    data: CountryDefault
}

// Wishlists
interface Wishlist_Attributes {
    token: string;
    name: string;
    is_private: boolean;
    is_default: boolean;
    variant_included: boolean;
}

interface Wishlist_Relationships {
    wished_items: {
        data: Type[]
    };
}

export interface Wishlist {
    id: string;
    type: string;
    attributes: Wishlist_Attributes;
    relationships: Wishlist_Relationships
}

export interface WishListItem {
    id: string;
    type: string;
    attributes: {
        quantity: number;
        price: string;
        total: string;
        display_price: string;
        display_total: string;
    };
    relationships: {
        variant: {
            data: Type;
        };
    };
}

export interface ResWishlists_ListAll {
    data: Wishlist[];
    included: WishListItem[]
    meta: PaginationMeta;
    links: PaginationLinks;
}

export interface ResWishlists {
    data: Wishlist;
    included: (WishListItem | IncludedImage | IncludedVariant | Product)[]
}

// Wishlists / Wished Items
interface ResWishlistsWishedItems_Attributes {
    quantity: number;
    price: string;
    total: string;
    display_price: string;
    display_total: string;
}

interface ResWishlistsWishedItems_Relationships {
    variant: {
        data: Type;
    };
}

interface WishlistsWishedItems {
    id: string;
    type: Type;
    attributes: ResWishlistsWishedItems_Attributes;
    relationships: ResWishlistsWishedItems_Relationships;
}

export interface ResWishlistsWishedItems {
    data: WishlistsWishedItems
}

// variant

interface VariantOption {
    name: string;
    value: string;
    presentation: string;
}

export interface Variant {
    id: string;
    type: string;
    attributes: {
        sku: string;
        barcode: string | null;
        weight: string;
        height: string | null;
        width: string | null;
        depth: string | null;
        is_master: boolean;
        options_text: string;
        options: VariantOption[];
        public_metadata: Record<string, unknown>;
        purchasable: boolean;
        in_stock: boolean;
        backorderable: boolean;
        currency: string;

        // These fields can be null when the variant is not purchasable / out of stock
        price: string | null;
        display_price: string | null;
        compare_at_price: string | null;
        display_compare_at_price: string | null;
    };
    relationships: {
        metafields: { data: any[] };
        product: { data: Type };
        images: { data: Type[] };
        option_values: { data: Type[] };
    };
}

export interface ResVariant {
    data: Variant[]
    included: IncludedImage[]
}