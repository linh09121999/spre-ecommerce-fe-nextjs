export interface User {
    email: string;
    first_name: string;
    last_name: string;
    selected_locale: string;
    password: string;
    password_confirmation: string;
    public_metadata: {
        user_segment: string
    };
    private_metadata: {
        has_abandoned_cart: boolean
    };
}

export interface UserUpdate {
    email: string;
    first_name: string;
    last_name: string;
    selected_locale: string;
    bill_address_id: string;
    ship_address_id: string;
    password: string;
    password_confirmation: string;
    phone?: string
}

export interface AddressInteface {
    firstname: string;
    lastname: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    phone: string;
    zipcode: string;
    state_name: string;
    country_iso: string;
    label: string;
}

export interface LineItemUpdate {
    line_item_id: string;
    quantity: number;
}

export interface LineItem {
    variant_id: string;
    quantity: number;
    public_metadata: {
        first_item_order: boolean
    };
    private_metadata: {
        recommended_by_us: boolean
    };
}

export interface Cart {
    public_metadata: {
        total_weight: number
    };
    private_metadata: {
        had_same_cart_items: boolean
    };
}

export interface AddressAttributes {
    firstname: string;
    lastname: string;
    address1: string;
    city: string;
    phone: string;
    zipcode: string;
    state_name: string;
    country_iso: string;
}

export interface Checkout {
    email: string;
    bill_address_attributes: AddressAttributes;
    ship_address_attributes: AddressAttributes;
}

export interface SourceAttributes {
    gateway_payment_profile_id: string;
    cc_type: string;
    last_digits: string;
    month: number;
    year: number;
    name: string;
}

export interface CheckoutPayment {
    payment_method_id: string;
    source_attributes: SourceAttributes;
}

export interface PaymentIntentUpdate {
    amount: number;
    stripe_payment_method_id: string;
}

export interface PaymentIntent extends PaymentIntentUpdate {
    off_session: boolean;
}

export interface PaymentSession {
    amount: number;
    channel: string;
    return_url: string;
}

export interface WishlistCreateUpdate {
    name: string;
}

export interface WishlistCreate extends WishlistCreateUpdate {
    is_private: boolean;
    is_default: boolean;
}

export interface WishedItemUpdate {
    quantity: number;
}

export interface WishedItemDelete {
    wished_items_ids: string[]
}

export interface WishedItem extends WishedItemUpdate {
    variant_id: string;
}