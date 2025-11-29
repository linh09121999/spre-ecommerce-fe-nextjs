export interface Address {
    country_id: string;
    state_id: string;
    state_name: string;
    address1: string;
    address2: string;
    city: string;
    zipcode: string;
    phone: string;
    firstname: string;
    lastname: string;
    label: string;
    company: string;
    user_id: string;
    public_metadata: {
        distance_from_nearest_city_in_km: number;
        location_type: string
    };
    private_metadata: {
        close_to_shop: boolean;
    }
}

export interface Adjustment {
    order_id: string;
    label: string;
    adjustable_id: string;
    adjustable_type: string;
    source_id: string;
    source_type: string;
    amount: number;
    mandatory: boolean;
    eligible: boolean;
    state: string;
    included: boolean;
}

export interface Classification {
    product_id: string;
    taxon_id: string;
    position: string
}

export interface DataFeed {
    name: string;
    slug: string;
    type: string;
    active: boolean
}

export interface DigitalLink {
    access_counter: number;
    line_item_id: string;
    digital_id: string
}

export interface LineItem {
    variant_id: string;
    quantity: number;
}

export interface LineItemPost extends LineItem {
    order_id: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface OptionType {
    name: string;
    presentation: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

interface AddressOrder extends Address {
    alternative_phone: string;
}

interface LineItemAttributes {
    line_item: LineItem;
}

interface AddressAttributes {
    address: AddressOrder;
}

export interface Order {
    item_total: number;
    total: number;
    state: string;
    adjustment_total: number;
    user_id: string;
    completed_at: string;
    bill_address_id: string;
    ship_address_id: string;
    payment_total: number;
    shipment_state: string;
    payment_state: string;
    email: string;
    special_instructions: string;
    currency: string;
    last_ip_address: string;
    created_by_id: string;
    shipment_total: number;
    additional_tax_total: number;
    promo_total: number;
    channel: string;
    included_tax_total: number;
    item_count: number;
    approver_id: string;
    approved_at: string;
    confirmation_delivered: boolean;
    considered_risky: boolean;
    canceled_at: string;
    canceler_id: string;
    taxable_adjustment_total: number;
    non_taxable_adjustment_total: number;
    store_owner_notification_delivered: boolean;
    bill_address_attributes: AddressAttributes;
    ship_address_attributes: AddressAttributes;
    line_items_attributes: LineItemAttributes[];
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface PaymentMethod {
    name: string;
    active: boolean;
    auto_capture: boolean;
    description: string;
    type: string;
    display_on: string;
    store_ids: string[];
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface Product {
    name: string;
    description: string;
    available_on: string;
    discontinue_on: string;
    permalink: string;
    meta_description: string;
    meta_keywords: string;
    price: string;
    sku: string;
    deleted_at: string;
    prototype_id: string;
    option_values_hash: string;
    weight: string;
    height: string;
    width: string;
    depth: string;
    shipping_category_id: string;
    tax_category_id: string;
    cost_currency: string;
    cost_price: string;
    compare_at_price: string;
    option_type_ids: string;
    taxon_ids: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface PromotionActionRuleUpdate {
    type: string;
}

export interface PromotionActionRule extends PromotionActionRuleUpdate {
    promotion_id: string
}

export interface PromotionCategory {
    name: string;
    code: string
}

export interface Promotion {
    name: string;
    code: string;
    description: string;
    usage_limit: number;
    advertise: boolean;
    starts_at: string;
    ends_at: string;
    store_ids: string[];
}

export interface Name {
    name: string
}

export interface Shipment {
    stock_location_id: string;
    order_id: string;
    variant_id: string;
    quantity: number;
}

export interface ShipmentUpdate {
    tracking: string
}

export interface ShipmentItem {
    variant_id: string;
    quantity: number;
}

export interface ShippingMethod {
    name: string;
    admin_name: string;
    code: string;
    tracking_url: string;
    display_on: string;
    tax_category_id: string;
    shipping_category_ids: string[];
    calculator_attributes: {
        type: string;
    };
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface StockItem {
    variant_id: string;
    stock_location_id: string;
    count_on_hand: number;
    backorderable: boolean;
}

export interface StockLocation {
    name: string;
    default: boolean;
    address1: string;
    address2: string;
    country_id: string;
    state_id: string;
    city: string;
    state_name: string;
    zipcode: string;
    phone: string;
    active: boolean;
    backorderable_default: boolean;
    propagate_all_variants: boolean;
    admin_name: string;
}

export interface StoreCreditType {
    name: string;
    priority: number;
}

export interface StoreCredit {
    user_id: string;
    category_id: string;
    created_by_id: string;
    amount: number;
    amount_used: number;
    memo: string;
    currency: string;
    amount_authorized: number;
    originator_id: string;
    originator_type: string;
    type_id: string;
    store_id: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface TaxCategory {
    name: string;
    is_default: boolean;
    tax_code: string;
    description: string;
}

export interface TaxRate {
    amount: number;
    zone_id: string;
    tax_category_id: string;
    included_in_price: boolean;
    name: string;
    show_rate_in_label: boolean;
    calculator_attributes: {
        type: string;
        preferences: {
            amount: number;
            currency: string;
        };
    };
}

export interface Taxonomy {
    name: string;
    position: number;
    public_metadata: {
        ability_to_recycle: string
    };
    private_metadata: {
        profitability: number
    }
}

export interface Taxon {
    taxonomy_id: string;
    parent_id: string;
    name: string;
    public_metadata: {
        ability_to_recycle?: string
    };
    private_metadata: {
        profitability?: number
    }
}

export interface TaxonReposition {
    new_parent_id: number;
    new_position_idx: number
}

export interface User {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
    selected_locale: string;
    ship_address_id: string;
    bill_address_id: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>
}

export interface Vendor {
    name: string;
    invitation_message: string;
    public_metadata: Record<string, any>;
    private_metadata: Record<string, any>;
    platform_fee: number;
    state: string;
    contact_person_email: string;
    contact_person_name: string;
    contact_person_phone: string;
}

export interface Subscriber {
    active: boolean;
    subscriptions: string[];
    url: string;
}

export interface WishedItem {
    wishlist_id: string;
    variant_id: string;
    quantity: number;
}

export interface Wishlist {
    name: string;
    user_id: string;
    is_default: boolean;
    is_private: boolean;
}

export interface Zone {
    name: string;
    description: string;
    default_tax: boolean;
    kind: string;
}