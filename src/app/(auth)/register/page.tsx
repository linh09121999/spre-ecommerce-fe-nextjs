"use client"
import { useRouter } from "next/navigation";
import type { SxProps, Theme } from "@mui/material/styles";
import React, { useState, useEffect, useCallback } from "react";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { MdOutlineEmail, MdOutlineErrorOutline, MdOutlineLock } from "react-icons/md";
import { InputAdornment, TextField } from "@mui/material";
import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { User } from "@/interface/sendData/interfaceStorefront";
import { CreateAnAccount } from "@/service/storefront/account";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const Register: React.FC = () => {
    const rounter = useRouter()
    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "10px",
            background: "var(--color-white)",
            height: '45px',
            // boxShadow: 'var(--shadow-lg)',
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

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const { loading, setLoading } = useStateGeneral()

    useEffect(() => {
        setLoading(false);
    }, [])

    const [errorRegister, setErrorRegister] = useState<string>('')

    const [register, setRegister] = useState(
        {
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            password_confirmation: ""
        }
    )

    const [error, setError] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirmation: ""
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState<boolean>(false);

    const validateFields = () => {
        let newErrors: any = {};
        const fields = {
            email: register.email,
            first_name: register.first_name,
            last_name: register.last_name,
            password: register.password,
            password_confirmation: register.password_confirmation,
        } as any;
        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        // Password rule: min 8 chars + at least 1 number
        if (register.password) {
            if (register.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters!";
            }

            if (!/\d/.test(register.password)) {
                newErrors.password = "Password must contain at least one number!";
            }
        }

        // Password confirmation match
        if (register.password && register.password_confirmation) {
            if (register.password !== register.password_confirmation) {
                newErrors.password_confirmation = "Passwords do not match!";
            }
        }

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateFields()) {
            return; // stop submit
        }

        const data: { user: User } = {
            user: {
                email: register.email,
                first_name: register.first_name,
                last_name: register.last_name,
                selected_locale: 'en',
                password: register.password,
                password_confirmation: register.password_confirmation,
                public_metadata: {
                    user_segment: 'supplier'
                },
                private_metadata: {
                    has_abandoned_cart: false
                }
            }
        }
        try {
            setLoading(true);
            const res = await CreateAnAccount(data)
            setErrorRegister("")
            rounter.push('/login')
        } catch (error: any) {
            setErrorRegister(error.response.data.error_description ?? error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }

    }

    return (
        <>
            <div className="min-h-screen p-5 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="fixed inset-0 bg-gradient-to-br from-black via-emerald-950/50 to-black bg-[length:400%_400%] animate-gradient"></div>

                {/* Particles */}
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        particles: {
                            number: { value: 80 },
                            color: { value: ["#10b981", "#06b6d4"] },
                            shape: { type: "circle" },
                            opacity: { value: 0.5, random: true },
                            size: { value: 3, random: true },
                            links: { enable: true, distance: 150, color: "#10b981", opacity: 0.2, width: 1 },
                            move: { enable: true, speed: 2, outModes: "out" },
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: "repulse" },
                                onClick: { enable: true, mode: "push" },
                            },
                        },
                        detectRetina: true,
                    }}
                />

                {/* Floating Orbs */}
                <div className="fixed -top-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-30 animate-float"></div>
                <div className="fixed -bottom-52 -right-40 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-3xl opacity-25 animate-float2"></div>

                {/* Grain Texture */}
                <div
                    className="fixed inset-0 opacity-5 pointer-events-none"
                    style={{ background: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
                ></div>
                <div className="relative max-w-[600px] w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl  lg:p-10 md:p-5 p-3 shadow-2xl overflow-hidden
                    before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-emerald-500/20 before:via-transparent before:to-cyan-500/20 before:blur-2xl before:-z-10">
                    <div className="md:gap-5 gap-3 flex flex-col justify-center">
                        <img
                            className="relative w-36 drop-shadow-2xl 
        animate-[float_4s_ease-in-out_infinite] transition-transform duration-300 hover:scale-105 mx-auto"
                            alt="Spree Logo"
                            src="../../LogoFullBlack.webp"
                        />
                        <h2 className="md:text-2xl text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                            Create Your Account
                        </h2>
                        {errorRegister &&
                            <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                <MdOutlineErrorOutline className="mx-auto" size={21} />{errorRegister}</div>
                        }

                        <form
                            onClick={handleSubmit}
                            className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="md:text-xl text-md font-medium text-gray-300">
                                    Email
                                </label>
                                <TextField
                                    type="email"
                                    required
                                    autoComplete="email"
                                    placeholder="Email"
                                    name="email"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start"
                                                >
                                                    <MdOutlineEmail />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                    value={register.email}
                                    variant="outlined"
                                    sx={sxTextField}
                                    onChange={(e) =>
                                        setRegister(prev =>
                                        ({
                                            ...prev,
                                            username: e.target.value
                                        })
                                        )
                                    }
                                    error={Boolean(error.email)}
                                    helperText={error.email}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="firstName" className="md:text-xl text-md font-medium text-gray-300">
                                        First name
                                    </label>
                                    <TextField
                                        type="text"
                                        required
                                        autoComplete="firstName"
                                        placeholder="First name"
                                        name="firstName"
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start"
                                                    >
                                                        <FaRegUser />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        value={register.first_name}
                                        variant="outlined"
                                        sx={sxTextField}
                                        onChange={(e) =>
                                            setRegister(prev =>
                                            ({
                                                ...prev,
                                                first_name: e.target.value
                                            })
                                            )
                                        }
                                        error={Boolean(error.first_name)}
                                        helperText={error.first_name}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="lastName" className="md:text-xl text-md font-medium text-gray-300">
                                        Last name
                                    </label>
                                    <TextField
                                        type="text"
                                        required
                                        autoComplete="lastName"
                                        placeholder="Last name"
                                        name="lastName"
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment position="start"
                                                    >
                                                        <FaRegUser />
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                        value={register.last_name}
                                        variant="outlined"
                                        sx={sxTextField}
                                        onChange={(e) =>
                                            setRegister(prev =>
                                            ({
                                                ...prev,
                                                last_name: e.target.value
                                            })
                                            )
                                        }
                                        error={Boolean(error.last_name)}
                                        helperText={error.last_name}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="password" className="md:text-xl text-md font-medium text-gray-300">
                                    Password
                                </label>
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    autoComplete="password"
                                    placeholder="Password"
                                    name="password"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start"
                                                >
                                                    <MdOutlineLock />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <button onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                                    </button>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                    value={register.password}
                                    variant="outlined"
                                    sx={sxTextField}
                                    onChange={(e) =>
                                        setRegister(prev =>
                                        ({
                                            ...prev,
                                            password: e.target.value
                                        })
                                        )
                                    }
                                    error={Boolean(error.password)}
                                    helperText={error.password}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="passwordConfirmation" className="md:text-xl text-md font-medium text-gray-300">
                                    Password confirmation
                                </label>
                                <TextField
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    required
                                    autoComplete="passwordConfirmation"
                                    placeholder="Password confirmation"
                                    name="passwordConfirmation"
                                    slotProps={{
                                        input: {
                                            startAdornment: (
                                                <InputAdornment position="start"
                                                >
                                                    <MdOutlineLock />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <button onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                                                        {showPasswordConfirmation ? <FaRegEyeSlash /> : <FaRegEye />}
                                                    </button>
                                                </InputAdornment>
                                            )
                                        },
                                    }}
                                    value={register.password_confirmation}
                                    variant="outlined"
                                    sx={sxTextField}
                                    onChange={(e) =>
                                        setRegister(prev =>
                                        ({
                                            ...prev,
                                            password_confirmation: e.target.value
                                        })
                                        )
                                    }
                                    error={Boolean(error.password_confirmation)}
                                    helperText={error.password_confirmation}
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                            >
                                {loading ? "Register..." : "Register"}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            </button>
                        </form>
                        <div className=" flex">
                            <div className="mx-auto text-gray-300 md:text-md text-sm">
                                There are accounts?
                                <button className="text-green-500 hover:text-green-400 hover:font-bold ml-[4px] transition-all duration-300 ease"
                                    onClick={() => {
                                        rounter.push('/login')
                                    }}>
                                    Sign in now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register