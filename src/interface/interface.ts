import { AccountOrder, AccountOrder_Include, Product, ResWishlists_ListAll, Wishlist } from "./responseData/interfaceStorefront";

export interface PaginationMeta {
    count: number;
    total_count: number;
    total_pages: number;
}

interface PaginationMetaProduct_OptionType_OptionValue {
    id: number;
    name: string;
    presentation: string;
    position: number;
}

export interface PaginationMetaProduct_OptionType {
    id: number;
    name: string;
    presentation: string;
    option_values: PaginationMetaProduct_OptionType_OptionValue[];
}

export interface PaginationLinks {
    self: string;
    next: string;
    prev: string;
    last: string;
    first: string;
}

export interface Type {
    id: string;
    type: string;
}

export interface Included {
    abbr: string;
    name: string;
}

export interface Time_Attributes {
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Pages {
    id: number;
    title: string;
    path: string
}

export interface Option {
    name: string;
    value: string;
    presentation: string;
}

interface VariantAttributes {
    sku: string;
    barcode: string | null;
    weight: string;
    height: number | null;
    width: number | null;
    depth: number | null;
    is_master: boolean;
    options_text: string;
    options: Option[];
    public_metadata: Record<string, unknown>;
    purchasable: boolean;
    in_stock: boolean;
    backorderable: boolean;
    currency: string;
    price: string | null;
    display_price: string | null;
    compare_at_price: string | null;
    display_compare_at_price: string | null;
}


interface Relationships {
    metafields: { data: unknown[] };
    product?: { data: Type };
    images: { data: Type[] };
    option_values?: { data: Type[] };
    parent?: { data: Type | null };
    taxonomy?: { data: Type };
    children?: { data: Type[] };
    image?: { data: Type | null };
}

export interface IncludedVariant extends Type {
    type: string;
    attributes: VariantAttributes;
    relationships: Relationships;
}

export interface IncludePayment {
    id: string;
    type: 'payment';
    attributes: {
        amount: string;
        response_code: string;
        number: string;
        cvv_response_code: string;
        cvv_response_message: string | null;
        payment_method_name: string;
        state: string;
        public_metadata: Record<string, unknown>;
        payment_method_id: string;
    };
    relationships: {
        metafields: { data: Type[] };
        source: { data: Type };
        payment_method: { data: Type };
    };
}

export interface IncludeShipment {
    id: string;
    type: 'shipment';
    attributes: {
        number: string;
        final_price: string;
        display_final_price: string;
        state: string;
        shipped_at: string | null;
        tracking_url: string | null;
        public_metadata: Record<string, unknown>;
        free: boolean;
    };
    relationships: {
        metafields: { data: Type[] };
        shipping_rates: { data: Type[] };
        selected_shipping_rate: { data: Type };
        stock_location: { data: Type };
        line_items: { data: Type[] };
        vendor: { data: Type | null };
    };
}

export interface IncludeUser {
    id: string;
    type: 'user';
    attributes: {
        email: string;
        first_name: string;
        last_name: string;
        selected_locale: string;
        public_metadata: Record<string, unknown>;
        tags: string[];
        store_credits: number;
        completed_orders: number;
        stripe_customer_id: string;
        phone: string;
    };
    relationships: {
        default_billing_address: { data: Type | null };
        default_shipping_address: { data: Type | null };
    };
}

export interface IncludeLineItem {
    id: string;
    type: 'line_item';
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
        compare_at_amount: string | number;
        display_compare_at_amount: string;
        public_metadata: Record<string, unknown>;
    };
    relationships: {
        metafields: { data: Type[] };
        variant: { data: Type };
        digital_links: { data: Type[] };
        vendor: { data: Type | null };
    };
}

export interface IncludedAddress {
    id: string;
    type: 'address';
    attributes: {
        firstname: string;
        lastname: string;
        address1: string;
        address2: string | null;
        city: string;
        zipcode: string;
        phone: string | null;
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
        metafields: { data: Type[] };
    };
}

interface OptionTypeAttributes {
    name: string;
    presentation: string;
    position: number;
    public_metadata: Record<string, unknown>;
}

export interface IncludedOptionType extends Type {
    type: string;
    attributes: OptionTypeAttributes;
    relationships: Relationships;
}

interface TaxonAttributes {
    name: string;
    pretty_name: string;
    permalink: string;
    seo_title: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string | null;
    left: number;
    right: number;
    position: number;
    depth: number;
    updated_at: string;
    public_metadata: Record<string, unknown>;
    description: string;
    has_products: boolean;
    header_url: string | null;
    is_root: boolean;
    is_child: boolean;
    is_leaf: boolean;
    localized_slugs: Record<string, string>;
}

export interface IncludedTaxon extends Type {
    type: string;
    attributes: TaxonAttributes;
    relationships: Relationships;
}

interface ImageStyle {
    url: string;
    size: string;
    width: number;
    height: number;
}

interface ImageAttributes {
    transformed_url: string | null;
    styles: ImageStyle[];
    position: number;
    alt: string | null;
    original_url: string;
}

export interface IncludedImage extends Type {
    attributes: ImageAttributes;
}

interface ProductPropertyAttributes {
    value: string;
    filter_param: string;
    show_property: boolean;
    position: number;
    name: string;
    description: string
}

export interface IncludedProductProperty extends Type {
    attributes: ProductPropertyAttributes
}

export type IncludedItem = IncludedVariant | IncludedOptionType | IncludedTaxon | IncludedImage | IncludedProductProperty;

export interface PriceInfo {
    price: number;
    comparePrice: number | null;
    discount: number;
}

export interface ColorOption {
    color: string;
    colorPresentation: string;
    variants: IncludedVariant[];
}

export interface ProductCardProps {
    products: Product[];
    included: IncludedItem[];
}

export interface FilterProduct {
    id: number;
    title: string
}

export interface FilterProductColor extends FilterProduct {
    color: string
}

export interface AuthLogin {
    grant_type: string,
    username: string,
    password: string
}

// export interface OrderTableData {
//     number: string;
//     total: string;
//     completed_at: string;
//     state: string;
//     payment_method_name: string;
//     shipment_state: string;
//     email: string;
//     address1: string;
//     city: string;
//     zipcode: string;
//     phone: string | null;
//     state_name: string;
//     country_name: string;
// }
export interface Checkout_Storefont_Prop {
    fnNextStep: () => void;
    fnBackStep: () => void;
    lengthStep: number
}

export interface ProcessedWishedItem {
    id: string;
    original_url: string;
    quantity: number;
    price: string;
    compare_at_price: string;
    display_price: string;
    product_name: string;
    options_text: string;
    slug: string;
    variantId: string
}