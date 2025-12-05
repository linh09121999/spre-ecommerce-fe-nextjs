"use client"
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { useState_ResCheckout } from "@/useState/useStatestorefront";
import { Badge, Box, FormHelperText, Step, StepConnector, stepConnectorClasses, StepIconProps, StepLabel, Stepper, TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import React, { useState, useEffect, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MdOutlineErrorOutline, MdOutlineShoppingCart } from "react-icons/md";
import { ListAllCountries } from "@/service/storefront/countries";
import { useState_ResCountries } from "@/useState/useStatestorefront";
import { CheckoutIncludedShippingAddress, IncludedCheckoutLineItem } from "@/interface/responseData/interfaceStorefront";
import { ValidateOrderPayment } from "@/service/storefront/checkout";
// import { NextCheckoutStep } from "@/service/storefront/checkoutState";
import { ApplyACouponCode } from "@/service/storefront/cartCoupons";
import CheckOutAddress from "@/components/checkOutAddress";
import CheckoutDelivery from "@/components/checkoutDelivery";
import CheckoutPaymetPage from "@/components/checkoutPayment";
import { IncludedImage, IncludedVariant, ProcessedWishedItem } from "@/interface/interface";
import { LuMapPinHouse } from "react-icons/lu";
import { FaRegMoneyBillAlt, FaShippingFast } from "react-icons/fa";
import { styled } from '@mui/material/styles';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,var(--color-green-500) 0%,var(--color-emerald-600) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,var(--color-green-500) 0%,var(--color-emerald-600) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 45,
    height: 45,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, var(--color-green-500) 0%,var(--color-emerald-600) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, var(--color-green-500) 0%,var(--color-emerald-600) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <MdOutlineShoppingCart />,
        2: <LuMapPinHouse />,
        3: <FaShippingFast />,
        4: <FaRegMoneyBillAlt />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const CheckoutFrom: React.FC = () => {
    const router = useRouter()
    const sxStep: SxProps<Theme> = {
        py: '20px',
        mx: 'auto',
        maxWidth: '1200px',
        '& .MuiStepLabel-root': {
            flexDirection: 'column'
        },
        '& .MuiSvgIcon-root': {
            height: '2rem',
            width: '2rem',
            fontSize: 'var(--text-md) !important',
            '&.Mui-active': {
                color: 'white',
                "&.MuiSvgIcon-root circle": {
                    fill: "var(--color-green-600)", // màu nền xanh
                },
            },
            '&.Mui-completed': {
                color: 'var(--color-green-600)'
            }
        },
        '& .MuiStepLabel-label': {
            marginTop: '6px'
        }
    }

    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "var(--radius-xl)",
            background: "var(--color-white)",
            height: '45px',
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-md)',
            border: '1px solid var(--color-gray-200)',
        },

        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
        },

        '&:hover .MuiOutlinedInput-notchedOutline': {
            outline: 'none',
            border: 'none'
        },

        '& .MuiOutlinedInput-input': {
            padding: 0
        },

        '& .MuiInputBase-input': {
            color: 'black',
            fontSize: 'var(--text-lg)',
            border: 'none',
        },
    }

    const sxBadge: SxProps<Theme> = {
        "& .MuiBadge-badge": {
            background: 'var(--color-green-700)',
            color: "white",
            fontWeight: 'bold',
            fontSize: 'var(--text-sm)',
        }
    }

    const steps = ["Cart", 'Address', 'Delivery', 'Payment'];

    const {
        activeStep, setActiveStep, valueShippingFee,
        setLoading, setSelectNav } = useStateGeneral()
    // const [activeStep, setActiveStep] = useState(1);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep > 1) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        } else {
            router.push('/cart')
        }
    };

    const { resCheckout, setResCheckout } = useState_ResCheckout()

    const { setResCountries_List } = useState_ResCountries()

    const getApiListCountries = async () => {
        try {
            setLoading(true)
            const response = await ListAllCountries();
            setResCountries_List(response.data)
        } catch (error: any) {
            toast.error(`List contries: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const [errorValidate, setErrorValidate] = useState<string>("")

    const handleValidateOrderPayment = async (include: string) => {
        try {
            setLoading(true);
            const res = await ValidateOrderPayment({ include })
            setResCheckout(res.data)
            setErrorValidate("")
        } catch (error: any) {
            const errRes = error.response;
            setErrorValidate(errRes?.data?.error)
            if (errRes?.data?.data) {
                setResCheckout(errRes.data);   // 👉 lấy data trong lỗi
            }
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    useEffect(() => {
        setSelectNav(null)
        setActiveStep(1)
        const cart_number = localStorage.getItem("cart_number")
        if (Number(cart_number) === 0) {
            router.push('/')
        }
        const token = localStorage.getItem('token')
        if (token) {
            setResCountries_List(undefined)
        } else {
            getApiListCountries()
        }
        handleValidateOrderPayment("line_items,line_items.variant,line_items.variant.images,shipping_address")
    }, [])

    const filterAddressCheckout = useMemo(
        () =>
            resCheckout?.included?.filter(
                (r): r is CheckoutIncludedShippingAddress => r.type === "address"
            ) ?? [],
        [resCheckout]
    );

    const itemsWithImages = useMemo((): ProcessedWishedItem[] => {
        if (!resCheckout?.included || !resCheckout.data?.relationships?.line_items?.data) {
            return [];
        }

        const items: ProcessedWishedItem[] = [];

        const lineItems = resCheckout.included.filter(
            (item): item is IncludedCheckoutLineItem => item.type === 'line_item'
        );

        const variants = resCheckout.included.filter(
            (item): item is IncludedVariant => item.type === 'variant'
        );

        const images = resCheckout.included.filter(
            (item): item is IncludedImage => item.type === 'image'
        );

        lineItems.forEach((lineItem) => {
            // Tìm variant tương ứng với line item
            const variantId = lineItem.relationships.variant.data.id;
            const variant = variants.find(v => v.id === variantId);

            if (variant) {
                // Tìm images cho variant này
                const variantImages = variant.relationships.images.data.map(imgRef =>
                    images.find(img => img.id === imgRef.id)
                ).filter(Boolean) as IncludedImage[];

                // Lấy original_url từ image đầu tiên (nếu có)
                const originalUrl = variantImages.length > 0
                    ? variantImages[0].attributes.original_url
                    : '';

                items.push({
                    id: lineItem.id,
                    variantId: variant.id,
                    original_url: originalUrl,
                    quantity: lineItem.attributes.quantity,
                    price: lineItem.attributes.price,
                    compare_at_price: variant.attributes.compare_at_price || "",
                    product_name: lineItem.attributes.name || "",
                    options_text: lineItem.attributes.options_text,
                    slug: lineItem.attributes.slug,
                    display_price: lineItem.attributes.display_price,
                });
            }
        });

        return items;

    }, [resCheckout])
    const [promoCode, setPromoCode] = useState<string>("")
    const [errorPromoCode, setErrorPromoCode] = useState<string>("")

    const setApiApplyACouponCode = async (coupon_code: string) => {
        const data = {
            coupon_code: coupon_code
        }
        try {
            setLoading(true)
            const response = await ApplyACouponCode(data);
            handleValidateOrderPayment("line_items,line_items.variant,line_items.variant.images,shipping_address")
            setErrorPromoCode("")
        } catch (error: any) {
            setErrorPromoCode(error.response.data.error || "Invalid coupon code")
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleApplyCouponCode = () => {
        if (!promoCode.trim()) {
            setErrorPromoCode("Please enter a promo code");
            return;
        }
        setApiApplyACouponCode(promoCode)
    }

    const apiNextCheckoutStep = () => {
        handleValidateOrderPayment("line_items,line_items.variant,line_items.variant.images,shipping_address")
        handleNext()
    }

    // const apiNextCheckoutStep = async (include: string) => {
    //     try {
    //         setLoading(true)
    //         const res = await NextCheckoutStep({ include });
    //         setResCheckout(res.data)
    //         handleNext()
    //         handleValidateOrderPayment("line_items,line_items.variant,line_items.variant.images,shipping_address")
    //     } catch (error: any) {
    //         toast.error(`Next checkout: ` + error.response.data.error)
    //         throw error;
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper alternativeLabel activeStep={activeStep} sx={sxStep} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <div className="md:p-5 px-5 pb-5 max-w-[1535px] mx-auto flex flex-col md:gap-10 gap-5">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] md:gap-10 gap-5">
                        {activeStep === 1 &&
                            <CheckOutAddress
                                fnBackStep={() => handleBack()}
                                fnNextStep={() => {
                                    apiNextCheckoutStep()
                                    // apiNextCheckoutStep("line_items,line_items.variant,line_items.variant.images,shipping_address")
                                }}
                                lengthStep={steps.length}
                            />
                        }
                        {activeStep === 2 &&
                            <CheckoutDelivery
                                fnBackStep={() => handleBack()}
                                fnNextStep={() => {
                                    apiNextCheckoutStep()
                                    // apiNextCheckoutStep("line_items,line_items.variant,line_items.variant.images,shipping_address")
                                }}
                                lengthStep={steps.length}
                            />
                        }
                        {activeStep === 3 &&
                            <CheckoutPaymetPage
                                fnBackStep={() => handleBack()}
                                fnNextStep={() => {
                                    apiNextCheckoutStep()
                                    // handleNext()
                                    // handleValidateOrderPayment("line_items,line_items.variant,line_items.variant.images,shipping_address")
                                }}
                                lengthStep={steps.length}
                            />
                        }

                        {activeStep === 4 &&
                            <div className="flex flex-col gap-5 items-center order-2 lg:order-1">
                                <img src="../../success.png" alt="success" className="h-30 w-30" />
                                <p className="text-xl text-green-500">Thanks {filterAddressCheckout.length > 0 && filterAddressCheckout[0].attributes.firstname} for your order!</p>
                                <div className="rounded-xl shadow-lg p-5 flex flex-col gap-3">
                                    <div className="flex gap-5">
                                        <p className="min-w-[120px]">Order :</p>
                                        <span>{resCheckout?.data.attributes.number}</span>
                                    </div>
                                    <div className="flex gap-5">
                                        <p className="min-w-[120px]">Email :</p>
                                        <span>{resCheckout?.data.attributes.email}</span>
                                    </div>
                                    <div className="flex gap-5">
                                        <p className="min-w-[120px]">Address :</p>
                                        {filterAddressCheckout.length > 0 &&
                                            <>
                                                {filterAddressCheckout?.map((res) =>
                                                    <div key={res.id} className="flex flex-wrap gap-1">
                                                        <span>{res.attributes.firstname}</span>
                                                        <span>{res.attributes.lastname}</span>
                                                        <span>{res.attributes.label},</span>
                                                        <span>{res.attributes.address1},</span>
                                                        <span>{res.attributes.city},</span>
                                                        <span>{res.attributes.state_name}</span>
                                                        <span>{res.attributes.state_code},</span>
                                                        <span>{res.attributes.country_name}</span>
                                                    </div>
                                                )}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        <aside className="order-1 lg:order-2 flex flex-col w-full gap-10 self-start flex-1 p-5 bg-gray-100 rounded-xl h-full">
                            {errorValidate &&
                                <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                    <MdOutlineErrorOutline className="mx-auto" size={21} />{errorValidate}</div>
                            }
                            <div className="flex flex-col gap-5">
                                {itemsWithImages && itemsWithImages?.map((res) => (
                                    <div key={res?.id}>
                                        <div className="sm:flex gap-5 items-center sm:flex-row sm:justify-between pb-4 border-b border-gray-300 transition-colors rounded-lg">
                                            <div className="flex gap-10 items-center">
                                                <Badge badgeContent={res?.quantity} sx={sxBadge}>
                                                    <div className="relative overflow-hidden rounded-2xl ">
                                                        <img src={res.original_url} alt={res?.product_name} className="w-[100px] aspect-[1/1] object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                                    </div>
                                                </Badge>
                                                <div className="flex flex-col gap-2">
                                                    <h3 className="text-lg font-semibold text-gray-900 ">{res?.product_name}</h3>

                                                    {res?.options_text && <p className="text-gray-600 text-sm">
                                                        {res?.options_text}
                                                    </p>}
                                                    <div className="max-sm:hidden">{res?.display_price}</div>
                                                    <div className="sm:hidden flex gap-3 items-center">
                                                        <p className="text-sm text-gray-500">Total:</p>
                                                        <div className="text-xl font-bold text-green-700">${parseFloat(res?.price) * res.quantity}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="max-sm:hidden">
                                                <p className="text-end text-sm text-gray-500">Total</p>
                                                <div className="text-xl font-bold text-green-700">${parseFloat(res?.price) * res.quantity}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-3 items-center">
                                    <TextField
                                        type="text"
                                        required
                                        autoComplete="discount"
                                        placeholder="Add promo code"
                                        name="discount"
                                        variant="outlined"
                                        value={promoCode}
                                        sx={sxTextField}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                    />
                                    <button
                                        onClick={handleApplyCouponCode}
                                        className="h-[45px] rounded-xl bg-gradient-to-br from-green-500 px-3 w-fit to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative group"
                                    >
                                        Apply
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </div>
                                {errorPromoCode && (
                                    <FormHelperText sx={{ color: "#d32f2f" }}>
                                        {errorPromoCode}
                                    </FormHelperText>
                                )}
                            </div>
                            {resCheckout &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">{resCheckout.data.attributes.display_item_total ?? "$0"}</span>
                                    </div>
                                    {(resCheckout?.data.attributes.promo_total !== "0.0") &&
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Promo {valueShippingFee === "Free" ? "(Included in Price)" : ""}:</span>
                                            <span className="font-medium">{resCheckout?.data.attributes.display_promo_total}</span>
                                        </div>
                                    }
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping:</span>
                                        <span className="font-medium">
                                            {activeStep === 1 && <p className="text-sm text-gray-600">Calculated at next step</p>}
                                            {(activeStep === 2 || activeStep === 3) && `${valueShippingFee}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-300 ">
                                        <span>Total</span>
                                        <span id="total-cost">{resCheckout.data.attributes.display_total ?? "$0"}</span>
                                    </div>
                                </div>
                            }

                            <div className="flex flex-col gap-3 max-lg:hidden">
                                <h2 className="text-2xl">Checkout Guide</h2>
                                <div className="text-md">This is the
                                    <strong>Spree Commerce DEMO checkout
                                    </strong>.&nbsp;
                                    <br></br>
                                    If you'd like to place a test order to see the full checkout flow, you can use the following card credentials to place the order:
                                </div>
                                <ul className="text-md flex flex-col gap-3">
                                    <li>
                                        <strong>Card No.:</strong>
                                        4242 4242 4242 4242
                                    </li>
                                    <li>
                                        <strong>Expiry Date:</strong>
                                        any future date
                                    </li>
                                    <li>
                                        <strong>CVV:</strong>
                                        any 3-digit number
                                    </li>
                                </ul>
                                <div className="text-md flex flex-col gap-3">
                                    If you'd like to test quick checkout, you can use the payment method saved in your Apple Pay or Google Pay wallet. You will not be charged when placing the order.
                                    <br></br>
                                    <em>
                                        Note: You can easily add checkout messages like this yourself through the Spree admin dashboard - no developer help required.
                                    </em>
                                </div>
                            </div>
                        </aside>
                    </div>
                    <div className="lg:hidden flex flex-col w-full gap-10 self-start flex-1 p-5 bg-gray-100 rounded-xl h-full">
                        <div className="flex flex-col gap-3 ">
                            <h2 className="text-2xl">Checkout Guide</h2>
                            <div className="text-md">This is the
                                <strong>Spree Commerce DEMO checkout
                                </strong>.&nbsp;
                                <br></br>
                                If you'd like to place a test order to see the full checkout flow, you can use the following card credentials to place the order:
                            </div>
                            <ul className="text-md flex flex-col gap-3">
                                <li>
                                    <strong>Card No.:</strong>
                                    4242 4242 4242 4242
                                </li>
                                <li>
                                    <strong>Expiry Date:</strong>
                                    any future date
                                </li>
                                <li>
                                    <strong>CVV:</strong>
                                    any 3-digit number
                                </li>
                            </ul>
                            <div className="text-md flex flex-col gap-3">
                                If you'd like to test quick checkout, you can use the payment method saved in your Apple Pay or Google Pay wallet. You will not be charged when placing the order.
                                <br></br>
                                <em>
                                    Note: You can easily add checkout messages like this yourself through the Spree admin dashboard - no developer help required.
                                </em>
                            </div>
                        </div>
                    </div>
                </div>
            </Box >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default CheckoutFrom