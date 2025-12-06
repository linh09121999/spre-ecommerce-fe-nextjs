"use client"

import { AddressInteface, Checkout } from "@/interface/sendData/interfaceStorefront";
import { UpdateCheckOut } from "@/service/storefront/checkout";
import { ListShippingRates } from "@/service/storefront/checkoutShipments";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { useState_ResAccount, useState_ResAccountAddress, useState_ResCheckoutShipments, useState_ResCountries } from "@/useState/useStatestorefront";
import { Autocomplete, Avatar, Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, Radio, RadioGroup, Stack, TextField, Badge, styled } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import type { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaRegCircle, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineErrorOutline, MdOutlinePhoneIphone } from "react-icons/md";
import { AccountAddress_Attributes, Country, CountryInclude } from "@/interface/responseData/interfaceStorefront";
import { ListAllCountries, RetrieveAContry } from "@/service/storefront/countries";
import { Checkout_Storefont_Prop } from "@/interface/interface";
import { RetrieveAnAccount } from "@/service/storefront/account";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { CreateAccountAddress, ListAccountAddress } from "@/service/storefront/accountAddress";
import { LuMapPinHouse } from "react-icons/lu";
import { useAuth } from "./contexts/AuthContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
    width: '45px',
    height: '45px',
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '2px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const CheckOutAddress: React.FC<Checkout_Storefont_Prop> = ({ fnNextStep, fnBackStep, lengthStep }) => {
    const sxAvata: SxProps<Theme> = {
        width: "100%",
        height: "100%",
        boxShadow: 'var(--shadow-xl)',

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

    const sxCheckBox: SxProps<Theme> = {
        zIndex: '10',
        color: 'black',
        '&.Mui-checked': { color: 'var(--color-green-500)' },
    }
    const sxControlLabel: SxProps<Theme> = {
        margin: 0,
        "& .MuiFormControlLabel-label": {
            fontSize: 'var(--text-sm) !important',
        },
        ":hover": {
            color: 'var(--color-green-500)'
        }
    }

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

    const sxFormControl = {
        minWidth: 120,
        margin: 0
    }

    const componentsProps: SxProps<Theme> = {
        paper: {
            sx: {
                background: 'white',
                zIndex: 100,
                '& .MuiAutocomplete-option': {
                    minHeight: '30px !important',
                    color: 'var(--color-green-700)',
                },
                '& .MuiAutocomplete-option:hover': {
                    backgroundColor: 'var(--color-green-100) !important',
                    color: 'var(--color-green-700) !important',
                    fontWeight: 600
                },
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: 'var(--color-green-100) !important',
                    color: 'var(--color-green-700) !important',
                    fontWeight: 600
                }
            }
        }
    }

    const router = useRouter()

    const {
        setLoadingReadMore, loadingReadMore,
        activeStep, setValueShippingFee,
        setLoading } = useStateGeneral()

    const { resAccount, setResAccount } = useState_ResAccount()

    const getApiAccount = async (include: string) => {
        try {
            setLoading(true);
            const res = await RetrieveAnAccount({ include })
            setResAccount(res.data)
        } catch (error: any) {
            toast.error(`Account: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            getApiAccount("default_billing_address")
            getApiListAllAddress(1, 12)
        } else {
            setResAccount(undefined)
            setResDataAccountAddress_All([])
        }
    }, [isAuthenticated])


    const [errorUpdateCheckOut, setErrorUpdateCheckOut] = useState<string>("")

    const [order, setOrder] = useState({
        email: "",
        bill_address_attributes: {
            firstname: "",
            lastname: "",
            address1: "",
            city: "",
            phone: "",
            zipcode: "",
            state_name: "",
            country_iso: ""
        },
        ship_address_attributes: {
            firstname: "",
            lastname: "",
            address1: "",
            city: "",
            phone: "",
            zipcode: "",
            state_name: "",
            country_iso: ""
        }
    });

    const [errors, setErrors] = useState({
        email: "",
        firstname: "",
        lastname: "",
        address1: "",
        city: "",
        phone: "",
        zipcode: "",
        country_iso: ""
    });

    const [formCheck, setFormCheck] = useState({
        checked1: false,
        checked2: false,
        checked3: false,
    });

    const [errorCheckBox, setErrorCheckBox] = useState<string>("")

    const validateFields = () => {
        let newErrors: any = {};

        const fields = {
            email: order.email,
            firstname: order.bill_address_attributes.firstname,
            lastname: order.bill_address_attributes.lastname,
            address1: order.bill_address_attributes.address1,
            city: order.bill_address_attributes.city,
            phone: order.bill_address_attributes.phone,
            zipcode: order.bill_address_attributes.zipcode,
            country_iso: order.bill_address_attributes.country_iso
        } as any;

        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        const phone = order.bill_address_attributes.phone;
        if (phone && !/^(0[0-9]{9})$/.test(phone)) {
            newErrors.phone = "Invalid phone number (10 numbers, starting with 0)";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const { setResCheckoutShipments } = useState_ResCheckoutShipments()

    const getApiShippingRate = async () => {
        try {
            setLoading(true)
            const response = await ListShippingRates();
            setResCheckoutShipments(response.data)
        } catch (error: any) {
            toast.error(`List shipping rate: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const getApiRetrieveCountry = async (iso: string, include: string) => {
        try {
            setLoading(true)
            const response = await RetrieveAContry(iso, { include });
            setResCountries_Retrieve(response.data)
        } catch (error: any) {
            toast.error(`Retrieve contries: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleChangeSearchCountry = (
        _: React.SyntheticEvent | null,
        newValue: Country | null
    ) => {
        if (!newValue) return;
        setOrder(prev => ({
            ...prev,
            bill_address_attributes: {
                ...prev.bill_address_attributes,
                country_iso: newValue.attributes.iso
            },
        }))
        getApiRetrieveCountry(newValue.attributes.iso, 'states')
    }

    const handleChangeSearchState = (_: React.SyntheticEvent | null,
        newValue: CountryInclude | null) => {
        if (!newValue) return;
        setOrder(prev => ({
            ...prev,
            bill_address_attributes: {
                ...prev.bill_address_attributes,
                state_name: newValue.attributes.abbr
            },
        }))
    }

    const { resCountries_List, setResCountries_List, resCountries_Retrieve, setResCountries_Retrieve } = useState_ResCountries()

    const handleNextToDelivery = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateFields()) {
            return; // stop submit
        }

        if (!formCheck.checked3) {
            setErrorCheckBox("You must agree before continuing!");
            return;
        }

        const data: { order: Checkout } = { order };
        const include = "line_items,shipping_address"

        try {
            setLoading(true)
            const response = await UpdateCheckOut(data, { include: include });
            // setResCheckout(response.data)
            setErrorUpdateCheckOut("")
            fnNextStep()
            getApiShippingRate()
        } catch (error: any) {
            setErrorUpdateCheckOut(error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }

    }

    const [inputValueAccountAddress, setInputValueAccountAddress] = useState<string>("")

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

    const [openCreateAccountAddress, setOpenCreateAccountAddress] = useState<boolean>(false)
    const [errorCreateAccountAddress, setErrorCreateAccountAddress] = useState<string>('')

    const [createAccountAddress, setCreateAccountAddress] = useState<AddressInteface>(
        {
            firstname: "",
            lastname: "",
            company: "",
            address1: "",
            address2: "",
            city: "",
            phone: "",
            zipcode: "",
            state_name: "",
            country_iso: "",
            label: "",
        }
    )

    const [errorEmptyAccountAddress, setErrorEmptyAccountAddress] = useState(
        {
            firstname: "",
            lastname: "",
            company: "",
            address1: "",
            address2: "",
            city: "",
            phone: "",
            zipcode: "",
            state_name: "",
            country_iso: "",
            label: "",
        }
    )

    const validateFieldsAccountAddress = () => {
        let newErrors: any = {};
        const fields = {
            firstname: createAccountAddress.firstname,
            lastname: createAccountAddress.lastname,
            address1: createAccountAddress.address1,
            city: createAccountAddress.city,
            zipcode: createAccountAddress.zipcode,
            country_iso: createAccountAddress.country_iso,
            phone: createAccountAddress.phone
        } as any;
        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        const phone = createAccountAddress.phone;
        if (phone && !/^(0[0-9]{9})$/.test(phone)) {
            newErrors.phone = "Invalid phone number (10 numbers, starting with 0)";
        }
        setErrorEmptyAccountAddress(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const { resDataAccountAddress_All, setResDataAccountAddress_All } = useState_ResAccountAddress()
    const [totalDataAccountAddress, setTotalDataAccountAddress] = useState<number>(1)
    const [totalPageAccountAddress, setTotalPageAccountAddress] = useState<number>(1)
    const [currentPageAccountAddress, setCurrentPageAccountAddress] = useState<number>(1)


    const getApiListAllAddress = async (page: number, per_page: number) => {
        try {
            { page === 1 ? setLoading(true) : setLoadingReadMore(true) }
            setLoadingReadMore(true)
            const res = await ListAccountAddress({ page, per_page })
            setTotalDataAccountAddress(res.data.meta.total_count)
            setTotalPageAccountAddress(res.data.meta.total_pages)
            setCurrentPageAccountAddress(page)
            if (page === 1) {
                setResDataAccountAddress_All(res.data.data)
            } else {
                setResDataAccountAddress_All((prev) => [...prev, ...res.data.data])
            }
        } catch (error: any) {
            setResDataAccountAddress_All([])
            setCurrentPageAccountAddress(0)
            toast.error(`List All Address: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
            setLoadingReadMore(false)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (loadingReadMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
                if (currentPageAccountAddress < totalPageAccountAddress) {
                    getApiListAllAddress(currentPageAccountAddress + 1, 12)
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [loadingReadMore, currentPageAccountAddress, totalPageAccountAddress, getApiListAllAddress]);


    const handleCreateAccountAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFieldsAccountAddress()) {
            return; // stop submit
        }

        const data: { address: AddressInteface } = {
            address: createAccountAddress
        }

        try {
            setLoading(true)
            const response = await CreateAccountAddress(data);
            setErrorCreateAccountAddress("")
            getApiListAllAddress(1, 12)
            setOpenCreateAccountAddress(false)
        } catch (error: any) {
            setErrorCreateAccountAddress(error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const filterAccountAddress = useMemo(() => {
        return resDataAccountAddress_All.filter((r) => {
            // Danh sách các trường cần tìm kiếm
            const searchFields = [
                'firstname',
                'lastname',
                'address1',
                'address2',
                'city',
                'state_name',
                'country_name'
            ]

            // Kiểm tra từng trường
            return searchFields.some((field): field is keyof AccountAddress_Attributes => {
                const value = r.attributes?.[field as keyof AccountAddress_Attributes];

                // Nếu giá trị tồn tại và khớp với searchText (không phân biệt hoa thường)
                if (value) {
                    return value.toLowerCase().includes(inputValueAccountAddress.toLowerCase());
                }

                return false;
            });
        });
    }, [resDataAccountAddress_All, inputValueAccountAddress])

    const [valueIdShippingAddress, setValueIdShippingAddress] = useState("0");

    const handleChangeShippingAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = event.target.value;
        setValueIdShippingAddress(selectedId)

        const selectData = filterAccountAddress.find(
            (items) => items.id === selectedId
        )

        if (selectData) {
            setOrder(
                {
                    email: resAccount?.data.attributes.email ?? "",
                    bill_address_attributes: {
                        address1: selectData.attributes.address1 ?? "",
                        city: selectData.attributes.city ?? "",
                        country_iso: selectData.attributes.country_iso ?? "",
                        firstname: selectData.attributes.firstname ?? "",
                        lastname: selectData.attributes.lastname ?? "",
                        phone: selectData.attributes.phone ?? "",
                        state_name: selectData.attributes.state_code ?? "",
                        zipcode: selectData.attributes.zipcode ?? "",
                    },
                    ship_address_attributes: {
                        address1: selectData.attributes.address1 ?? "",
                        city: selectData.attributes.city ?? "",
                        country_iso: selectData.attributes.country_iso ?? "",
                        firstname: selectData.attributes.firstname ?? "",
                        lastname: selectData.attributes.lastname ?? "",
                        phone: selectData.attributes.phone ?? "",
                        state_name: selectData.attributes.state_code ?? "",
                        zipcode: selectData.attributes.zipcode ?? "",
                    }
                }
            )
        }
    }

    const handleNextToDeliveryToken = async () => {
        if (valueIdShippingAddress === '0') {
            setErrorUpdateCheckOut("Please select the address")
            return
        }
        const data: { order: Checkout } = { order };
        const include = "line_items,shipping_address"
        try {
            setLoading(true)
            const response = await UpdateCheckOut(data, { include: include });
            // setResCheckout(response.data)
            setErrorUpdateCheckOut("")
            setValueIdShippingAddress("0")
            fnNextStep()
            getApiShippingRate()
        } catch (error: any) {
            setErrorUpdateCheckOut(error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {isAuthenticated ?
                <div className="flex flex-col gap-5 order-2 lg:order-1">
                    {errorUpdateCheckOut &&
                        <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                            <MdOutlineErrorOutline className="mx-auto" size={21} />{errorUpdateCheckOut}</div>
                    }
                    <div className="flex flex-col gap-5 rounded-xl border p-5 border-gray-200 shadow-lg">
                        <div className="flex items-center">
                            <h3 className="text-xl font-semibold">
                                Account
                            </h3>
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
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 rounded-xl border p-5 border-gray-200 shadow-lg">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-center">
                            <div className="max-md:flex max-md:justify-between items-center">
                                <h3 className="text-xl font-semibold">
                                    Shipping Address
                                </h3>
                                <button
                                    aria-label='add address'
                                    className="h-[45px] md:hidden w-[45px] rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                    onClick={() => {
                                        getApiListCountries()
                                        setOpenCreateAccountAddress(true)
                                    }}
                                ><IoMdAdd size={18} className="mx-auto" />
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                </button>
                            </div>
                            <div className='flex gap-3'>
                                <TextField
                                    type="search"
                                    placeholder="Search of address..."
                                    sx={sxTextField}
                                    onChange={(e) => setInputValueAccountAddress(e.target.value)}
                                    value={inputValueAccountAddress}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    sx={{ color: 'var(--color-gray-300)' }}
                                                >
                                                    <IoMdSearch className="mx-auto" />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <button
                                    aria-label='add address'
                                    className="h-[45px] max-md:hidden w-[45px] rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                    onClick={() => {
                                        getApiListCountries()
                                        setOpenCreateAccountAddress(true)
                                    }}
                                ><IoMdAdd size={18} className="mx-auto" />
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                </button>
                                <Dialog open={openCreateAccountAddress} onClose={() => setOpenCreateAccountAddress(false)}>
                                    <DialogContent
                                        sx={{
                                            padding: 0,
                                            borderRadius: "18px",
                                            overflow: "hidden",
                                            background: "transparent",
                                        }}
                                    >
                                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center md:p-5 p-3 z-50">
                                            <div className="w-full max-w-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl lg:p-10 md:p-5 p-3 border border-white/40 shadow-2xl relative overflow-hidden">
                                                <button
                                                    onClick={() => setOpenCreateAccountAddress(false)}
                                                    className="absolute top-3 right-3 w-10 h-10 z-50 flex items-center justify-center
                                    rounded-full bg-white/70 backdrop-blur-md shadow-lg
                                    hover:bg-white hover:shadow-xl hover:-translate-y-0.5
                                    transition-all duration-300 border border-white/60"
                                                >
                                                    <span className="text-gray-600 text-xl font-bold">×</span>
                                                </button>
                                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-200/30 rounded-full blur-xl"></div>
                                                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-200/30 rounded-full blur-xl"></div>
                                                <div className="relative z-10">
                                                    <h1 className="md:text-2xl text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                                                        Create An Address
                                                    </h1>
                                                    {errorCreateAccountAddress && (
                                                        <div className="p-4 mb-6 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                                            <MdOutlineErrorOutline className="mx-auto" size={21} />
                                                            <span>{errorCreateAccountAddress}</span>
                                                        </div>
                                                    )}
                                                    <form onSubmit={handleCreateAccountAddress}
                                                        className="flex flex-col md:gap-5 gap-2">
                                                        <div className="flex flex-col gap-1">
                                                            <label htmlFor="label" className="block text-md font-medium text-gray-700">
                                                                Label
                                                            </label>
                                                            <TextField
                                                                type="text"
                                                                autoComplete="label"
                                                                placeholder="Label"
                                                                name="label"
                                                                variant="outlined"
                                                                sx={sxTextField}
                                                                value={createAccountAddress.label}
                                                                onChange={(e) =>
                                                                    setCreateAccountAddress(prev => ({
                                                                        ...prev,
                                                                        label: e.target.value
                                                                    }))
                                                                }
                                                            />
                                                        </div>

                                                        <div className='grid grid-cols-2 gap-3'>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="firstName" className="block text-md font-medium text-gray-700">
                                                                    First Name <span className="text-red-500">*</span>
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    required
                                                                    autoComplete="firstName"
                                                                    placeholder="First Name"
                                                                    name="firstName"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.firstname}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            firstname: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.firstname)}
                                                                    helperText={errorEmptyAccountAddress.firstname}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="lastName" className="block text-md font-medium text-gray-700">
                                                                    Last name <span className="text-red-500">*</span>
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    required
                                                                    autoComplete="lastName"
                                                                    placeholder="Last name"
                                                                    name="lastName"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.lastname}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            lastname: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.lastname)}
                                                                    helperText={errorEmptyAccountAddress.lastname}
                                                                />
                                                            </div>

                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="country" className="block text-md font-medium text-gray-700">
                                                                    Country <span className="text-red-500">*</span>
                                                                </label>
                                                                {/* auto complate */}
                                                                <FormControl className="w-full" sx={sxFormControl} size="small">
                                                                    <Autocomplete
                                                                        // disableClearable
                                                                        noOptionsText="There is no coutries"
                                                                        options={resCountries_List?.data || []}
                                                                        componentsProps={componentsProps}
                                                                        getOptionLabel={(option) => option.attributes.name}
                                                                        filterOptions={(options, { inputValue }) =>
                                                                            options.filter((option) =>
                                                                                removeVietnameseTones(option.attributes.name)
                                                                                    .toLowerCase()
                                                                                    .includes(removeVietnameseTones(inputValue).toLowerCase())
                                                                            )
                                                                        }
                                                                        onChange={handleChangeSearchCountry}
                                                                        renderInput={(params) => (
                                                                            <TextField  {...params}
                                                                                placeholder="Search for countries..."
                                                                                sx={sxTextField}
                                                                                error={Boolean(errorEmptyAccountAddress.country_iso)}
                                                                                helperText={errorEmptyAccountAddress.country_iso}
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="company" className="block text-md font-medium text-gray-700">
                                                                    Company
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    autoComplete="company"
                                                                    placeholder="Company"
                                                                    name="company"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.company}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            company: e.target.value
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='grid sm:grid-cols-2 gap-3'>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="address1" className="block text-md font-medium text-gray-700">
                                                                    Street and house number <span className="text-red-500">*</span>
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    required
                                                                    autoComplete="address1"
                                                                    placeholder="Street and house number"
                                                                    name="address1"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.address1}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            address1: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.address1)}
                                                                    helperText={errorEmptyAccountAddress.address1}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="address2" className="block text-md font-medium text-gray-700">
                                                                    Additional addresses
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    autoComplete="address2"
                                                                    placeholder="Additional addresses"
                                                                    name="address2"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.address2}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            address2: e.target.value
                                                                        }))
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='grid grid-cols-2 gap-3'>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="city" className="block text-md font-medium text-gray-700">
                                                                    City <span className="text-red-500">*</span>
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    required
                                                                    autoComplete="city"
                                                                    placeholder="City"
                                                                    name="city"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.city}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            city: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.city)}
                                                                    helperText={errorEmptyAccountAddress.city}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="state_name" className="block text-md font-medium text-gray-700">
                                                                    State name
                                                                </label>
                                                                <FormControl className="w-full" sx={sxFormControl} size="small">
                                                                    <Autocomplete
                                                                        // disableClearable
                                                                        noOptionsText="There is no coutries"
                                                                        options={resCountries_Retrieve?.included || []}
                                                                        componentsProps={componentsProps}
                                                                        getOptionLabel={(option) => option.attributes.name}
                                                                        filterOptions={(options, { inputValue }) =>
                                                                            options.filter((option) =>
                                                                                removeVietnameseTones(option.attributes.name)
                                                                                    .toLowerCase()
                                                                                    .includes(removeVietnameseTones(inputValue).toLowerCase())
                                                                            )
                                                                        }
                                                                        onChange={handleChangeSearchState}
                                                                        renderInput={(params) => (
                                                                            <TextField  {...params}
                                                                                placeholder="Search for state..."
                                                                                sx={sxTextField}
                                                                            />
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="zipcode" className="block text-md font-medium text-gray-700">
                                                                    Postal Code <span className="text-red-500">*</span>
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    required
                                                                    autoComplete="zipcode"
                                                                    placeholder="Postal Code"
                                                                    name="zipcode"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.zipcode}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            zipcode: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.zipcode)}
                                                                    helperText={errorEmptyAccountAddress.zipcode}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <label htmlFor="phone" className="block text-md font-medium text-gray-700">
                                                                    Phone
                                                                </label>
                                                                <TextField
                                                                    type="text"
                                                                    autoComplete="phone"
                                                                    placeholder="Phone"
                                                                    name="phone"
                                                                    variant="outlined"
                                                                    sx={sxTextField}
                                                                    value={createAccountAddress.phone}
                                                                    onChange={(e) =>
                                                                        setCreateAccountAddress(prev => ({
                                                                            ...prev,
                                                                            phone: e.target.value
                                                                        }))
                                                                    }
                                                                    error={Boolean(errorEmptyAccountAddress.phone)}
                                                                    helperText={errorEmptyAccountAddress.phone}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-3 mt-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpenCreateAccountAddress(false)}
                                                                className="
                                                                    flex-1 h-[45px] rounded-xl 
                                                                    text-lg font-semibold text-gray-700
                                                                    bg-gray-100 hover:bg-gray-200
                                                                    shadow-md hover:shadow-lg
                                                                    transition-all duration-300
                                                                "
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="flex-1 rounded-xl h-[45px] bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                                            >
                                                                <span className="relative z-10">Create</span>
                                                                <div className="absolute inset-0 overflow-hidden">
                                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                                </div>
                                                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={valueIdShippingAddress}
                            onChange={handleChangeShippingAddress}
                        >
                            {(filterAccountAddress) &&
                                <div className="flex flex-col gap-5">
                                    {filterAccountAddress.map((res) => (
                                        <div
                                            key={res.id}
                                            className={`${valueIdShippingAddress === res.id ? 'border-green-500 border shadow-sm' : ' '} w-full rounded-xl bg-white  
                                                         hover:shadow-lg 
                                                        transition-all duration-500 ease-out
                                                        hover:-translate-y-2 hover:border-green-300
                                                        relative overflow-hidden
                                                        group cursor-pointer
                                                        backdrop-blur-sm`}
                                        >
                                            <FormControlLabel
                                                value={res.id}
                                                control={<Radio sx={{
                                                    zIndex: '10',
                                                    p: 0,
                                                    '&.Mui-checked': {
                                                        color: 'var(--color-green-600)',
                                                    },
                                                }} />}
                                                sx={sxRadio}
                                                label={
                                                    <div>
                                                        <div className={`${valueIdShippingAddress === res.id ? 'opacity-100' : 'opacity-0'} absolute inset-0  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                                                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl"></div>
                                                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100 to-teal-50 rounded-full blur-2xl"></div>
                                                        </div>
                                                        <div className="flex flex-col gap-3 ">
                                                            <div className="flex gap-3 z-1 relative">
                                                                <div className="relative ">
                                                                    <Stack direction="row" spacing={2} sx={{ margin: '0 auto' }}>
                                                                        <StyledBadge
                                                                            overlap="circular"
                                                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                                            variant="dot"
                                                                        >
                                                                            <Avatar
                                                                                sx={sxAvata}
                                                                            >
                                                                                <span className="text-md">
                                                                                    {res.attributes.firstname.charAt(0).toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                                                                </span>
                                                                            </Avatar>
                                                                        </StyledBadge >
                                                                    </Stack>

                                                                </div>
                                                                <div>
                                                                    <h3 className="text-lg font-bold text-gray-900 
                                                                                                    group-hover:text-green-800 
                                                                                                    transition-colors duration-300
                                                                                                    truncate
                                                                                                    ">
                                                                        {res.attributes.firstname} {res.attributes.lastname}
                                                                    </h3>
                                                                    <span className="font-medium text-sm text-gray-900">{res.attributes.phone}</span>
                                                                </div>
                                                            </div>
                                                            <div className="relative flex z-1 flex-wrap items-center gap-1 text-gray-600 text-sm leading-relaxed">
                                                                <div className=" transition-colors duration-300">
                                                                    <LuMapPinHouse className="text-green-600 text-sm " />
                                                                </div>
                                                                {[
                                                                    res.attributes.address1,
                                                                    res.attributes.address2,
                                                                    res.attributes.city,
                                                                    res.attributes.state_name,
                                                                    res.attributes.zipcode,
                                                                    res.attributes.country_name
                                                                ]
                                                                    .filter(Boolean)
                                                                    .map((part, index, array) => (
                                                                        <span key={index} className="text-gray-700 ">
                                                                            {part}{index < array.length - 1 ? ',' : ''}
                                                                        </span>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={`${valueIdShippingAddress === res.id ? 'opacity-5' : 'opacity-0'}
                                                            absolute inset-0 rounded-xl 
                                                            bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 
                                                             group-hover:opacity-5 
                                                            transition-opacity duration-500
                                                            -z-5`}></div>
                                                    </div>
                                                }>

                                            </FormControlLabel>
                                        </div>
                                    ))}
                                </div>
                            }
                            {loadingReadMore && (
                                <p className="text-center py-4 text-gray-500 animate-pulse">
                                    loading more...
                                </p>
                            )}
                        </RadioGroup >
                    </div >
                    <div className="flex justify-end gap-5">
                        <button className="md:px-16 px-4 md:text-md text-sm uppercase h-[50px] rounded-xl border border-green-600 text-green-600 font-semibold transition-transform hover:border-green-700 hover:scale-105"
                            // disabled={activeStep === 1}
                            onClick={() => {
                                fnBackStep()
                                setValueShippingFee("Free")
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNextToDeliveryToken}
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
                </div >
                :
                <div className="flex flex-col gap-5 order-2 lg:order-1">
                    {errorUpdateCheckOut &&
                        <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                            <MdOutlineErrorOutline className="mx-auto" size={21} />{errorUpdateCheckOut}</div>
                    }
                    <form onClick={handleNextToDelivery}>
                        <div className="flex flex-col w-full gap-5 md:gap-10 self-start flex-1 ">
                            <div className="flex flex-col w-full gap-3">
                                <div className="sm:flex items-center sm:justify-between grid gap-3 md:gap-5">
                                    <h3 className="text-xl font-semibold">
                                        Contact information
                                    </h3>
                                    <span className="flex gap-2 text-md text-gray-400">
                                        Already have an account?
                                        <button className="text-black hover:text-green-500 transition-all duration-300" onClick={() => router.push('/login')}>Login</button>
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <TextField
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="Email"
                                        name="email"
                                        variant="outlined"
                                        value={order.email}
                                        sx={sxTextField}
                                        onChange={(e) =>
                                            setOrder(prev => ({
                                                ...prev, // giữ lại tất cả các giá trị cũ
                                                email: e.target.value // chỉ cập nhật email
                                            }))
                                        }
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <FormControlLabel control={
                                        <Checkbox
                                            name="checked1"
                                            checked={formCheck.checked1}
                                            icon={<FaRegCircle />}
                                            checkedIcon={<FaCheckCircle />}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                                setFormCheck({ ...formCheck, checked1: checked });
                                            }}
                                            sx={sxCheckBox}
                                        />
                                    }
                                        onClick={(e) => e.stopPropagation()}
                                        label="Email me about new products, sales, and more. You can unsubscribe at any time."
                                        sx={sxControlLabel}
                                    />
                                    <FormControlLabel control={
                                        <Checkbox
                                            name="checked2"
                                            checked={formCheck.checked2}
                                            icon={<FaRegCircle />}
                                            checkedIcon={<FaCheckCircle />}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                                setFormCheck({ ...formCheck, checked2: checked });
                                            }}
                                            sx={sxCheckBox}
                                        />
                                    }
                                        onClick={(e) => e.stopPropagation()}
                                        label="Create an account for faster future purchases, order tracking, and more."
                                        sx={sxControlLabel}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-5">
                                <div className="flex items-center">
                                    <h3 className="text-xl font-semibold">
                                        Shipping Address
                                    </h3>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="country" className="block text-md font-medium text-gray-700">
                                        Country <span className="text-red-500">*</span>
                                    </label>
                                    {/* auto complate */}
                                    <FormControl className="w-full" sx={sxFormControl} size="small">
                                        <Autocomplete
                                            // disableClearable
                                            noOptionsText="There is no coutries"
                                            options={resCountries_List?.data || []}
                                            componentsProps={componentsProps}
                                            getOptionLabel={(option) => option.attributes.name}
                                            filterOptions={(options, { inputValue }) =>
                                                options.filter((option) =>
                                                    removeVietnameseTones(option.attributes.name)
                                                        .toLowerCase()
                                                        .includes(removeVietnameseTones(inputValue).toLowerCase())
                                                )
                                            }
                                            onChange={handleChangeSearchCountry}
                                            renderInput={(params) => (
                                                <TextField  {...params}
                                                    placeholder="Search for countries..."
                                                    sx={sxTextField}
                                                    error={Boolean(errors.country_iso)}
                                                    helperText={errors.country_iso}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="firstName" className="block text-md font-medium text-gray-700">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <TextField
                                            type="text"
                                            required
                                            autoComplete="firstName"
                                            placeholder="First Name"
                                            name="firstName"
                                            variant="outlined"
                                            sx={sxTextField}
                                            value={order.bill_address_attributes.firstname}
                                            onChange={(e) =>
                                                setOrder(prev => ({
                                                    ...prev,
                                                    bill_address_attributes: {
                                                        ...prev.bill_address_attributes,
                                                        firstname: e.target.value
                                                    },
                                                }))
                                            }
                                            error={Boolean(errors.firstname)}
                                            helperText={errors.firstname}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="lastName" className="block text-md font-medium text-gray-700">
                                            Last name <span className="text-red-500">*</span>
                                        </label>
                                        <TextField
                                            type="text"
                                            required
                                            autoComplete="lastName"
                                            placeholder="Last name"
                                            name="lastName"
                                            variant="outlined"
                                            sx={sxTextField}
                                            value={order.bill_address_attributes.lastname}
                                            onChange={(e) =>
                                                setOrder(prev => ({
                                                    ...prev,
                                                    bill_address_attributes: {
                                                        ...prev.bill_address_attributes,
                                                        lastname: e.target.value
                                                    },
                                                }))
                                            }
                                            error={Boolean(errors.lastname)}
                                            helperText={errors.lastname}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="homeNumber" className="block text-md font-medium text-gray-700">
                                        Street and house number <span className="text-red-500">*</span>
                                    </label>
                                    <TextField
                                        type="text"
                                        required
                                        autoComplete="homeNumber"
                                        placeholder="Street and house number"
                                        name="homeNumber"
                                        variant="outlined"
                                        sx={sxTextField}
                                        value={order.bill_address_attributes.address1}
                                        onChange={(e) =>
                                            setOrder(prev => ({
                                                ...prev,
                                                bill_address_attributes: {
                                                    ...prev.bill_address_attributes,
                                                    address1: e.target.value
                                                },
                                            }))
                                        }
                                        error={Boolean(errors.address1)}
                                        helperText={errors.address1}
                                    />
                                </div>
                                <div className="grid sm:grid-cols-3 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="city" className="block text-md font-medium text-gray-700">
                                            City <span className="text-red-500">*</span>
                                        </label>
                                        <TextField
                                            type="text"
                                            required
                                            autoComplete="city"
                                            placeholder="City"
                                            name="city"
                                            variant="outlined"
                                            sx={sxTextField}
                                            value={order.bill_address_attributes.city}
                                            onChange={(e) =>
                                                setOrder(prev => ({
                                                    ...prev,
                                                    bill_address_attributes: {
                                                        ...prev.bill_address_attributes,
                                                        city: e.target.value
                                                    },
                                                }))
                                            }
                                            error={Boolean(errors.city)}
                                            helperText={errors.city}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="state" className="block text-md font-medium text-gray-700">
                                            State
                                        </label>
                                        <FormControl className="w-full" sx={sxFormControl} size="small">
                                            <Autocomplete
                                                // disableClearable
                                                noOptionsText="There is no coutries"
                                                options={resCountries_Retrieve?.included || []}
                                                componentsProps={componentsProps}
                                                getOptionLabel={(option) => option.attributes.name}
                                                filterOptions={(options, { inputValue }) =>
                                                    options.filter((option) =>
                                                        removeVietnameseTones(option.attributes.name)
                                                            .toLowerCase()
                                                            .includes(removeVietnameseTones(inputValue).toLowerCase())
                                                    )
                                                }
                                                onChange={handleChangeSearchState}
                                                renderInput={(params) => (
                                                    <TextField  {...params}
                                                        placeholder="Search for state..."
                                                        sx={sxTextField}
                                                    />
                                                )}
                                            />
                                        </FormControl>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="postalCode" className="block text-md font-medium text-gray-700">
                                            Postal Code <span className="text-red-500">*</span>
                                        </label>
                                        <TextField
                                            type="text"
                                            required
                                            autoComplete="postalCode"
                                            placeholder="Postal Code"
                                            name="postalCode"
                                            variant="outlined"
                                            sx={sxTextField}
                                            value={order.bill_address_attributes.zipcode}
                                            onChange={(e) =>
                                                setOrder(prev => ({
                                                    ...prev,
                                                    bill_address_attributes: {
                                                        ...prev.bill_address_attributes,
                                                        zipcode: e.target.value
                                                    },
                                                }))
                                            }
                                            error={Boolean(errors.zipcode)}
                                            helperText={errors.zipcode}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="phone" className="block text-md font-medium text-gray-700">
                                        Phone (optional) <span className="text-red-500">*</span>
                                    </label>
                                    <TextField
                                        type="text"
                                        required
                                        autoComplete="phone"
                                        placeholder="Phone (optional)"
                                        name="phone"
                                        variant="outlined"
                                        sx={sxTextField}
                                        value={order.bill_address_attributes.phone}
                                        onChange={(e) =>
                                            setOrder(prev => ({
                                                ...prev,
                                                bill_address_attributes: {
                                                    ...prev.bill_address_attributes,
                                                    phone: e.target.value
                                                },
                                            }))
                                        }
                                        error={Boolean(errors.phone)}
                                        helperText={errors.phone}
                                    />
                                </div>
                                <div className={`p-5 rounded-xl ${formCheck.checked3 ? 'border-green-500 border' : 'bg-gray-50 border border-gray-100'}
                                hover:shadow-lg transition-all duration-500 ease-out relative overflow-hidden group cursor-pointer backdrop-blur-sm
                                `}>
                                    <div className={`${formCheck.checked3 ? 'opacity-100' : 'opacity-0'} absolute inset-0  group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl"></div>
                                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100 to-teal-50 rounded-full blur-2xl"></div>
                                    </div>
                                    <FormControlLabel
                                        control={
                                            < Checkbox
                                                defaultChecked
                                                name="checked3"
                                                checked={formCheck.checked3}
                                                icon={<FaRegCircle />}
                                                checkedIcon={<FaCheckCircle />}
                                                sx={sxCheckBox}
                                                onChange={(_, checked) => {
                                                    // update state checkbox
                                                    setFormCheck(prev => ({ ...prev, checked3: checked }));

                                                    // lấy bill address từ order để copy qua ship
                                                    setOrder(prev => {
                                                        const bill = prev.bill_address_attributes;
                                                        return {
                                                            ...prev,
                                                            ship_address_attributes: checked
                                                                ? {
                                                                    ...prev.ship_address_attributes,
                                                                    firstname: bill.firstname,
                                                                    lastname: bill.lastname,
                                                                    address1: bill.address1,
                                                                    city: bill.city,
                                                                    phone: bill.phone,
                                                                    zipcode: bill.zipcode,
                                                                    state_name: bill.state_name,
                                                                    country_iso: bill.country_iso
                                                                }
                                                                : prev.ship_address_attributes // hoặc clear tùy logic
                                                        };
                                                    });
                                                }}
                                            />
                                        }
                                        onClick={(e) => e.stopPropagation()}
                                        label="Use this address for delivery."
                                        sx={sxControlLabel}
                                    />
                                    <div className={`${formCheck.checked3 ? 'opacity-5' : 'opacity-0'}
                                                            absolute inset-0 rounded-xl 
                                                            bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 
                                                             group-hover:opacity-5 
                                                            transition-opacity duration-500
                                                            -z-5`}></div>
                                    {!formCheck.checked3 && <FormHelperText sx={{ color: "#d32f2f" }}>{errorCheckBox}</FormHelperText>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-5">
                                <button className="md:px-16 px-4 md:text-md text-sm uppercase h-[50px] rounded-xl border border-green-600 text-green-600 font-semibold transition-transform hover:border-green-700 hover:scale-105"
                                    // disabled={activeStep === 1}
                                    onClick={() => {
                                        fnBackStep()
                                        setValueShippingFee("Free")
                                    }}
                                >
                                    Back
                                </button>
                                <button type="submit" className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 uppercase md:px-16 px-4 md:text-md text-sm to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                >
                                    {activeStep === lengthStep - 1 ? 'Finish' : 'Save and Continue'}
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                </button>
                            </div>
                        </div>
                    </form>
                    <ToastContainer position="top-right" autoClose={3000} />
                </div>
            }
        </>
    )
}
export default CheckOutAddress