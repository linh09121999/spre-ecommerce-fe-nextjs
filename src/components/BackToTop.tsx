"use client"
import React, { useState, useEffect } from "react";

import { CircularProgress, Box } from '@mui/material';
import { FaAngleDoubleUp } from "react-icons/fa";

const BackToTop: React.FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [scrollPercent, setScrollPercent] = useState<number>(0);

    useEffect(() => {

        const toggleVisibility = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (scrollTop / docHeight) * 100;
            setScrollPercent(scrolled);

            if (window.pageYOffset > 120) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {isVisible && (
                <button aria-label='back to top'
                    onClick={scrollToTop}
                    className="shadow-lg backdrop-blur-[10px] transition-all duration-300 fixed bottom-[24px] right-[30px] text-orange-700 rounded-full flex items-center justify-center z-1000 css-icon"

                >
                    <CircularProgress variant="determinate" value={scrollPercent} size="50px" sx={{ color: "var(--color-green-700)" }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: "var(--color-green-700)",
                        }}
                    >
                        <FaAngleDoubleUp />
                    </Box>
                </button>
            )}
        </>
    )
}

export default BackToTop