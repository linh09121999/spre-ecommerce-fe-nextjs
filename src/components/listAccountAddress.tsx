
"use client"

import { Country, CountryInclude, ResAccountAddress_ListAll } from "@/interface/responseData/interfaceStorefront"
import { AddressInteface } from "@/interface/sendData/interfaceStorefront"
import { RemoveAnAddress, UpdateAnAddress } from "@/service/storefront/accountAddress"
import { ListAllCountries, RetrieveAContry } from "@/service/storefront/countries"
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront"
import { useState_ResCountries } from "@/useState/useStatestorefront"
import { Autocomplete, Dialog, DialogContent, FormControl, TextField } from "@mui/material"
import { useState } from "react"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { MdOutlineErrorOutline, MdOutlinePhoneIphone } from "react-icons/md"
import { toast, ToastContainer } from "react-toastify"
import type { SxProps, Theme } from "@mui/material"
import { LuMapPinHouse } from "react-icons/lu"

interface ResAccountAddress_ListAll_Prop extends ResAccountAddress_ListAll {
    fnListAddress: () => void
}

const ListAccountAddressPage: React.FC<ResAccountAddress_ListAll_Prop> = ({ data, fnListAddress }) => {
    const { loadingReadMore, setLoading, setSelectTab } = useStateGeneral()

    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-white)",
            height: '45px',
            // boxShadow: 'var(--shadow-lg)',
            padding: '3px 8px',
            transition: 'all 0.3s',
            fontSize: 'var(--text-xl)',
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

    const handleDelate = async (id: string) => {
        try {
            setLoading(true);
            const res = await RemoveAnAddress(id)
            fnListAddress()
            setSelectTab(1)
        } catch (error: any) {
            toast.error(`Delete Address: ` + error.response.data.error || error.message)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const [openUpdateAccountAddress, setOpenUpdateAccountAddress] = useState<boolean>(false)
    const [errorUpdateAccountAddress, setErrorUpdateAccountAddress] = useState<string>('')

    const [updateAccountAddress, setUpdateAccountAddress] = useState<AddressInteface>(
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

    const removeVietnameseTones = (str: string) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const handleChangeSearchCountry = (
        _: React.SyntheticEvent | null,
        newValue: Country | null
    ) => {
        if (!newValue) return;
        setUpdateAccountAddress(prev => ({
            ...prev,
            country_iso: newValue.attributes.iso
        }))
        getApiRetrieveCountry(newValue.attributes.iso, 'states')
    }

    const handleChangeSearchState = (_: React.SyntheticEvent | null,
        newValue: CountryInclude | null) => {
        if (!newValue) return;
        setUpdateAccountAddress(prev => ({
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
            firstname: updateAccountAddress.firstname,
            lastname: updateAccountAddress.lastname,
            address1: updateAccountAddress.address1,
            city: updateAccountAddress.city,
            zipcode: updateAccountAddress.zipcode,
            country_iso: updateAccountAddress.country_iso,
            phone: updateAccountAddress.phone
        } as any;
        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        const phone = updateAccountAddress.phone;
        if (phone && !/^(0[0-9]{9})$/.test(phone)) {
            newErrors.phone = "Invalid phone number (10 numbers, starting with 0)";
        }

        setErrorEmptyAccountAddress(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const [idAddress, setIdAddress] = useState<string>("")

    const handleUpdateAccountAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFieldsAccountAddress()) {
            return; // stop submit
        }

        const data: { address: AddressInteface } = {
            address: updateAccountAddress
        }

        if (idAddress === "") return

        try {
            setLoading(true)
            const response = await UpdateAnAddress(data, idAddress);
            setErrorUpdateAccountAddress("")
            fnListAddress()
            setOpenUpdateAccountAddress(false)
        } catch (error: any) {
            setErrorUpdateAccountAddress(error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {data.length > 0 ?
                <div className="flex flex-col gap-5 px-2">
                    {data.map((res) => (
                        <div
                            key={res.id}
                            className="
      w-full p-5 rounded-xl bg-white border border-gray-200 
      shadow-sm hover:shadow-lg 
      transition-all duration-500 ease-out
      hover:-translate-y-2 hover:border-green-300
      relative overflow-hidden
      group cursor-pointer
      backdrop-blur-sm
    "
                        >
                            {/* Gradient Background Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-green-100 to-teal-50 rounded-full blur-2xl"></div>
                            </div>

                            {/* Content Container */}
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">

                                {/* Main Information */}
                                <div className="flex flex-col gap-3">

                                    {/* Label Badge */}
                                    {res.attributes.label && (
                                        <div className=" items-center gap-2 max-w-[200px]">
                                            <span className="
               text-md font-semibold px-3 py-[4px] rounded-full bg-green-100 text-green-700 shadow-md backdrop-blur-md">
                                                {/* <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> */}
                                                {res.attributes.label}
                                            </span>
                                        </div>
                                    )}

                                    {/* Name */}
                                    <h3 className="
          text-2xl font-bold text-gray-900 
          group-hover:text-green-800 
          transition-colors duration-300
          truncate
        ">
                                        {res.attributes.firstname} {res.attributes.lastname}
                                    </h3>

                                    {/* Contact Information */}
                                    <div className="flex flex-col gap-1">

                                        {/* Phone */}
                                        {res.attributes.phone && (
                                            <div className="flex items-center gap-1 text-gray-700">
                                                <div className=" transition-colors duration-300">
                                                    <MdOutlinePhoneIphone className="text-green-600 text-sm" />
                                                </div>
                                                <span className="font-medium text-gray-900">{res.attributes.phone}</span>
                                            </div>
                                        )}

                                        {/* Address */}
                                        <div className="flex items-center gap-1">
                                            <div className=" transition-colors duration-300">
                                                <LuMapPinHouse className="text-green-600 text-sm" />
                                            </div>
                                            <div className="flex flex-wrap gap-1 text-gray-600 text-sm leading-relaxed">
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
                                                        <span key={index} className="text-gray-700">
                                                            {part}{index < array.length - 1 ? ',' : ''}
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 self-end lg:self-auto">
                                    <button
                                        aria-label="Edit contact"
                                        className="
            p-3 rounded-xl bg-white text-green-600 
            border border-green-200
            hover:bg-green-50 hover:text-green-700 
            hover:border-green-300
            transition-all duration-300
            hover:scale-105
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
          "
                                        onClick={() => {
                                            setOpenUpdateAccountAddress(true)
                                            getApiListCountries()
                                            setIdAddress(res.id)
                                            setErrorUpdateAccountAddress("")
                                            setUpdateAccountAddress(
                                                {
                                                    firstname: res.attributes.firstname,
                                                    lastname: res.attributes.lastname,
                                                    company: res.attributes.company ?? "",
                                                    address1: res.attributes.address1,
                                                    address2: res.attributes.address2 ?? "",
                                                    city: res.attributes.city,
                                                    phone: res.attributes.phone,
                                                    zipcode: res.attributes.zipcode,
                                                    state_name: res.attributes.state_name,
                                                    country_iso: res.attributes.country_iso,
                                                    label: res.attributes.label ?? "",
                                                }
                                            )
                                        }}
                                    >
                                        <FaEdit size={20} />
                                    </button>

                                    <button
                                        aria-label="Delete contact"
                                        className="
            p-3 rounded-xl bg-white text-red-600 
            border border-red-200
            hover:bg-red-50 hover:text-red-700 
            hover:border-red-300
            transition-all duration-300
            hover:scale-105
            shadow-sm hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
          "
                                        onClick={() => handleDelate(res.id)}
                                    >
                                        <FaTrashAlt size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Hover Border Effect */}
                            <div className="
      absolute inset-0 rounded-xl 
      bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 
      opacity-0 group-hover:opacity-5 
      transition-opacity duration-500
      -z-5
    "></div>
                        </div>
                    ))}

                    {loadingReadMore && (
                        <p className="text-center py-4 text-gray-500 animate-pulse">
                            loading more...
                        </p>
                    )}
                    <Dialog open={openUpdateAccountAddress} onClose={() => setOpenUpdateAccountAddress(false)}>
                        <DialogContent
                            sx={{
                                padding: 0,
                                borderRadius: "18px",
                                overflow: "hidden",
                                background: "transparent",
                            }}
                        >
                            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                                <div className="w-full max-w-3xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl p-8 border border-white/40 shadow-2xl relative overflow-hidden">
                                    <button
                                        onClick={() => setOpenUpdateAccountAddress(false)}
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
                                        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-green-600 to-emerald-700 text-transparent bg-clip-text mb-2">
                                            Update An Address
                                        </h1>
                                        {errorUpdateAccountAddress && (
                                            <div className="mb-6 p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                                <MdOutlineErrorOutline className="mx-auto" size={21} />
                                                <span>{errorUpdateAccountAddress}</span>
                                            </div>
                                        )}
                                        <form onSubmit={handleUpdateAccountAddress} className="flex flex-col gap-5">
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
                                                    value={updateAccountAddress.label}
                                                    onChange={(e) =>
                                                        setUpdateAccountAddress(prev => ({
                                                            ...prev,
                                                            label: e.target.value
                                                        }))
                                                    }
                                                />
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
                                                                error={Boolean(errorEmptyAccountAddress.country_iso)}
                                                                helperText={errorEmptyAccountAddress.country_iso}
                                                            />
                                                        )}
                                                    />
                                                </FormControl>
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
                                                        value={updateAccountAddress.firstname}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
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
                                                        value={updateAccountAddress.lastname}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
                                                                ...prev,
                                                                lastname: e.target.value
                                                            }))
                                                        }
                                                        error={Boolean(errorEmptyAccountAddress.lastname)}
                                                        helperText={errorEmptyAccountAddress.lastname}
                                                    />
                                                </div>

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
                                                    value={updateAccountAddress.company}
                                                    onChange={(e) =>
                                                        setUpdateAccountAddress(prev => ({
                                                            ...prev,
                                                            company: e.target.value
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className='grid grid-cols-2 gap-3'>
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
                                                        value={updateAccountAddress.address1}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
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
                                                        value={updateAccountAddress.address2}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
                                                                ...prev,
                                                                address2: e.target.value
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className='grid grid-cols-3 gap-3'>
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
                                                        value={updateAccountAddress.city}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
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
                                                        value={updateAccountAddress.zipcode}
                                                        onChange={(e) =>
                                                            setUpdateAccountAddress(prev => ({
                                                                ...prev,
                                                                zipcode: e.target.value
                                                            }))
                                                        }
                                                        error={Boolean(errorEmptyAccountAddress.zipcode)}
                                                        helperText={errorEmptyAccountAddress.zipcode}
                                                    />
                                                </div>
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
                                                    value={updateAccountAddress.phone}
                                                    onChange={(e) =>
                                                        setUpdateAccountAddress(prev => ({
                                                            ...prev,
                                                            phone: e.target.value
                                                        }))
                                                    }
                                                />
                                            </div>
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenUpdateAccountAddress(false)}
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
                                                    className="
                                                                        flex-1 py-3 rounded-xl 
                                                                        text-lg font-semibold text-white
                                                                        bg-gradient-to-br from-green-500 to-emerald-600
                                                                        hover:from-green-600 hover:to-emerald-700
                                                                        shadow-md hover:shadow-lg
                                                                        transition-all duration-300
                                                                        relative overflow-hidden
                                                                    "
                                                >
                                                    <span className="relative z-10">Update An Address</span>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                :
                <div className="flex flex-col gap-1">
                    <img src="../../no-address.webp" alt="no order" className="w-[200px] mx-auto" />
                    <p className="text-center text-gray-500 text-md">No addresses yet.</p>
                    <p className="text-center text-gray-500 text-sm">Add a delivery address to proceed with checkout.</p>
                </div>
            }

            <ToastContainer position="top-right" autoClose={3000} />
        </>
    )
}
export default ListAccountAddressPage