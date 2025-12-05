"use client"
import { ResAccount } from "@/interface/responseData/interfaceStorefront"
import type { SxProps, Theme } from "@mui/material/styles";
import {
    TextField,
    InputAdornment, Avatar, Stack, Badge, styled
} from '@mui/material'
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineErrorOutline, MdOutlinePhoneIphone } from "react-icons/md";
import { useState } from "react";
import { UserUpdate } from "@/interface/sendData/interfaceStorefront";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { UpdateAnAccount } from "@/service/storefront/account";
import { TbUserEdit } from "react-icons/tb";

const StyledBadge = styled(Badge)(({ theme }) => ({
    width: '150px',
    height: '150px',
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

interface ResAccount_Prop extends ResAccount {
    fnRetrieveAccount: () => void
}

const PersonalDetail: React.FC<ResAccount_Prop> = ({ data, included, fnRetrieveAccount }) => {
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

    const { setLoading } = useStateGeneral()

    const [openEdit, setOpenEdit] = useState<Boolean>(false)
    const [errorUpdateAccount, setErrorUpdateAccount] = useState<string>("")
    const [updateAccount, setUpdateAccount] = useState<UserUpdate>(
        {
            email: "",
            first_name: "",
            last_name: "",
            selected_locale: "",
            bill_address_id: "",
            ship_address_id: "",
            password: "",
            password_confirmation: "",
            phone: ""
        }
    )

    const handleEdit = () => {
        setOpenEdit(!openEdit)
        setUpdateAccount({
            email: data.attributes.email,
            first_name: data.attributes.first_name,
            last_name: data.attributes.last_name,
            selected_locale: "en",
            bill_address_id: "1",
            ship_address_id: "1",
            password: "",
            password_confirmation: "",
            phone: data.attributes.phone
        })
    }

    const [error, setError] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        password: "",
        password_confirmation: "",
    })

    const validateFields = () => {
        let newErrors: any = {};
        const fields = {
            email: updateAccount.email,
            first_name: updateAccount.first_name,
            last_name: updateAccount.last_name,
            password: updateAccount.password,
            password_confirmation: updateAccount.password_confirmation,
            phone: updateAccount.phone
        } as any;

        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        const phone = updateAccount.phone;
        if (phone && !/^(0[0-9]{9})$/.test(phone)) {
            newErrors.phone = "Invalid phone number (10 numbers, starting with 0)";
        }

        if (updateAccount.password) {
            if (updateAccount.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters!";
            }

            if (!/\d/.test(updateAccount.password)) {
                newErrors.password = "Password must contain at least one number!";
            }
        }

        // Password confirmation match
        if (updateAccount.password && updateAccount.password_confirmation) {
            if (updateAccount.password !== updateAccount.password_confirmation) {
                newErrors.password_confirmation = "Passwords do not match!";
            }
        }

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);


    const handleUpdateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) {
            return; // stop submit
        }

        const data: { user: UserUpdate } = {
            user: updateAccount
        }

        try {
            setLoading(true)
            const response = await UpdateAnAccount(data);
            setErrorUpdateAccount("")
            fnRetrieveAccount()
            setOpenEdit(false)
        } catch (error: any) {
            setErrorUpdateAccount(error.response.data.error)
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="flex flex-col gap-10">
                {/* Header section with avatar and basic info */}
                <div className="flex flex-col md:flex-row items-center gap-5">
                    <div className="relative">
                        <Stack direction="row" spacing={2} sx={{ margin: '0 auto' }}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar
                                    sx={sxAvata}
                                >
                                    <span className="text-5xl">
                                        {data.attributes.first_name.charAt(0).toUpperCase() ?? <FaRegUser className="mx-auto" />}
                                    </span>
                                </Avatar>
                            </StyledBadge >
                        </Stack>

                    </div>

                    <div className="flex flex-col text-center md:text-left gap-3 ">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-3xl font-semibold text-gray-800">
                                {data.attributes.first_name} {data.attributes.last_name}
                            </h1>
                            <p className="text-gray-600">{data.attributes.email}</p>
                        </div>

                        <button
                            aria-label="Edit personal"
                            onClick={() => handleEdit()}
                            className=" justify-center text-lg
                            px-4 py-2 rounded-lg bg-white text-green-600
                            border border-green-200
                            hover:bg-green-50 hover:text-green-700 
                            hover:border-green-300
                            transition-all duration-300
                            hover:scale-105
                            shadow-sm hover:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                            flex items-center gap-2 mx-auto md:mx-0
                            "
                        >
                            <TbUserEdit size={21} />
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                {/* Contact details section */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-md tracking-wide text-black/70">Contact Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 gap-2">
                        {/* Item */}
                        <div className="group flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all duration-300">
                            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300 flex-shrink-0">
                                <FaRegUser className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-semibold text-gray-800">
                                    {data.attributes.first_name} {data.attributes.last_name}
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="group flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all duration-300">
                            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300 flex-shrink-0">
                                <MdOutlineEmail className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-semibold text-gray-800">{data.attributes.email}</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="group flex items-center gap-4 p-5 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all duration-300">
                            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors duration-300 flex-shrink-0">
                                <MdOutlinePhoneIphone className="text-green-600 text-xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="font-semibold text-gray-800">{data.attributes.phone}</p>
                            </div>
                        </div>
                    </div>

                </div>
                {openEdit &&
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-md uppercase tracking-wide text-black/70">Edit Persional</h3>
                            <p className="text-md text-gray-500">Please update your contact details</p>
                        </div>
                        {errorUpdateAccount && (
                            <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                <MdOutlineErrorOutline className="mx-auto" size={21} />
                                <span>{errorUpdateAccount}</span>
                            </div>
                        )}
                        <form onSubmit={handleUpdateAccount} className="flex flex-col gap-5 w-full xl:w-[800px] mr-auto transition-aal duration-300">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="block text-md font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <TextField
                                    required
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Email"
                                    name="email"
                                    variant="outlined"
                                    sx={sxTextField}
                                    value={updateAccount.email}
                                    onChange={(e) =>
                                        setUpdateAccount(prev => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }
                                    error={Boolean(error.email)}
                                    helperText={error.email}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="first_name" className="block text-md font-medium text-gray-700">
                                        First name <span className="text-red-500">*</span>
                                    </label>
                                    <TextField
                                        required
                                        type="text"
                                        autoComplete="first_name"
                                        placeholder="First name"
                                        name="first_name"
                                        variant="outlined"
                                        sx={sxTextField}
                                        value={updateAccount.first_name}
                                        onChange={(e) =>
                                            setUpdateAccount(prev => ({
                                                ...prev,
                                                first_name: e.target.value
                                            }))
                                        }
                                        error={Boolean(error.first_name)}
                                        helperText={error.first_name}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="last_name" className="block text-md font-medium text-gray-700">
                                        Last name <span className="text-red-500">*</span>
                                    </label>
                                    <TextField
                                        required
                                        type="text"
                                        autoComplete="last_name"
                                        placeholder="Last name"
                                        name="last_name"
                                        variant="outlined"
                                        sx={sxTextField}
                                        value={updateAccount.last_name}
                                        onChange={(e) =>
                                            setUpdateAccount(prev => ({
                                                ...prev,
                                                last_name: e.target.value
                                            }))
                                        }
                                        error={Boolean(error.last_name)}
                                        helperText={error.last_name}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="block text-md font-medium text-gray-700">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <TextField
                                    required
                                    type="text"
                                    autoComplete="phone"
                                    placeholder="Phone"
                                    name="phone"
                                    variant="outlined"
                                    sx={sxTextField}
                                    value={updateAccount.phone}
                                    onChange={(e) =>
                                        setUpdateAccount(prev => ({
                                            ...prev,
                                            phone: e.target.value
                                        }))
                                    }
                                    error={Boolean(error.phone)}
                                    helperText={error.phone}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password" className="block text-md font-medium text-gray-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <TextField
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="password"
                                    placeholder="Password"
                                    name="password"
                                    variant="outlined"
                                    sx={sxTextField}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <button onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    value={updateAccount.password}
                                    onChange={(e) =>
                                        setUpdateAccount(prev => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }
                                    error={Boolean(error.password)}
                                    helperText={error.password}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password_confirmation" className="block text-md font-medium text-gray-700">
                                    Password confirmation <span className="text-red-500">*</span>
                                </label>
                                <TextField
                                    required
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    autoComplete="password_confirmation"
                                    placeholder="Password confirmation"
                                    name="password_confirmation"
                                    variant="outlined"
                                    sx={sxTextField}
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <button onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                                                        {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
                                                    </button>
                                                </InputAdornment>
                                            )
                                        }
                                    }}
                                    value={updateAccount.password_confirmation}
                                    onChange={(e) =>
                                        setUpdateAccount(prev => ({
                                            ...prev,
                                            password_confirmation: e.target.value
                                        }))
                                    }
                                    error={Boolean(error.password_confirmation)}
                                    helperText={error.password_confirmation}
                                />
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setOpenEdit(false)}
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
                                    <span className="relative z-10">Update An Account</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}
export default PersonalDetail