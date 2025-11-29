"use client";
import React from 'react';
import { useStateGeneral } from '@/useState/useStateGeneralStoreFront';

import { useRouter } from "next/navigation";

type navProps = {
    classNameUl?: string;
    classNameA?: string;
    classNameAActive: string;
    classNameTitle?: string;
    classNameAHover?: string;
    classNameADeactive: string;
}

const Nav: React.FC<navProps> = ({
    classNameUl,
    classNameA,
    classNameAActive,
    classNameTitle,
    classNameAHover,
    classNameADeactive
}) => {
    const { pages, selectNav, setSelectNav, setHoveredNav, hoveredNav } = useStateGeneral();
    const router = useRouter();

    return (
        <ul className={classNameUl}>
            {pages.map((page, index) => (
                <li key={index} >
                    <a
                        onClick={() => {
                            setSelectNav(index)
                            router.push(page.path)
                        }}
                        onMouseEnter={() => setHoveredNav(index)}
                        className={`${classNameA} ${selectNav === index ? `${classNameAActive}` : `${classNameADeactive}`} ${hoveredNav === index ? `${classNameAHover}` : ''}`}
                    >
                        <div className={classNameTitle}>{page.title}</div>
                    </a>
                </li>
            ))}
        </ul>
    )
}
export default Nav