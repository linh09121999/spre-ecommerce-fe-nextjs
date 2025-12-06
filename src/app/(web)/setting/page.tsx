"use client"
import ListAccountAddressPage from '@/components/listAccountAddress';
import TableAccountOrder from '@/components/tableAccountOrder';
import { CreateAccountAddress, ListAccountAddress } from '@/service/storefront/accountAddress';
import { ListAllOrders } from '@/service/storefront/accountOrders';
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';
import { useState_ResAccount, useState_ResAccountAddress, useState_ResAccountCreditCard, useState_ResAccountOrder, useState_ResCheckoutPayments, useState_ResCountries } from '@/useState/useStatestorefront';
import { Autocomplete, Dialog, DialogContent, FormControl, IconButton, InputAdornment, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from "react";
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { toast, ToastContainer } from 'react-toastify';
import type { SxProps, Theme } from "@mui/material/styles";
import { AccountAddress_Attributes, Country, CountryInclude } from '@/interface/responseData/interfaceStorefront';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { ListAllCountries, RetrieveAContry } from '@/service/storefront/countries';
import { CheckoutPayment, type AddressInteface } from '@/interface/sendData/interfaceStorefront'
import PersonalDetail from '@/components/personalDetail';
import { RetrieveAnAccount } from '@/service/storefront/account';
import { ListAllCreditCards } from '@/service/storefront/accountCreditCards';
import ListAccountStoreCredits from '@/components/lisAccountStoreCredits';
import { CreateNewPayment, ListPaymentMethods } from '@/service/storefront/checkoutPayments';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRegFileExcel } from 'react-icons/fa';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
} from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/stripePaymentForm';
import { useAuth } from '@/components/contexts/AuthContext';

const SettingWeb: React.FC = () => {
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

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            },
            sx: {
                maxWidth: 'calc(50% - 32px)',
                '& .MuiMenuItem-root': {
                    whiteSpace: 'normal',
                    wordBreak: 'wordBreak',
                    minHeight: '30px'
                },
                '& .MuiMenuItem-root:hover': {
                    backgroundColor: 'var(--color-green-100) !important',
                    color: 'var(--color-green-700) !important',
                    fontWeight: 600
                },
            }
        },
    };

    const sxSelect: SxProps<Theme> = {
        borderRadius: "var(--radius-xl)",
        width: '100%',
        background: "var(--color-white)",
        height: '45px',
        padding: '3px 8px',
        transition: 'all 0.3s',
        fontSize: 'var(--text-xl)',
        border: 'none',
    };


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

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const { resCountries_List, setResCountries_List, resCountries_Retrieve, setResCountries_Retrieve } = useState_ResCountries()

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

    const { setLoadingReadMore, loadingReadMore,
        setLoading, setSelectNav,
        selectTab, setSelectTab, loading
    } = useStateGeneral()

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            getApiListOrder(1, 12, "payments,shipments,user,billing_address")
        } else {
            router.push('/')
        }
    }, [isAuthenticated])

    useEffect(() => {
        setSelectNav(null)
        AOS.init({
            duration: 2000,
            once: false,
            mirror: true,
        });

    }, [])

    const { setResAccountOrder_All, resAccountOrder_All } = useState_ResAccountOrder()

    const getApiListOrder = async (page: number, per_page: number, include: string) => {
        try {
            setLoading(true);
            const res = await ListAllOrders({ page, per_page, include })
            setResAccountOrder_All(res.data)
        } catch (error: any) {
            toast.error(`Wish lists: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
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
        if (selectTab === 1) {
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
        }
    }, [loadingReadMore, currentPageAccountAddress, totalPageAccountAddress, getApiListAllAddress]);

    const { resAccountCreditCard_All, setResAccountCreditCard_All } = useState_ResAccountCreditCard()

    const getApiListAllCreditCart = async (include: string) => {
        try {
            setLoading(true);
            const res = await ListAllCreditCards({ include })
            setResAccountCreditCard_All(res.data)
        } catch (error: any) {
            toast.error(`Wish lists: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const handleSelectTab = (id: number) => {
        setSelectTab(id)
        if (id === 0) {
            getApiListOrder(1, 12, "payments,shipments,user,billing_address")
        }
        if (id === 1) {
            getApiListAllAddress(1, 12)
        }
        if (id === 3) {

        }
        if (id === 4) {
            getApiListAllCreditCart("payment_method")
        }
    }

    const [inputValueAccountAddress, setInputValueAccountAddress] = useState<string>("")

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

    const handleChangeSearchCountry = (
        _: React.SyntheticEvent | null,
        newValue: Country | null
    ) => {
        if (!newValue) return;
        setCreateAccountAddress(prev => ({
            ...prev,
            country_iso: newValue.attributes.iso
        }))
        getApiRetrieveCountry(newValue.attributes.iso, 'states')
    }

    const handleChangeSearchState = (_: React.SyntheticEvent | null,
        newValue: CountryInclude | null) => {
        if (!newValue) return;
        setCreateAccountAddress(prev => ({
            ...prev,
            state_name: newValue.attributes.abbr
        }))
    }

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

    const { resCheckoutPayments_List, setResCheckoutPayments_List } = useState_ResCheckoutPayments()

    const getApiListPaymentMethods = async () => {
        try {
            setLoading(true)
            const response = await ListPaymentMethods();
            setResCheckoutPayments_List(response.data)
        } catch (error: any) {
            toast.error(`List payment method: ` + error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const [openCreateCredit, setOpenCreateCredit] = useState<boolean>(false)
    const [errorCreateCredit, setErrorCreateCredit] = useState<string>('')

    const [idPaymentMethod, setIdPaymentMethod] = useState<string>("")

    const [publishableKey, setPublishableKey] = useState<string>("");
    const [stripePromise, setStripePromise] = useState<any>(null);

    const handleChangeCreditCard = (event: SelectChangeEvent) => {
        const selectedId = event.target.value;
        setIdPaymentMethod(selectedId);

        const selectedPaymentMethod = resCheckoutPayments_List?.data.find(
            (item) => item.id === selectedId
        );

        if (selectedPaymentMethod && selectedPaymentMethod.attributes.publishable_key) {
            const publishableKey = selectedPaymentMethod.attributes.publishable_key;
            setPublishableKey(publishableKey);

            // Khởi tạo Stripe với publishable_key được chọn
            const stripePromise = loadStripe(publishableKey);
            setStripePromise(stripePromise);
        }
    };

    const handleCreateCredit = async (paymentMethodId: string, cardData: any) => {
        if (!idPaymentMethod) {
            setErrorCreateCredit("Please select a payment method first");
            return;
        }

        const gatewayPaymentProfileId =
            resAccountCreditCard_All?.data?.[0]?.attributes?.gateway_payment_profile_id
            ?? paymentMethodId;

        const data: CheckoutPayment = {
            payment_method_id: idPaymentMethod,
            source_attributes: {
                gateway_payment_profile_id: gatewayPaymentProfileId,
                cc_type: cardData.cc_type,
                last_digits: cardData.last_digits,
                month: cardData.month,
                year: cardData.year,
                name: cardData.name
            }
        };

        const include = "shipping_address";

        try {
            setLoading(true);
            const response = await CreateNewPayment(data, { include });
            setErrorCreateCredit("");
            setOpenCreateCredit(false);
            getApiListAllCreditCart("payment_method");
            toast.success("Credit card added successfully!");

            // Reset form
            setIdPaymentMethod("");
            setPublishableKey("");
            setStripePromise(null);
        } catch (error: any) {
            setErrorCreateCredit(error.response?.data?.error || "Failed to add credit card");
            console.error('Error creating credit:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExportOrder = () => {
        if (!resAccountOrder_All || resAccountOrder_All.data.length === 0) {
            toast.error("There is no data to export to Excel!");
            return;
        }

        const dataExport = resAccountOrder_All.data.map(item => {
            return {
                id: item.id,
                ...item.attributes
            }
        })

        const ws = XLSX.utils.json_to_sheet(dataExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Order");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

        const file = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(file, `resCategory_${new Date().toISOString().slice(0, 10)}.xlsx`);
    }

    const [editModeAddress, setEditModeAddress] = useState<boolean>(false)

    return (
        <>
            <div className='max-w-[1535px] mx-auto grid lg:grid-cols-[300px_1fr] py-5 max-2xl:px-5 lg:gap-10 gap-5'>
                <aside className="grid h-fit max-lg:hidden"
                    data-aos="fade-right"
                    data-aos-duration="3000"
                >
                    <div className="flex items-center justify-between h-[40px]">
                        <h2 className="text-xl font-semibold">My Account</h2>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {[
                            { id: 0, title: "Orders & Returns" },
                            { id: 1, title: "Addresses" },
                            { id: 2, title: "Personal details" },
                            { id: 3, title: "Gift Cards" },
                            { id: 4, title: "Store Credits" },
                        ].map(({ id, title }) => (
                            <div
                                key={id}
                                className={`${selectTab === id ? 'pl-2 border-l-[4px]  bg-green-100 border-l-green-500 text-green-800' : 'text-gray-500'} py-4 hover:pl-2 transition-all duration-300 hover:bg-green-50 hover:text-green-600 text-lg`}
                                onClick={() => handleSelectTab(id)}
                            >{title}</div>
                        ))}
                    </div>
                </aside>
                <div className="lg:hidden flex overflow-x-auto scroll-x gap-5 py-3 -mt-3"
                    data-aos="fade-right"
                    data-aos-duration="3000"
                >
                    {[
                        { id: 0, title: "Orders & Returns" },
                        { id: 1, title: "Addresses" },
                        { id: 2, title: "Personal details" },
                        { id: 3, title: "Gift Cards" },
                        { id: 4, title: "Store Credits" },
                    ].map(({ id, title }) => (
                        <button
                            aria-label="click setting"
                            key={id}
                            className={`${selectTab === id ? ' border border-green-700 shadow-md shadow-green-700/30' : 'bg-white shadow-md border border-slate-100'} group-hover:shadow-lg text-lg flex group items-center  group-hover:shadow-lg w-fit  gap-3 px-4 h-[45px] rounded-xl  transition-all duration-300`}
                            onClick={() =>
                                handleSelectTab(id)
                            }>
                            <p className={`${selectTab === id ? 'text-green-700 font-bold' : 'text-slate-700 group-hover:text-green-700'} max-sm:text-sm text-lg whitespace-nowrap transition-all duration-500`}>{title}</p>
                        </button>
                    ))}
                </div>
                <section className="flex flex-col gap-4 md:gap-5 max-lg:-mt-3"
                    data-aos="fade-left"
                    data-aos-duration="3000"
                >
                    {selectTab === 0 &&
                        <>
                            <div className="items-center flex justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                        Order
                                    </h3>
                                    <div className="text-sm text-slate-500">Order list — track payment & shipping status</div>
                                </div>
                                <button
                                    aria-label='add address'
                                    className="h-[45px] w-[45px] rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                    onClick={() => {
                                        handleExportOrder()
                                    }}
                                ><FaRegFileExcel size={18} className='mx-auto' />
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>
                            </div>
                            <div className="grid">
                                <div className="w-full overflow-x-auto scroll-x">
                                    {resAccountOrder_All &&
                                        <TableAccountOrder data={resAccountOrder_All?.data} included={resAccountOrder_All?.included} meta={resAccountOrder_All?.meta} links={resAccountOrder_All?.links} />
                                    }
                                </div>
                            </div>
                        </>
                    }
                    {selectTab === 1 &&
                        <>
                            <div className="items-center grid sm:grid-cols-2 gap-5">
                                <div className='max-sm:items-center max-sm:flex max-sm:justify-between max:sm:gap-5'>
                                    <div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                            Addresses
                                        </h3>
                                        <div className="text-sm text-slate-500">Manage, search and edit addresses</div>
                                    </div>
                                    <div className="sm:hidden ">
                                        <button
                                            onClick={() => setEditModeAddress(!editModeAddress)}
                                            className="flex hover:underline transition-all duration-300 items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition"
                                        >
                                            <span className="">{editModeAddress ? "Done" : "Edit"}</span>
                                        </button>
                                    </div>
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
                                        className="h-[45px] max-sm:hidden w-[45px] rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                        onClick={() => {
                                            getApiListCountries()
                                            setOpenCreateAccountAddress(true)
                                        }}
                                    ><IoMdAdd size={18} className='mx-auto' />
                                        <div className="absolute inset-0 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                        </div>
                                        <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>

                                </div>
                                <button
                                    aria-label='add address'
                                    className="sm:hidden h-[45px] gap-3 max-sm:text-sm text-lg whitespace-nowrap items-center rounded-xl border-[3px] border-dashed transition-all duration-300 border-gray-200 hover:shadow-lg"
                                    onClick={() => {
                                        getApiListCountries()
                                        setOpenCreateAccountAddress(true)
                                    }}
                                >
                                    Add Address
                                </button>
                            </div>
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

                                                    <div className="grid grid-cols-2 mt-3 gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setOpenCreateAccountAddress(false)}
                                                            className="
                                    flex-1 py-3 rounded-xl 
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
                                                            className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
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
                            <div className="grid grid-cols-1">
                                {(filterAccountAddress) &&
                                    <ListAccountAddressPage data={filterAccountAddress} fnListAddress={() => getApiListAllAddress(1, 12)} editMode={editModeAddress} />
                                }
                            </div>
                        </>
                    }
                    {selectTab === 2 &&
                        <>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                Personal details</h3>
                            <div className="grid">
                                {resAccount?.data &&
                                    <PersonalDetail data={resAccount.data} included={resAccount.included ?? []} fnRetrieveAccount={() => getApiAccount("default_billing_address")} />
                                }
                            </div>
                        </>
                    }
                    {selectTab === 3 &&
                        <>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                Gift Cards
                            </h3>
                            <div className="grid">
                                <div className="flex flex-col gap-1">
                                    <img src="../../gift-card.svg" alt="no gift" className="w-[200px] opacity-10 mx-auto" />
                                    <p className="text-center text-gray-500 text-md">You currently have no gift cards</p>
                                </div>
                            </div>
                        </>
                    }
                    {selectTab === 4 &&
                        <>
                            <div className="items-center flex justify-between">
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text">
                                    Store Credits
                                </h3>
                                {/* <button
                                    aria-label='add address'
                                    className="h-[45px] w-[45px] rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"

                                    onClick={() => {
                                        getApiListPaymentMethods()
                                        setOpenCreateCredit(true)
                                    }}
                                >
                                    <IoMdAdd size={18} className='mx-auto' />
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    </div>
                                    <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                </button> */}
                            </div>
                            <Dialog open={openCreateCredit} onClose={() => setOpenCreateCredit(false)} maxWidth="md" fullWidth>
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
                                                onClick={() => {
                                                    setOpenCreateCredit(false);
                                                    setIdPaymentMethod("");
                                                    setPublishableKey("");
                                                    setStripePromise(null);
                                                    setErrorCreateCredit("");
                                                }}
                                                className="absolute top-3 right-3 w-10 h-10 z-50 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-md shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-white/60"
                                            >
                                                <span className="text-gray-600 text-xl font-bold">×</span>
                                            </button>

                                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-200/30 rounded-full blur-xl"></div>
                                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-200/30 rounded-full blur-xl"></div>

                                            <div className="relative z-10">
                                                <h1 className="md:text-2xl text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                                                    Add Credit Card
                                                </h1>

                                                <div className="flex flex-col gap-1 mt-3">
                                                    <label className="block text-md font-medium text-gray-700 ">
                                                        Payment Method <span className="text-red-500">*</span>
                                                    </label>
                                                    <Select
                                                        MenuProps={MenuProps}
                                                        sx={sxSelect}
                                                        value={idPaymentMethod}
                                                        onChange={handleChangeCreditCard}
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            <em>Select a payment method</em>
                                                        </MenuItem>
                                                        {resCheckoutPayments_List?.data.map((data) => (
                                                            <MenuItem key={data.id} value={data.id}>
                                                                {data.attributes.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </div>

                                                {publishableKey && stripePromise ? (
                                                    <Elements stripe={stripePromise}>
                                                        <StripePaymentForm
                                                            onSubmit={handleCreateCredit}
                                                            loading={loading}
                                                            error={errorCreateCredit}
                                                            publishableKey={publishableKey}
                                                        />
                                                    </Elements>
                                                ) : (
                                                    <div className="text-center py-8 text-gray-500">
                                                        Please select a payment method to continue
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <div className="grid">
                                {resAccountCreditCard_All &&
                                    <ListAccountStoreCredits data={resAccountCreditCard_All.data} included={resAccountCreditCard_All.included} fnCredit={() => getApiListAllCreditCart("payment_method")} />
                                }
                            </div>
                        </>
                    }
                </section>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}

export default SettingWeb;