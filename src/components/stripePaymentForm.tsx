"use client"
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';
import { MdOutlineErrorOutline } from 'react-icons/md';

// Component form thanh toán với Stripe
const StripePaymentForm = ({
    onSubmit,
    loading,
    error,
    publishableKey
}: {
    onSubmit: (paymentMethodId: string, cardData: any) => void;
    loading: boolean;
    error: string;
    publishableKey: string;
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardholderName, setCardholderName] = useState('');
    const [cardComplete, setCardComplete] = useState({
        cardNumber: false,
        cardExpiry: false,
        cardCvc: false
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardNumber = elements.getElement(CardNumberElement);
        if (!cardNumber) {
            return;
        }

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber,
                billing_details: {
                    name: cardholderName,
                },
            });

            if (error) {
                setErrorCreate(error.message || 'An error occurred')
                return;
            }

            if (paymentMethod) {
                // Lấy thông tin thẻ từ paymentMethod
                const cardData = {
                    gateway_payment_profile_id: paymentMethod.id,
                    cc_type: paymentMethod.card?.brand || '',
                    last_digits: paymentMethod.card?.last4 || '',
                    month: paymentMethod.card?.exp_month || 0,
                    year: paymentMethod.card?.exp_year || 0,
                    name: cardholderName
                };

                onSubmit(paymentMethod.id, cardData);
            }
            setErrorCreate("")
        } catch (err: any) {
            setErrorCreate(err.message || 'An error occurred')
        }
    };

    const stripeElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px 12px',
            },
        },
    };

    const isFormComplete = cardComplete.cardNumber &&
        cardComplete.cardExpiry &&
        cardComplete.cardCvc &&
        cardholderName.trim() !== '';

    const [errorCreate, setErrorCreate] = useState<string>("")

    return (
        <>
            {errorCreate &&
                <div className="p-4 text-center mt-5 bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                    <MdOutlineErrorOutline className="mx-auto" size={21} />{errorCreate}</div>
            }
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
                <div className="flex flex-col gap-1">
                    <label className="block text-md font-medium text-gray-700">
                        Cardholder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Full name on card"
                        className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="block text-md font-medium text-gray-700">
                        Card Number <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-green-500">
                        <CardNumberElement
                            options={stripeElementOptions}
                            onChange={(e) => setCardComplete(prev => ({ ...prev, cardNumber: e.complete }))}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="block text-md font-medium text-gray-700">
                            Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-green-500">
                            <CardExpiryElement
                                options={stripeElementOptions}
                                onChange={(e) => setCardComplete(prev => ({ ...prev, cardExpiry: e.complete }))}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="block text-md font-medium text-gray-700">
                            CVC <span className="text-red-500">*</span>
                        </label>
                        <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-green-500">
                            <CardCvcElement
                                options={stripeElementOptions}
                                onChange={(e) => setCardComplete(prev => ({ ...prev, cardCvc: e.complete }))}
                            />
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 text-center bg-red-50 border border-red-200 rounded-xl text-red-600">
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={!stripe || loading || !isFormComplete}
                    className="h-[50px] w-fit px-10 ml-auto rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 font-bold text-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                    <span className="relative z-10">
                        {loading ? 'Processing...' : 'Add Credit Card'}
                    </span>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                </button>
            </form>
        </>
    );
};

export default StripePaymentForm