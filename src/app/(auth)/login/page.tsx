"use client"
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { GeneratingOAuthToken } from "@/service/authentication/oAuth";
import { AuthLogin } from "@/interface/interface";
import { useRouter } from "next/navigation";
import { MdOutlineEmail, MdOutlineErrorOutline, MdOutlineLock } from "react-icons/md";
import { useAuth } from "@/components/contexts/AuthContext";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const Login: React.FC = () => {
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

    const sxCheckBox: SxProps<Theme> = {
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
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const { loading, setLoading } = useStateGeneral()

    const [login, setLogin] = useState(
        {
            username: "",
            password: ""
        }
    )

    const [error, setError] = useState({
        username: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const validateFields = () => {
        let newErrors: any = {};
        const fields = {
            username: login.username,
            password: login.password
        } as any;
        Object.keys(fields).forEach((key) => {
            if (!fields[key]) {
                newErrors[key] = "Unable to leave empty!";
            }
        });

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    // For input events specifically
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.setCustomValidity("");
    };

    // For invalid events
    const handleInvalidInput = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.currentTarget.setCustomValidity("Unable to leave empty!");
    };

    const [forgotPass, setForgotPass] = useState<boolean>(false)

    const [errorLogin, setErrorLogin] = useState<string>('')

    const { handleLogin } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // const existingToken = localStorage.getItem("token");
        // if (existingToken) {
        //     setLoading(false);
        //     return;
        // }

        if (!validateFields()) {
            return; // stop submit
        }

        const data: AuthLogin = {
            grant_type: 'password',
            username: login.username,
            password: login.password
        }

        try {
            setLoading(true);
            const res = await GeneratingOAuthToken(data)
            const token = res.data.access_token
            handleLogin(token)
            setErrorLogin("")
            if (document.referrer.includes('/register')) {
                rounter.replace('/');
            } else if (window.history.length > 1) {
                rounter.back();
            } else {
                rounter.replace('/');
            }
        } catch (error: any) {
            setErrorLogin(error.response.data.error_description)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }

    }

    useEffect(() => {
        setLoading(false)
    }, [])

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
                <div className="relative max-w-[600px] w-full backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl lg:p-10 md:p-5 p-3 shadow-2xl overflow-hidden
                    before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-emerald-500/20 before:via-transparent before:to-cyan-500/20 before:blur-2xl before:-z-10">
                    
                    <div className=" md:gap-5 gap-3 flex flex-col justify-center">
                        <div className="gap-1 flex flex-col">
                            <img
                                className="relative w-36 drop-shadow-2xl 
        animate-[float_4s_ease-in-out_infinite] transition-transform duration-300 hover:scale-105 mx-auto"
                                alt="Spree Logo"
                                src="../../LogoFullBlack.webp"
                            />
                            <h2 className="md:text-2xl text-xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                                Welcome Back 👋
                            </h2>
                            <p className="text-center text-gray-400 text-sm">Log in to continue the experience</p>
                        </div>
                        {errorLogin &&
                            <div className="p-4 text-center bg-red-50/80 flex flex-col backdrop-blur-sm border border-red-200 rounded-xl gap-1 text-red-600">
                                <MdOutlineErrorOutline className="mx-auto" size={21} />{errorLogin}</div>
                        }
                        <form
                            onClick={handleSubmit}
                            className="flex flex-col gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="block md:text-xl text-md font-medium text-gray-300">
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
                                    value={login.username}
                                    variant="outlined"
                                    sx={sxTextField}
                                    onChange={(e) =>
                                        setLogin(prev =>
                                        ({
                                            ...prev,
                                            username: e.target.value
                                        })
                                        )
                                    }
                                    error={Boolean(error.username)}
                                    helperText={error.username}
                                    {...(forgotPass
                                        ? {
                                            onInvalid: handleInvalidInput,
                                            onInput: handleInput
                                        }
                                        : {})
                                    }

                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                {/* <div className="flex justify-between">
                                    <label htmlFor="password" className="block text-xl font-medium text-gray-300">
                                        Password
                                    </label>
                                    <button
                                        onClick={() => rounter.push('/forgot-password')}
                                        className="text-green-600 hover:text-green-700">
                                        Forgot password?
                                    </button>
                                </div> */}
                                <label htmlFor="password" className="block md:text-xl text-md font-medium text-gray-300">
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
                                    value={login.password}
                                    variant="outlined"
                                    sx={sxTextField}
                                    onChange={(e) =>
                                        setLogin(prev =>
                                        ({
                                            ...prev,
                                            password: e.target.value
                                        })
                                        )
                                    }
                                    error={Boolean(error.password)}
                                    helperText={error.password}
                                    {...(forgotPass
                                        ? {
                                            onInvalid: handleInvalidInput,
                                            onInput: handleInput
                                        }
                                        : {})
                                    }
                                />
                            </div>
                            {/* <div className="flex justify-between">
                                <FormControlLabel control={
                                    <Checkbox
                                        name="checked2"
                                        checked={forgotPass}
                                        icon={<FaRegCircle />}
                                        checkedIcon={<FaCheckCircle />}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                            setForgotPass(checked);
                                        }}
                                        sx={sxCheckBox}
                                    />
                                }
                                    onClick={(e) => e.stopPropagation()}
                                    label="Remember me"
                                    sx={sxControlLabel}
                                />
                                <button
                                    onClick={() => rounter.push('/forgot-password')}
                                    className="text-green-600 hover:text-green-700">
                                    Forgot password?
                                </button>
                            </div> */}
                            <button
                                type="submit"
                                className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                            >
                                {loading ? "Login..." : "Login"}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </div>
                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                        </form>
                        <div className=" flex">
                            <div className="mx-auto text-gray-300 md:text-md text-sm">
                                No account?
                                <button className="text-green-500 hover:text-green-400 hover:font-bold ml-[4px] transition-all duration-300 ease"
                                    onClick={() => {
                                        rounter.push('/register')
                                    }}>
                                    Register for a new account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login