'use client'

import { Checkout_Storefont_Prop } from "@/interface/interface"
import { CheckoutIncludedShippingAddress, CheckoutShipments_Include_Rate } from "@/interface/responseData/interfaceStorefront"
import { SelectShippingMethodForShipments } from "@/service/storefront/checkoutShipments"
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront"
import { useState_ResAccount, useState_ResCheckout, useState_ResCheckoutShipments } from "@/useState/useStatestorefront"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import type { SxProps, Theme } from "@mui/material/styles";
import { FaRegUser } from "react-icons/fa"
import { MdOutlineEmail, MdOutlineErrorOutline } from "react-icons/md"
import { LuMapPinHouse } from "react-icons/lu"
import { useAuth } from "./contexts/AuthContext"


const CheckoutDelivery: React.FC<Checkout_Storefont_Prop> = ({ fnNextStep, fnBackStep, lengthStep }) => {
    const sxRadio: SxProps<Theme> = {
        width: "100%",
        alignItems: "flex-center",
        margin: 0,
        padding: "12px 14px",
        borderRadius: "12px",
        transition: "0.2s",
        gap: '15px',
        "& .MuiFormControlLabel-label": {
            width: "100%",
        },

        "&:hover": {
            backgroundColor: "#f9fafb",
        }
    }

    const { isAuthenticated } = useAuth();

    const { resAccount } = useState_ResAccount()

    const { resCheckout, setResCheckout } = useState_ResCheckout()
    const {
        activeStep, setActiveStep, setValueNameShippingFee,
        setValuePriceShippingFee, setValueShippingFee,
        setLoading } = useStateGeneral()

    const filterAddressCheckout = useMemo(
        () =>
            resCheckout?.included?.filter(
                (r): r is CheckoutIncludedShippingAddress => r.type === "address"
            ) ?? [],
        [resCheckout]
    );

    const [valueIdShippingFee, setValueIdShippingFee] = useState("0");

    const { resCheckoutShipments } = useState_ResCheckoutShipments()

    const filterIncludeShippingRate = useMemo(
        () => resCheckoutShipments.included.filter(
            (r): r is CheckoutShipments_Include_Rate => r.type === "shipping_rate"
        ),
        [resCheckoutShipments]
    );

    const [errorUpdateCheckOut, setErrorUpdateCheckOut] = useState<string>("")

    const setApiSelectShippingMethod = async (shipping_method_id: string, include: string) => {
        const data = {
            shipping_method_id: shipping_method_id
        }
        try {
            setLoading(true)
            const response = await SelectShippingMethodForShipments(data, { include });
            setResCheckout(response.data)
        } catch (error: any) {
            toast.error(`Select ShippingMethod: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleChangeShippingFee = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = event.target.value;
        setValueIdShippingFee(selectedId);
        // Tìm object trong array theo id
        const selectedRate = filterIncludeShippingRate.find(
            (item) => item.id === selectedId
        );

        if (selectedRate) {
            selectedRate.attributes.final_price === "0.0" ?
                setValueShippingFee("Free")
                :
                setValueShippingFee(selectedRate.attributes.display_final_price);

            setApiSelectShippingMethod(selectedRate.attributes.shipping_method_id, "line_items,line_items.variant,line_items.variant.images,shipping_address")

            setValueNameShippingFee(selectedRate.attributes.name)
            setValuePriceShippingFee(selectedRate.attributes.display_final_price)
        }

    };

    return (
        <>
            <div className="flex flex-col  order-2 lg:order-1">
                <div className="gap-5 md:gap-10 flex flex-col">
                    {errorUpdateCheckOut &&
                        <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                            <MdOutlineErrorOutline className="mx-auto" size={21} />{errorUpdateCheckOut}</div>
                    }
                    {isAuthenticated ?
                        <div className="flex flex-col gap-5 rounded-xl border p-5 border-gray-200 shadow-lg">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">
                                    Account
                                </h3>
                                <button className="text-sm text-green-500 hover:text-green-700 transition-all duration-300"
                                    onClick={() => setActiveStep(1)}
                                >Edit</button>
                            </div>
                            <div className="flex-col flex gap-3">
                                <div className="flex gap-3 items-center">
                                    <div className="
                                                                                p-2 bg-green-100 rounded-lg 
                                                                                group-hover:bg-green-200 
                                                                                transition-colors duration-300
                                                                              ">
                                        <FaRegUser className="text-green-600 text-sm" />
                                    </div>
                                    <span className="font-medium text-gray-900">{resAccount?.data.attributes.first_name} {resAccount?.data.attributes.last_name}</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="
                                                              p-2 bg-green-100 rounded-lg 
                                                                              group-hover:bg-green-200 
                                                                              transition-colors duration-300
                                                            ">
                                        <MdOutlineEmail className="text-green-600 text-sm" />
                                    </div>
                                    <span className="flex flex-wrap gap-1 text-gray-600 text-sm leading-relaxed">{resAccount?.data.attributes.email}</span>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="
                                                              p-2 bg-green-100 rounded-lg 
                                                                              group-hover:bg-green-200 
                                                                              transition-colors duration-300
                                                            ">
                                        <LuMapPinHouse className="text-green-600 text-sm" />
                                    </div>
                                    {filterAddressCheckout.length > 0 &&
                                        <>
                                            {filterAddressCheckout?.map((res) =>
                                                <div key={res.id} className="flex flex-wrap gap-1 text-gray-600 text-sm leading-relaxed">
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
                        :
                        <div className="flex flex-col gap-5 rounded-xl border p-5 border-gray-200 shadow-lg">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">
                                    Information about  <strong className="text-green-600">shipping address</strong>
                                </h3>
                                <button className="text-sm text-green-500 hover:text-green-700 transition-all duration-300"
                                    onClick={() => setActiveStep(1)}
                                >Edit</button>
                            </div>
                            <div className="flex-col flex gap-3">
                                <div className="flex gap-3 items-center">
                                    <div className="
                                                                                p-2 bg-green-100 rounded-lg 
                                                                                group-hover:bg-green-200 
                                                                                transition-colors duration-300
                                                                              ">
                                        <MdOutlineEmail className="text-green-600 text-sm" />
                                    </div>
                                    <span className="font-medium text-gray-900">{resCheckout?.data.attributes.email}</span>

                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="
                                                              p-2 bg-green-100 rounded-lg 
                                                                              group-hover:bg-green-200 
                                                                              transition-colors duration-300
                                                            ">
                                        <LuMapPinHouse className="text-green-600 text-sm" />
                                    </div>
                                    {filterAddressCheckout.length > 0 &&
                                        <>
                                            {filterAddressCheckout?.map((res) =>
                                                <div key={res.id} className="flex flex-wrap gap-1 text-gray-600 text-sm leading-relaxed">
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
                    <div className="flex flex-col gap-5 rounded-xl border p-5 border-gray-200 shadow-lg">
                        <div className="flex items-center">
                            <h3 className="text-xl font-semibold">
                                Delivery method from <strong className="text-green-600">Shop location</strong>
                            </h3>
                        </div>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={valueIdShippingFee}
                            onChange={handleChangeShippingFee}
                        >
                            {filterIncludeShippingRate &&
                                <div className="flex flex-col gap-5">
                                    {filterIncludeShippingRate.map((res) => (
                                        <div key={res.id} className={`w-full rounded-xl bg-white  
                                                         hover:shadow-lg 
                                                        transition-all duration-500 ease-out
                                                        hover:-translate-y-2 hover:border-green-300
                                                        relative overflow-hidden
                                                        group cursor-pointer
                                                        backdrop-blur-sm ${valueIdShippingFee === res.id ? 'border-green-500 border shadow-sm' : ' '}`}>
                                            <FormControlLabel
                                                value={res.id}
                                                control={<Radio sx={{
                                                    zIndex: '10',
                                                    p: '0',
                                                    '&.Mui-checked': {
                                                        color: 'var(--color-green-600)',
                                                    },
                                                }} />}
                                                sx={sxRadio}
                                                label={
                                                    <div>
                                                        <div className={`${valueIdShippingFee === res.id ? 'opacity-100' : 'opacity-0'} absolute inset-0  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl"></div>
                                                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100 to-teal-50 rounded-full blur-2xl"></div>
                                                        </div>
                                                        <div className={`flex justify-between w-full gap-5 relative z-1`}>
                                                            <div className="flex flex-col gap-1">
                                                                <div className="font-medium text-gray-900">{res.attributes.name}</div>
                                                                <div className="text-gray-600 text-sm">
                                                                    {res.attributes.display_delivery_range}
                                                                </div>
                                                                <div className="sm:hidden flex gap-2">
                                                                    <div className="font-bold text-green-500 text-xl">{res.attributes.display_final_price}</div>
                                                                    {parseFloat(res.attributes.final_price) < parseFloat(res.attributes.cost) &&
                                                                        <span className="text-md text-gray-400 line-through">{res.attributes.display_cost}</span>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2 max-sm:hidden">
                                                                <div className="font-bold text-green-500 text-xl">{res.attributes.display_final_price}</div>
                                                                {parseFloat(res.attributes.final_price) < parseFloat(res.attributes.cost) &&
                                                                    <span className="text-md text-gray-400 line-through">{res.attributes.display_cost}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={`${valueIdShippingFee === res.id ? 'opacity-5' : 'opacity-0'}
                                                            absolute inset-0 rounded-xl 
                                                            bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 
                                                             group-hover:opacity-5 
                                                            transition-opacity duration-500
                                                            -z-5`}></div>
                                                    </div>
                                                }
                                            >

                                            </FormControlLabel>
                                        </div>
                                    ))}
                                </div>
                            }
                        </RadioGroup>
                    </div>
                    <div className="flex justify-end gap-5">
                        <button className="uppercase md:px-16 px-4 md:text-md text-sm uppercase h-[50px] rounded-xl border border-green-600 text-green-600 font-semibold transition-transform hover:border-green-700 hover:scale-105"
                            // disabled={activeStep === 1}
                            onClick={() => {
                                fnBackStep()
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                if (valueIdShippingFee === '0') {
                                    setErrorUpdateCheckOut("Please select the delivery method")
                                    return
                                }
                                fnNextStep()
                            }}
                            className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 uppercase md:px-16 px-4 md:text-md text-sm to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group">
                            {activeStep === lengthStep - 1 ? 'Finish' : 'Save and Continue'}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                            <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </button>
                    </div>
                </div>
                <ToastContainer position="top-right" autoClose={3000} />
            </div>

        </>
    )
}

export default CheckoutDelivery