"use client"
import { ProductCardProps } from "@/interface/interface";

import React, { useState, useMemo, useEffect } from "react";
import ListProductCard from "./cardListProduct";
import { Box, Checkbox, Divider, Drawer, FormControlLabel, IconButton, InputAdornment, List, ListItem, Menu, MenuItem, Slider, TextField } from "@mui/material";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaMinusCircle, FaRegCircle, FaTrashAlt } from "react-icons/fa";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import type { SxProps, Theme } from "@mui/material/styles";
import { ResTaxons_Retrieve } from "@/interface/responseData/interfaceStorefront";
import { PiCurrencyDollar } from "react-icons/pi";
import { useState_ResTaxons } from "@/useState/useStatestorefront";
import { IoMdSearch } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

interface ListProduct extends ProductCardProps {
    taxonsRetrieve: ResTaxons_Retrieve;
}

function normalizeSize(size: string): string {
    const sizeMap: { [key: string]: string } = {
        's': 'small',
        'm': 'medium',
        'l': 'large',
        'xl': 'extra large',
        'xs': 'extra small',
        'xxl': 'extra extra large'
    };
    return sizeMap[size.toLowerCase()] || size.toLowerCase();
}

// Hàm hỗ trợ chuẩn hóa tên màu
function normalizeColorName(color: string): string {
    const colorMap: { [key: string]: string } = {
        'navy': 'blue',
        'burgundy': 'red',
        'maroon': 'red',
        'beige': 'tan',
        'khaki': 'tan',
        'turquoise': 'blue green',
        'teal': 'blue green'
    };
    return colorMap[color.toLowerCase()] || color.toLowerCase();
}

const ListProduct: React.FC<ListProduct> = ({ products, included, taxonsRetrieve }) => {
    const PaperProps: SxProps<Theme> = {
        sx: {
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: 'calc(100%)',
            background: 'rgb(255,255,255,0.5)',
            backdropFilter: 'blur(10px)',
            zIndex: 100,
        },
    }

    const sxTextField: SxProps<Theme> = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: "var(--radius-xl)",
            background: "var(--color-white)",
            boxShadow: 'var(--shadow-md)',
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

    const MenuListProps: SxProps<Theme> = {
        sx: {
            paddingY: 0.5,
        },
    }

    const sxMenuItem: SxProps<Theme> = {
        justifyContent: 'start',
        paddingY: '10px',
        paddingLeft: '20px',
        color: 'rgb(0,0,0,0.7)',
        zIndex: 100,
        '&:hover': {
            background: 'rgb(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--color-green-600) !important',
            fontWeight: 600
        },
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

    const sxCheckBoxMinate: SxProps<Theme> = {
        color: 'black',
        '&.Mui-checked': { color: 'var(--color-green-500)' },
        '&.MuiCheckbox-indeterminate': { color: 'var(--color-green-500)' },
    }

    const sxCheckBox: SxProps<Theme> = {
        color: 'black',
        '&.Mui-checked': { color: 'var(--color-green-500)' },
    }

    const sxSlider: SxProps<Theme> = {
        color: "var(--color-gray-500)",
        '& .MuiSlider-thumb': {
            bgcolor: '#fff',
            border: '2px solid currentColor',
            width: 20,
            height: 20,
            boxShadow: '0 0 0 8px rgba(0,0,0,0.02)',
        },
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-rail': {
            opacity: 0.5,
            backgroundColor: 'var(--color-gray-300)',
        },
        '& .MuiSlider-mark': {
            backgroundColor: 'transparent',
        }
    }

    const sxPaperPropsDrawer: SxProps<Theme> = {
        sx: {
            background: 'white',
            backdropFilter: 'blur(10px)'
        }
    }

    const sxDivider: SxProps<Theme> = {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }

    const sxListItemDrawer: SxProps<Theme> = {
        padding: '8px 24px',
        cursor: 'pointer',
        '&:hover': {
            color: 'var(--color-green-600) !important',
            background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const sxListItemDrawer1: SxProps<Theme> = {
        padding: '8px 40px',
        cursor: 'pointer',
        '&:hover': {
            color: 'var(--color-green-600) !important',
            background: "linear-gradient(135deg, var(--color-green-100), var(--color-emerald-100))",
        },
        '& .MuiListItemIcon-root': {
            color: 'inherit',
            minWidth: '40px'
        }
    }

    const sxBox1Drawer = {
        width: '100vw',
        height: '95vh',
        display: 'grid',
    }

    const sxPrimaryTypographyProps = {
        fontSize: '1rem',
        fontWeight: 'medium',
        transition: 'all 0.3s ease',
    }

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: false,
            mirror: true,
        });
    }, [])

    const { loadingReadMore, totalDatas,
        sortOption, setSortOption, sortBy, setSortBy,
        filterAvailabity, filterTaxonsFashion,
        filterTaxonsAllProduct, filterCollectonsAllProduct,
        filterSize, checkedSize, setCheckedSize,
        filterColor, checkedColor, setCheckedColor, setLoading
    } = useStateGeneral()

    const { resTaxons_List } = useState_ResTaxons()

    const filterFashionMen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/men/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionWomen = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/women/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterFashionAccessories = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/fashion/accessories/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessFitness = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/fitness/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessRelaxation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/relaxation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessMentalStimulation = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/mental-stimulation/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const filterWellnessNutrition = useMemo(() => {
        return resTaxons_List?.data.filter((r) =>
            r.attributes.permalink.toLowerCase().includes("categories/wellness/nutrition/".toLowerCase())
        );
    }, [resTaxons_List?.data]);

    const allWellnessData = useMemo(() => {
        return [
            ...(filterWellnessFitness || []),
            ...(filterWellnessRelaxation || []),
            ...(filterWellnessMentalStimulation || []),
            ...(filterWellnessNutrition || [])
        ];
    }, [
        filterWellnessFitness,
        filterWellnessRelaxation,
        filterWellnessMentalStimulation,
        filterWellnessNutrition,
        resTaxons_List?.data
    ]);

    const Category = (name: string) => {
        if (!name) return undefined
        return name.substring(0, name.lastIndexOf('->'))
    }

    const [anchorElSortBy, setAnchorElSortBy] = useState<null | HTMLElement>(null);
    const openSortBy = Boolean(anchorElSortBy);
    const handleClickSortBy = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSortBy(event.currentTarget);
    };
    const handleCloseSortBy = () => {
        setAnchorElSortBy(null);
    };

    const handleSortDefault = () => {
        handleCloseSortBy()
        setSortBy("Relevance")
        setSortOption("relevance");
    }

    const handleSortNewest = () => {
        handleCloseSortBy()
        setSortBy("Newest")
        setSortOption("newest");
    }

    // tang dan
    const handleSortOldest = () => {
        handleCloseSortBy()
        setSortBy("Oldest")
        setSortOption("oldest");
    }

    // Mới nhất (ngày gần nhất trước)
    const handleSortAtoZ = () => {
        handleCloseSortBy();
        setSortBy("A-Z");
        setSortOption("title-az");
    };

    const handleSortZtoA = () => {
        handleCloseSortBy();
        setSortBy("Z-A");
        setSortOption("title-za");
    };

    const handleSortHighest = () => {
        handleCloseSortBy();
        setSortBy("Highest");
        setSortOption("highest");
    }

    const handleSortLowest = () => {
        handleCloseSortBy();
        setSortBy("Lowest");
        setSortOption("lowest");
    }

    const getPrice = (item: string) => {
        // chuyển "$24.99" → 24.99, nếu null thì 0
        const num = parseFloat(item?.replace(/[^0-9.]/g, "")) || 0;
        return num;
    };

    const filteredReleases = useMemo(() => {
        if (!Array.isArray(products)) return [];
        const sorted = [...products].sort((a, b) => {
            switch (sortOption) {
                case "newest":
                    return (
                        new Date(b.attributes.updated_at).getTime() -
                        new Date(a.attributes.updated_at).getTime()
                    );
                case "oldest":
                    return (
                        new Date(a.attributes.updated_at).getTime() -
                        new Date(b.attributes.updated_at).getTime()
                    );
                case "title-az":
                    return a.attributes.name.localeCompare(b.attributes.name);
                case "title-za":
                    return b.attributes.name.localeCompare(a.attributes.name);
                case "highest":
                    return getPrice(b.attributes.display_price!) - getPrice(a.attributes.display_price!);
                case "lowest":
                    return getPrice(a.attributes.display_price!) - getPrice(b.attributes.display_price!);
                default:
                    return 0; // relevance
            }
        });

        return sorted;
    }, [products, sortOption])

    const [showAvailabity, setShowAvailabity] = useState<boolean>(true)
    const [showPrice, setShowPrice] = useState<boolean>(true)
    const [showTaxons, setShowTaxons] = useState<boolean>(true)
    const [showCollectons, setShowCollectons] = useState<boolean>(true)
    const [showColor, setShowColor] = useState<boolean>(true)
    const [showSize, setShowSize] = useState<boolean>(true)

    // availabyty
    const [checkedItemsAvailabity, setCheckedItemsAvailabity] = useState<number[]>([])
    const allCheckedAvailabity = checkedItemsAvailabity.length === filterAvailabity.length
    const isIndeterminateAvailabity = checkedItemsAvailabity.length > 0 && checkedItemsAvailabity.length < filterAvailabity.length

    // Khi click vào "All"
    const handleCheckAllAvailabity = () => {
        allCheckedAvailabity ?
            setCheckedItemsAvailabity([])
            :
            setCheckedItemsAvailabity(filterAvailabity.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemAvailabity = (id: number) => {
        checkedItemsAvailabity.includes(id) ?
            setCheckedItemsAvailabity(checkedItemsAvailabity.filter((itemId) => itemId !== id))
            :
            (
                setCheckedItemsAvailabity([...checkedItemsAvailabity, id])

            )
    }

    // all
    const [inputValueAllProject, setInputValueAllProject] = useState<string>("");
    const filterSearchAllProject = useMemo(() => {
        if (!inputValueAllProject.trim()) return filterTaxonsAllProduct;
        return filterTaxonsAllProduct.filter((r) =>
            r.title.toLowerCase().includes(inputValueAllProject.toLowerCase())
        );
    }, [inputValueAllProject,
        filterTaxonsAllProduct
    ])

    const [checkedItemsTaxonsAllProduct, setCheckItemTaxonsAllProduct] = useState<number[]>([])
    const allCheckedTaxonsAllProduct = checkedItemsTaxonsAllProduct.length === filterSearchAllProject.length
    const isIndeterminateTaxonsAllProduct = checkedItemsTaxonsAllProduct.length > 0 && checkedItemsTaxonsAllProduct.length < filterSearchAllProject.length

    // Khi click vào "All"
    const handleCheckAllTaxonsAllProduct = () => {
        allCheckedTaxonsAllProduct ?
            setCheckItemTaxonsAllProduct([])
            :
            setCheckItemTaxonsAllProduct(filterSearchAllProject.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsAllProduct = (id: number) => {
        checkedItemsTaxonsAllProduct.includes(id) ?
            setCheckItemTaxonsAllProduct(checkedItemsTaxonsAllProduct.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsAllProduct([...checkedItemsTaxonsAllProduct, id])

            )
    }

    // 
    const [checkedItemsCollectonsAllProduct, setCheckItemCollectonsAllProduct] = useState<number[]>([])
    const allCheckedCollectonsAllProduct = checkedItemsCollectonsAllProduct.length === filterCollectonsAllProduct.length
    const isIndeterminateCollectonsAllProduct = checkedItemsCollectonsAllProduct.length > 0 && checkedItemsCollectonsAllProduct.length < filterCollectonsAllProduct.length

    // Khi click vào "All"
    const handleCheckAllCollectonsAllProduct = () => {
        allCheckedCollectonsAllProduct ?
            setCheckItemCollectonsAllProduct([])
            :
            setCheckItemCollectonsAllProduct(filterCollectonsAllProduct.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemCollectonsAllProduct = (id: number) => {
        checkedItemsCollectonsAllProduct.includes(id) ?
            setCheckItemCollectonsAllProduct(checkedItemsCollectonsAllProduct.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemCollectonsAllProduct([...checkedItemsCollectonsAllProduct, id])

            )
    }

    // fashion
    const [inputValueTaxonsFashion, setInputValueTaxonsFashion] = useState<string>("");
    const filterSearchTaxonsFashion = useMemo(() => {
        if (!inputValueTaxonsFashion.trim()) return filterTaxonsFashion;
        return filterTaxonsFashion.filter((r) =>
            r.title.toLowerCase().includes(inputValueTaxonsFashion.toLowerCase())
        );
    }, [inputValueTaxonsFashion,
        filterTaxonsFashion
    ])

    const [checkedItemsTaxonsFashion, setCheckItemTaxonsFashion] = useState<number[]>([])
    const allCheckedTaxonsFashion = checkedItemsTaxonsFashion.length === filterSearchTaxonsFashion.length
    const isIndeterminateTaxonsFashion = checkedItemsTaxonsFashion.length > 0 && checkedItemsTaxonsFashion.length < filterSearchTaxonsFashion.length

    // Khi click vào "All"
    const handleCheckAllTaxonsFashion = () => {
        allCheckedTaxonsFashion ?
            setCheckItemTaxonsFashion([])
            :
            setCheckItemTaxonsFashion(filterSearchTaxonsFashion.map((type) => type.id))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsFashion = (id: number) => {
        checkedItemsTaxonsFashion.includes(id) ?
            setCheckItemTaxonsFashion(checkedItemsTaxonsFashion.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsFashion([...checkedItemsTaxonsFashion, id])

            )
    }

    // wellness

    const [inputValueWellness, setInputValueWellness] = useState<string>("");
    const filterSearchWellness = useMemo(() => {
        if (!inputValueWellness.trim()) return allWellnessData;
        return allWellnessData.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueWellness.toLowerCase())
        );
    }, [inputValueWellness,
        allWellnessData,
        filterWellnessFitness,
        filterWellnessRelaxation,
        filterWellnessMentalStimulation,
        filterWellnessNutrition,
        resTaxons_List?.data]);

    const [checkedItemsTaxonsWellness, setCheckItemTaxonsWellness] = useState<number[]>([])
    const allCheckedTaxonsWellness = checkedItemsTaxonsWellness.length === filterSearchWellness.length
    const isIndeterminateTaxonsWellness = checkedItemsTaxonsWellness.length > 0 && checkedItemsTaxonsWellness.length < filterSearchWellness.length

    // Khi click vào "All"
    const handleCheckAllTaxonsWellness = () => {
        allCheckedTaxonsWellness ?
            setCheckItemTaxonsWellness([])
            :
            setCheckItemTaxonsWellness(filterSearchWellness.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsWellness = (id: number) => {
        checkedItemsTaxonsWellness.includes(id) ?
            setCheckItemTaxonsWellness(checkedItemsTaxonsWellness.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsWellness([...checkedItemsTaxonsWellness, id])

            )
    }

    // men
    const [inputValueTaxonsMen, setInputValueTaxonsMen] = useState<string>("");
    const filterSearchTaxonsMen = useMemo(() => {
        if (!inputValueTaxonsMen.trim()) return filterFashionMen;
        if (!filterFashionMen) return []
        return filterFashionMen.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsMen.toLowerCase())
        );
    }, [inputValueTaxonsMen,
        filterFashionMen
    ])

    const [checkedItemsTaxonsMen, setCheckItemTaxonsMen] = useState<number[]>([])
    const allCheckedTaxonsMen =
        filterSearchTaxonsMen && filterSearchTaxonsMen.length > 0
            ? checkedItemsTaxonsMen.length === filterSearchTaxonsMen.length
            : false;

    const isIndeterminateTaxonsMen =
        filterSearchTaxonsMen && filterSearchTaxonsMen.length > 0
            ? checkedItemsTaxonsMen.length > 0 &&
            checkedItemsTaxonsMen.length < filterSearchTaxonsMen.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsMen = () => {
        allCheckedTaxonsMen ?
            setCheckItemTaxonsMen([])
            :
            setCheckItemTaxonsMen(filterSearchTaxonsMen!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsMen = (id: number) => {
        checkedItemsTaxonsMen.includes(id) ?
            setCheckItemTaxonsMen(checkedItemsTaxonsMen.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsMen([...checkedItemsTaxonsMen, id])

            )
    }

    // women
    const [inputValueTaxonsWomen, setInputValueTaxonsWomen] = useState<string>("");
    const filterSearchTaxonsWomen = useMemo(() => {
        if (!inputValueTaxonsWomen.trim()) return filterFashionWomen;
        if (!filterFashionWomen) return []
        return filterFashionWomen.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsWomen.toLowerCase())
        );
    }, [inputValueTaxonsWomen,
        filterFashionWomen
    ])

    const [checkedItemsTaxonsWomen, setCheckItemTaxonsWomen] = useState<number[]>([])
    const allCheckedTaxonsWomen =
        filterSearchTaxonsWomen && filterSearchTaxonsWomen.length > 0
            ? checkedItemsTaxonsWomen.length === filterSearchTaxonsWomen.length
            : false;

    const isIndeterminateTaxonsWomen =
        filterSearchTaxonsWomen && filterSearchTaxonsWomen.length > 0
            ? checkedItemsTaxonsWomen.length > 0 &&
            checkedItemsTaxonsWomen.length < filterSearchTaxonsWomen.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsWomen = () => {
        allCheckedTaxonsWomen ?
            setCheckItemTaxonsWomen([])
            :
            setCheckItemTaxonsWomen(filterSearchTaxonsWomen!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsWomen = (id: number) => {
        checkedItemsTaxonsWomen.includes(id) ?
            setCheckItemTaxonsWomen(checkedItemsTaxonsWomen.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsWomen([...checkedItemsTaxonsWomen, id])

            )
    }

    // accessories
    const [inputValueTaxonsAccessories, setInputValueTaxonsAccessories] = useState<string>("");
    const filterSearchTaxonsAccessories = useMemo(() => {
        if (!inputValueTaxonsAccessories.trim()) return filterFashionAccessories;
        if (!filterFashionAccessories) return []
        return filterFashionAccessories.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsAccessories.toLowerCase())
        );
    }, [inputValueTaxonsAccessories,
        filterFashionAccessories
    ])

    const [checkedItemsTaxonsAccessories, setCheckItemTaxonsAccessories] = useState<number[]>([])
    const allCheckedTaxonsAccessories =
        filterSearchTaxonsAccessories && filterSearchTaxonsAccessories.length > 0
            ? checkedItemsTaxonsAccessories.length === filterSearchTaxonsAccessories.length
            : false;

    const isIndeterminateTaxonsAccessories =
        filterSearchTaxonsAccessories && filterSearchTaxonsAccessories.length > 0
            ? checkedItemsTaxonsAccessories.length > 0 &&
            checkedItemsTaxonsAccessories.length < filterSearchTaxonsAccessories.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsAccessories = () => {
        allCheckedTaxonsAccessories ?
            setCheckItemTaxonsAccessories([])
            :
            setCheckItemTaxonsAccessories(filterSearchTaxonsAccessories!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsAccessories = (id: number) => {
        checkedItemsTaxonsAccessories.includes(id) ?
            setCheckItemTaxonsAccessories(checkedItemsTaxonsAccessories.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsAccessories([...checkedItemsTaxonsAccessories, id])

            )
    }

    // Fitness
    const [inputValueTaxonsFitness, setInputValueTaxonsFitness] = useState<string>("");
    const filterSearchTaxonsFitness = useMemo(() => {
        if (!inputValueTaxonsFitness.trim()) return filterWellnessFitness;
        if (!filterWellnessFitness) return []
        return filterWellnessFitness.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsFitness.toLowerCase())
        );
    }, [inputValueTaxonsFitness,
        filterWellnessFitness
    ])
    const [checkedItemsTaxonsFitness, setCheckItemTaxonsFitness] = useState<number[]>([])
    const allCheckedTaxonsFitness =
        filterSearchTaxonsFitness && filterSearchTaxonsFitness.length > 0
            ? checkedItemsTaxonsFitness.length === filterSearchTaxonsFitness.length
            : false;

    const isIndeterminateTaxonsFitness =
        filterSearchTaxonsFitness && filterSearchTaxonsFitness.length > 0
            ? checkedItemsTaxonsFitness.length > 0 &&
            checkedItemsTaxonsFitness.length < filterSearchTaxonsFitness.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsFitness = () => {
        allCheckedTaxonsFitness ?
            setCheckItemTaxonsFitness([])
            :
            setCheckItemTaxonsFitness(filterSearchTaxonsFitness!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsFitness = (id: number) => {
        checkedItemsTaxonsFitness.includes(id) ?
            setCheckItemTaxonsFitness(checkedItemsTaxonsFitness.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsFitness([...checkedItemsTaxonsFitness, id])

            )
    }

    // Relaxation
    const [inputValueTaxonsRelaxation, setInputValueTaxonsRelaxation] = useState<string>("");
    const filterSearchTaxonsRelaxation = useMemo(() => {
        if (!inputValueTaxonsRelaxation.trim()) return filterWellnessRelaxation;
        if (!filterWellnessRelaxation) return []
        return filterWellnessRelaxation.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsRelaxation.toLowerCase())
        );
    }, [inputValueTaxonsRelaxation,
        filterWellnessRelaxation
    ])
    const [checkedItemsTaxonsRelaxation, setCheckItemTaxonsRelaxation] = useState<number[]>([])
    const allCheckedTaxonsRelaxation =
        filterSearchTaxonsRelaxation && filterSearchTaxonsRelaxation.length > 0
            ? checkedItemsTaxonsRelaxation.length === filterSearchTaxonsRelaxation.length
            : false;

    const isIndeterminateTaxonsRelaxation =
        filterSearchTaxonsRelaxation && filterSearchTaxonsRelaxation.length > 0
            ? checkedItemsTaxonsRelaxation.length > 0 &&
            checkedItemsTaxonsRelaxation.length < filterSearchTaxonsRelaxation.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsRelaxation = () => {
        allCheckedTaxonsRelaxation ?
            setCheckItemTaxonsRelaxation([])
            :
            setCheckItemTaxonsRelaxation(filterSearchTaxonsRelaxation!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsRelaxation = (id: number) => {
        checkedItemsTaxonsRelaxation.includes(id) ?
            setCheckItemTaxonsRelaxation(checkedItemsTaxonsRelaxation.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsRelaxation([...checkedItemsTaxonsRelaxation, id])

            )
    }

    // Mental Stimulation
    const [inputValueTaxonsMentalStimulation, setInputValueTaxonsMentalStimulation] = useState<string>("");
    const filterSearchTaxonsMentalStimulation = useMemo(() => {
        if (!inputValueTaxonsMentalStimulation.trim()) return filterWellnessMentalStimulation;
        if (!filterWellnessMentalStimulation) return []
        return filterWellnessMentalStimulation.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsMentalStimulation.toLowerCase())
        );
    }, [inputValueTaxonsMentalStimulation,
        filterWellnessMentalStimulation
    ])
    const [checkedItemsTaxonsMentalStimulation, setCheckItemTaxonsMentalStimulation] = useState<number[]>([])
    const allCheckedTaxonsMentalStimulation =
        filterSearchTaxonsMentalStimulation && filterSearchTaxonsMentalStimulation.length > 0
            ? checkedItemsTaxonsMentalStimulation.length === filterSearchTaxonsMentalStimulation.length
            : false;

    const isIndeterminateTaxonsMentalStimulation =
        filterSearchTaxonsMentalStimulation && filterSearchTaxonsMentalStimulation.length > 0
            ? checkedItemsTaxonsMentalStimulation.length > 0 &&
            checkedItemsTaxonsMentalStimulation.length < filterSearchTaxonsMentalStimulation.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsMentalStimulation = () => {
        allCheckedTaxonsMentalStimulation ?
            setCheckItemTaxonsMentalStimulation([])
            :
            setCheckItemTaxonsMentalStimulation(filterSearchTaxonsMentalStimulation!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsMentalStimulation = (id: number) => {
        checkedItemsTaxonsMentalStimulation.includes(id) ?
            setCheckItemTaxonsMentalStimulation(checkedItemsTaxonsMentalStimulation.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsMentalStimulation([...checkedItemsTaxonsMentalStimulation, id])

            )
    }
    // Nutrition
    const [inputValueTaxonsNutrition, setInputValueTaxonsNutrition] = useState<string>("");
    const filterSearchTaxonsNutrition = useMemo(() => {
        if (!inputValueTaxonsNutrition.trim()) return filterWellnessNutrition;
        if (!filterWellnessNutrition) return []
        return filterWellnessNutrition.filter((r) =>
            r.attributes.name.toLowerCase().includes(inputValueTaxonsNutrition.toLowerCase())
        );
    }, [inputValueTaxonsNutrition,
        filterWellnessNutrition
    ])
    const [checkedItemsTaxonsNutrition, setCheckItemTaxonsNutrition] = useState<number[]>([])
    const allCheckedTaxonsNutrition =
        filterSearchTaxonsNutrition && filterSearchTaxonsNutrition.length > 0
            ? checkedItemsTaxonsNutrition.length === filterSearchTaxonsNutrition.length
            : false;

    const isIndeterminateTaxonsNutrition =
        filterSearchTaxonsNutrition && filterSearchTaxonsNutrition.length > 0
            ? checkedItemsTaxonsNutrition.length > 0 &&
            checkedItemsTaxonsNutrition.length < filterSearchTaxonsNutrition.length
            : false;
    // Khi click vào "All"
    const handleCheckAllTaxonsNutrition = () => {
        allCheckedTaxonsNutrition ?
            setCheckItemTaxonsNutrition([])
            :
            setCheckItemTaxonsNutrition(filterSearchTaxonsNutrition!.map((type) => Number(type.id)))
    }

    // Khi click vào từng item
    const handleCheckItemTaxonsNutrition = (id: number) => {
        checkedItemsTaxonsNutrition.includes(id) ?
            setCheckItemTaxonsNutrition(checkedItemsTaxonsNutrition.filter((itemId) => itemId !== id))
            :
            (
                setCheckItemTaxonsNutrition([...checkedItemsTaxonsNutrition, id])

            )
    }

    // size
    const [inputValueSize, setInputValueSize] = useState<string>("");

    const filterSearchSize = useMemo(() => {
        if (!inputValueSize.trim()) return filterSize;
        return filterSize.filter((r) =>
            r.title.toLowerCase().includes(inputValueSize.toLowerCase())
        );
    }, [inputValueSize, filterSize]);

    const handleSelectSize = (id: number) => {
        setCheckedSize((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    // color
    const [inputValueColor, setInputValueColor] = useState<string>("");

    const filterSearchColor = useMemo(() => {
        if (!inputValueColor.trim()) return filterColor;
        return filterColor.filter((r) =>
            r.title.toLowerCase().includes(inputValueColor.toLowerCase())
        );
    }, [inputValueColor, filterColor]);

    const handleSelectColor = (id: number) => {
        setCheckedColor((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const toLowerNoSpace = (str: string): string => {
        return str.toLowerCase().replace(/\s+/g, '');
    };

    const [priceMin, setPriceMin] = React.useState<number>(0);
    const [priceMax, setPriceMax] = React.useState<number>(200);

    const handleChangeInputPriceMin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valuePriceMin = Number(e.target.value)
        if (valuePriceMin > priceMax) return
        setPriceMin(valuePriceMin || 0)
    }

    const handleChangeInputPriceMax = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valuePriceMax = Number(e.target.value)
        if (valuePriceMax < priceMin) return
        setPriceMax(valuePriceMax || 0)
    }

    const handleChangeSliderCommitted = (_event: Event | React.SyntheticEvent, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
    }

    const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
        const [min, max] = newValue as number[];
        setPriceMin(min);
        setPriceMax(max);
    };

    const handleClearAllFilters = () => {
        setCheckedItemsAvailabity([]);
        setCheckItemTaxonsAllProduct([]);
        setCheckItemCollectonsAllProduct([]);
        setCheckItemTaxonsFashion([])
        setCheckItemTaxonsWellness([])
        setCheckItemTaxonsMen([])
        setCheckItemTaxonsWomen([])
        setCheckItemTaxonsAccessories([])
        setCheckItemTaxonsFitness([])
        setCheckItemTaxonsRelaxation([])
        setCheckItemTaxonsMentalStimulation([])
        setCheckItemTaxonsNutrition([])

        setCheckedColor([]);
        setCheckedSize([]);
        setPriceMin(0);
        setPriceMax(200);
    }

    const filteredProducts = useMemo(() => {
        let result = [...filteredReleases];

        // 5️⃣ Availability
        if (checkedItemsAvailabity.length > 0) {
            result = result.filter((p) => {
                return checkedItemsAvailabity.some((id) => {
                    const selected = filterAvailabity.find((f) => f.id === id);
                    if (!selected) return false;

                    const key = selected.title.toLowerCase();
                    if (key.includes("in stock")) return p.attributes.in_stock;
                    if (key.includes("available")) return p.attributes.available;
                    if (key.includes("backorder")) return p.attributes.backorderable;
                    return false;
                });
            });
        }

        // 6️⃣ Price
        result = result.filter((p) => {
            const price = parseFloat(p.attributes.price || "0");
            return price >= priceMin && price <= priceMax;
        });


        // 2️⃣ Collections
        if (checkedItemsCollectonsAllProduct.length > 0) {
            result = result.filter((p) => {
                const productCollections = p.relationships.taxons?.data?.map((c: any) => Number(c.id)) || [];
                return checkedItemsCollectonsAllProduct.some((id) => productCollections.includes(id));
            });
        }

        // all product
        if (checkedItemsTaxonsAllProduct.length > 0 && !taxonsRetrieve) {
            result = result.filter((p) => {
                const productTaxonsAll = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                return checkedItemsTaxonsAllProduct.some((id) => productTaxonsAll.includes(id));
            });
        }

        const taxonConfigs = [
            { condition: taxonsRetrieve?.data.attributes.name === 'Fashion', items: checkedItemsTaxonsFashion },
            { condition: taxonsRetrieve?.data.attributes.name === 'Wellness', items: checkedItemsTaxonsWellness },
            { condition: taxonsRetrieve?.data.attributes.name === 'Men' && filterFashionMen!.length > 0, items: checkedItemsTaxonsMen },
            { condition: taxonsRetrieve?.data.attributes.name === 'Women' && filterFashionWomen!.length > 0, items: checkedItemsTaxonsWomen },
            { condition: taxonsRetrieve?.data.attributes.name === 'Accessories' && filterFashionAccessories!.length > 0, items: checkedItemsTaxonsAccessories },
            { condition: taxonsRetrieve?.data.attributes.name === 'Fitness' && filterWellnessFitness!.length > 0, items: checkedItemsTaxonsFitness },
            { condition: taxonsRetrieve?.data.attributes.name === 'Relaxation' && filterWellnessRelaxation!.length > 0, items: checkedItemsTaxonsRelaxation },
            { condition: taxonsRetrieve?.data.attributes.name === 'Mental Stimulation' && filterWellnessMentalStimulation!.length > 0, items: checkedItemsTaxonsMentalStimulation },
            { condition: taxonsRetrieve?.data.attributes.name === 'Nutrition' && filterWellnessNutrition!.length > 0, items: checkedItemsTaxonsNutrition }
        ];

        taxonConfigs.forEach(config => {
            if (config.items.length > 0 && config.condition) {
                result = result.filter((p) => {
                    const productTaxons = p.relationships.taxons?.data?.map((t: any) => Number(t.id)) || [];
                    return config.items.some((id) => productTaxons.includes(id));
                });
            }
        });

        // 6️⃣ Color Filter
        if (checkedColor.length > 0) {
            result = result.filter((product) => {
                // Lấy tất cả variants của sản phẩm
                const variantIds = product.relationships.variants?.data?.map((v: any) => v.id) || [];
                const productVariants = included?.filter((item: any) =>
                    item.type === 'variant' && variantIds.includes(item.id)
                ) || [];

                // Kiểm tra xem có variant nào có màu được chọn không
                const hasMatchingColor = productVariants.some((variant: any) => {
                    const variantOptions = variant.attributes.options || [];
                    const colorOption = variantOptions.find((opt: any) => opt.name === 'color');

                    if (!colorOption) return false;

                    const variantColor = colorOption.value.toLowerCase();
                    const variantColorPresentation = colorOption.presentation.toLowerCase();

                    return checkedColor.some((colorId) => {
                        const selectedColor = filterColor.find((f: any) => f.id === colorId);
                        if (!selectedColor) return false;

                        const selectedColorName = selectedColor.title.toLowerCase();

                        // So khớp màu sắc (có thể so khớp theo value hoặc presentation)
                        return variantColor.includes(selectedColorName) ||
                            variantColorPresentation.includes(selectedColorName) ||
                            normalizeColorName(selectedColorName) === normalizeColorName(variantColor);
                    });
                });

                return hasMatchingColor;
            });
        }

        // 7️⃣ Size Filter
        if (checkedSize.length > 0) {
            result = result.filter((product) => {
                // Lấy tất cả variants của sản phẩm
                const variantIds = product.relationships.variants?.data?.map((v: any) => v.id) || [];
                const productVariants = included?.filter((item: any) =>
                    item.type === 'variant' && variantIds.includes(item.id)
                ) || [];

                // Kiểm tra xem có variant nào có kích thước được chọn không
                const hasMatchingSize = productVariants.some((variant: any) => {
                    const variantOptions = variant.attributes.options || [];
                    const sizeOption = variantOptions.find((opt: any) => opt.name === 'size');

                    if (!sizeOption) return false;

                    const variantSize = sizeOption.value.toLowerCase();
                    const variantSizePresentation = sizeOption.presentation.toLowerCase();

                    return checkedSize.some((sizeId) => {
                        const selectedSize = filterSize.find((f: any) => f.id === sizeId);
                        if (!selectedSize) return false;

                        const selectedSizeName = selectedSize.title.toLowerCase();

                        // So khớp kích thước (chuẩn hóa để so sánh)
                        return variantSize.includes(selectedSizeName) ||
                            variantSizePresentation.includes(selectedSizeName) ||
                            normalizeSize(selectedSizeName) === normalizeSize(variantSize);
                    });
                });

                return hasMatchingSize;
            });
        }

        // 8️⃣ Combined Color & Size Filter (nếu cả hai đều được chọn)
        if (checkedColor.length > 0 && checkedSize.length > 0) {
            result = result.filter((product) => {
                const variantIds = product.relationships.variants?.data?.map((v: any) => v.id) || [];
                const productVariants = included?.filter((item: any) =>
                    item.type === 'variant' && variantIds.includes(item.id)
                ) || [];

                // Kiểm tra xem có variant nào thỏa mãn cả màu VÀ kích thước
                const hasMatchingVariant = productVariants.some((variant: any) => {
                    const variantOptions = variant.attributes.options || [];

                    const colorOption = variantOptions.find((opt: any) => opt.name === 'color');
                    const sizeOption = variantOptions.find((opt: any) => opt.name === 'size');

                    if (!colorOption || !sizeOption) return false;

                    const variantColor = colorOption.value.toLowerCase();
                    const variantColorPresentation = colorOption.presentation.toLowerCase();
                    const variantSize = sizeOption.value.toLowerCase();
                    const variantSizePresentation = sizeOption.presentation.toLowerCase();

                    // Kiểm tra màu
                    const colorMatch = checkedColor.some((colorId) => {
                        const selectedColor = filterColor.find((f: any) => f.id === colorId);
                        if (!selectedColor) return false;
                        const selectedColorName = selectedColor.title.toLowerCase();
                        return variantColor.includes(selectedColorName) ||
                            variantColorPresentation.includes(selectedColorName) ||
                            normalizeColorName(selectedColorName) === normalizeColorName(variantColor);
                    });

                    // Kiểm tra kích thước
                    const sizeMatch = checkedSize.some((sizeId) => {
                        const selectedSize = filterSize.find((f: any) => f.id === sizeId);
                        if (!selectedSize) return false;
                        const selectedSizeName = selectedSize.title.toLowerCase();
                        return variantSize.includes(selectedSizeName) ||
                            variantSizePresentation.includes(selectedSizeName) ||
                            normalizeSize(selectedSizeName) === normalizeSize(variantSize);
                    });

                    return colorMatch && sizeMatch;
                });

                return hasMatchingVariant;
            });
        }

        return result;
    }, [
        resTaxons_List?.data,
        products,
        included,
        filteredReleases,
        checkedItemsAvailabity,
        priceMin,
        priceMax,
        checkedItemsTaxonsAllProduct,
        checkedItemsCollectonsAllProduct,
        checkedItemsTaxonsFashion,
        checkedItemsTaxonsWellness,
        checkedItemsTaxonsMen,
        checkedItemsTaxonsWomen,
        checkedItemsTaxonsAccessories,
        checkedItemsTaxonsFitness,
        checkedItemsTaxonsRelaxation,
        checkedItemsTaxonsMentalStimulation,
        checkedItemsTaxonsNutrition,
        checkedColor,
        checkedSize,
        filterColor,
        filterSize,
        filterAvailabity,
        taxonsRetrieve,
        filterFashionMen,
        filterFashionWomen,
        filterFashionAccessories,
        filterWellnessFitness,
        filterWellnessRelaxation,
        filterWellnessMentalStimulation,
        filterWellnessNutrition
    ]);

    const router = useRouter()

    const [openDrawerSort, setOpenDrawerSort] = useState<boolean>(false);

    const toggleDrawerSort = (newOpen: boolean) => () => {
        setOpenDrawerSort(newOpen);
    };

    const [openDrawerFilter, setOpenDrawerFilter] = useState<boolean>(false);

    const toggleDrawerFilter = (newOpen: boolean) => () => {
        setOpenDrawerFilter(newOpen);
    };

    return (
        <>
            <section
                data-aos="fade-up"
                data-aos-duration="1200"
                className={`${taxonsRetrieve?.data.attributes.header_url ? 'shadow-xl ' : ''} relative w-full  overflow-hidden  group`}>
                {/* Ảnh nền */}
                {!taxonsRetrieve ?
                    <>
                        <img
                            src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
                            alt="banner"
                            className="w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Lớp phủ gradient tối giúp chữ nổi */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                        <div className="absolute md:left-10 left-0 bottom-0 p-5 md:p-10 text-white z-10 w-3/4 grid gap-3">
                            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                Shop all
                            </h3>
                        </div>
                    </>
                    :
                    <>
                        {taxonsRetrieve?.data.attributes.header_url ?
                            <>
                                <img
                                    src={taxonsRetrieve?.data.attributes.header_url}
                                    alt={taxonsRetrieve?.data.attributes.name}
                                    className="w-full aspect-[16/8] sm:aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Lớp phủ gradient tối giúp chữ nổi */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-10 text-white z-10">
                                    <div className="lg:w-3/4 w-full">
                                        <div className="grid gap-1 md:gap-2 lg:gap-5">
                                            <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-300">
                                                {Category(taxonsRetrieve?.data.attributes.pretty_name)?.replace(/\s*->\s*/g, " / ")}
                                            </span>
                                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold leading-tight bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                                {taxonsRetrieve?.data.attributes.name}
                                            </h3>
                                            {taxonsRetrieve?.data.attributes.description &&
                                                <div className="mt-1 sm:mt-2">
                                                    <p className="text-xs sm:text-sm md:text-base text-white/80  overflow-hidden">
                                                        {taxonsRetrieve?.data.attributes.description}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                {/* Nội dung chữ overlay */}
                                <div className="relative overflow-hidden group">
                                    <img
                                        src="https://cdn.vendo.dev/rails/active_storage/representations/proxy/eyJfcmFpbHMiOnsiZGF0YSI6MjQ3OSwicHVyIjoiYmxvYl9pZCJ9fQ==--2ea59e9a7f3e0127203fa19260ee4f0c827a725d/eyJfcmFpbHMiOnsiZGF0YSI6eyJmb3JtYXQiOiJ3ZWJwIiwic2F2ZXIiOnsic3RyaXAiOnRydWUsInF1YWxpdHkiOjc1LCJsb3NzbGVzcyI6ZmFsc2UsImFscGhhX3EiOjg1LCJyZWR1Y3Rpb25fZWZmb3J0Ijo2LCJzbWFydF9zdWJzYW1wbGUiOnRydWV9LCJyZXNpemVfdG9fbGltaXQiOls2NDAsbnVsbF19LCJwdXIiOiJ2YXJpYXRpb24ifX0=--d96e3e5279c093271eeb921db9065be22fee62e4/Image%20banner.jpg"
                                        alt="banner"
                                        className="w-full md:aspect-[16/5] aspect-[16/7] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Lớp phủ gradient tối giúp chữ nổi */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-10 text-white z-10">
                                        <div className="lg:w-3/4 w-full">
                                            <div className="grid gap-1 md:gap-2 lg:gap-5">
                                                <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-300">
                                                    {Category(taxonsRetrieve?.data.attributes.pretty_name)?.replace(/\s*->\s*/g, " / ")}
                                                </span>
                                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold leading-tight bg-gradient-to-r from-green-400 to-emerald-200 bg-clip-text text-transparent drop-shadow-lg">
                                                    {taxonsRetrieve?.data.attributes.name}
                                                </h3>
                                                {taxonsRetrieve?.data.attributes.description &&
                                                    <div className="mt-1 sm:mt-2">
                                                        <p className="text-xs sm:text-sm md:text-base text-white/80  overflow-hidden">
                                                            {taxonsRetrieve?.data.attributes.description}
                                                        </p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hiệu ứng điểm nhấn (vòng sáng mờ khi hover) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,white_0%,transparent_60%)] mix-blend-overlay"></div>

                            </>
                        }
                    </>
                }
            </section>
            <div className={`max-w-[1535px] mx-auto flex flex-col px-5 py-5 ${taxonsRetrieve?.data.attributes.header_url ? 'gap-10' : 'gap-5'}`}>

                {products.length === 0 ?
                    <div className="flex flex-col gap-1">
                        <img src="../../No_Product_Found.png" alt="no product" className="w-[300px] opacity-50 mx-auto" />
                    </div>
                    :
                    <div className="grid lg:grid-cols-[300px_1fr] md:gap-10 gap-5">
                        {/* lg:sticky lg:top-[105px] */}
                        <aside className="grid h-fit max-lg:hidden  gap-10 bg-gray-100 p-5 rounded-xl"
                            data-aos="fade-right"
                            data-aos-duration="1200"
                        >
                            <div className="flex items-center justify-between h-[40px]">
                                <h2 className="text-xl font-semibold">Filters</h2>

                                <button onClick={handleClearAllFilters} className="text-sm text-red-500 hover:underline flex items-center gap-2"><FaTrashAlt className="text-red-500" />Clear</button>
                            </div>
                            <div className="flex flex-col gap-5 " >
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowAvailabity(!showAvailabity)
                                    }}
                                >
                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Availabity</h3>
                                    <span className="">{showAvailabity ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showAvailabity && (
                                    <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <FormControlLabel control={
                                            <Checkbox
                                                indeterminate={isIndeterminateAvailabity}
                                                checked={allCheckedAvailabity}
                                                onChange={handleCheckAllAvailabity}
                                                icon={<FaRegCircle />}
                                                indeterminateIcon={<FaMinusCircle />}
                                                checkedIcon={<FaCheckCircle />}
                                                sx={sxCheckBoxMinate}
                                            />
                                        }
                                            label="All"
                                            sx={sxControlLabel}
                                        />
                                        {filterAvailabity.map((vailabity) => (
                                            <FormControlLabel key={vailabity.id} control={
                                                <Checkbox
                                                    checked={checkedItemsAvailabity.includes(vailabity.id)}
                                                    onChange={() => handleCheckItemAvailabity(vailabity.id)}
                                                    icon={<FaRegCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBox}
                                                />
                                            }
                                                label={vailabity.title}
                                                sx={sxControlLabel}
                                            />
                                        ))}

                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowPrice(!showPrice)
                                    }}
                                >
                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Price</h3>
                                    <span className="">{showPrice ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showPrice && (
                                    <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <div className="px-2">
                                            <Slider
                                                value={[priceMin, priceMax]}
                                                onChange={handleChangeSlider}
                                                onChangeCommitted={handleChangeSliderCommitted}
                                                min={0}
                                                max={1000}
                                                valueLabelDisplay="auto"
                                                sx={sxSlider}
                                            />
                                        </div>
                                        <div className="flex justify-between gap-2 items-center">
                                            <TextField
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start"
                                                            >
                                                                <PiCurrencyDollar />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={priceMin}
                                                variant="outlined"
                                                sx={sxTextField}
                                                onChange={handleChangeInputPriceMin}
                                            />
                                            <p>to</p>
                                            <TextField
                                                type="number"
                                                slotProps={{
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start"
                                                            >
                                                                <PiCurrencyDollar />
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                value={priceMax}
                                                variant="outlined"
                                                sx={sxTextField}
                                                onChange={handleChangeInputPriceMax}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {!taxonsRetrieve ?
                                <>
                                    <div className="flex flex-col gap-5">
                                        <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                            onClick={() => {
                                                setShowTaxons(!showTaxons)
                                            }}
                                        >
                                            <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                            <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                        </button>
                                        {showTaxons &&
                                            <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                <TextField
                                                    type="search"
                                                    placeholder="Search of Taxons..."
                                                    sx={sxTextField}
                                                    onChange={(e) => setInputValueAllProject(e.target.value)}
                                                    value={inputValueAllProject}
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
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        indeterminate={isIndeterminateTaxonsAllProduct}
                                                        checked={allCheckedTaxonsAllProduct}
                                                        onChange={handleCheckAllTaxonsAllProduct}
                                                        icon={<FaRegCircle />}
                                                        indeterminateIcon={<FaMinusCircle />}
                                                        checkedIcon={<FaCheckCircle />}
                                                        sx={sxCheckBoxMinate}
                                                    />
                                                }
                                                    label="All"
                                                    sx={sxControlLabel}
                                                />
                                                {filterSearchAllProject.map((filter) => (
                                                    <FormControlLabel key={filter.id} control={
                                                        <Checkbox
                                                            checked={checkedItemsTaxonsAllProduct.includes(filter.id)}
                                                            onChange={() => handleCheckItemTaxonsAllProduct(filter.id)}
                                                            icon={<FaRegCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBox}
                                                        />
                                                    }
                                                        label={filter.title}
                                                        sx={sxControlLabel}
                                                    />
                                                ))}
                                            </div>
                                        }
                                    </div>

                                </>
                                :

                                <>
                                    {taxonsRetrieve?.data.attributes.name === 'Fashion' &&
                                        <>
                                            <div className="flex flex-col gap-5">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowTaxons(!showTaxons)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                    <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showTaxons &&
                                                    <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <TextField
                                                            type="search"
                                                            placeholder="Search of Taxons..."
                                                            sx={sxTextField}
                                                            onChange={(e) => setInputValueTaxonsFashion(e.target.value)}
                                                            value={inputValueTaxonsFashion}
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
                                                        <FormControlLabel control={
                                                            <Checkbox
                                                                indeterminate={isIndeterminateTaxonsFashion}
                                                                checked={allCheckedTaxonsFashion}
                                                                onChange={handleCheckAllTaxonsFashion}
                                                                icon={<FaRegCircle />}
                                                                indeterminateIcon={<FaMinusCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBoxMinate}
                                                            />
                                                        }
                                                            label="All"
                                                            sx={sxControlLabel}
                                                        />
                                                        {filterSearchTaxonsFashion.map((filter) => (
                                                            <FormControlLabel key={filter.id} control={
                                                                <Checkbox
                                                                    checked={checkedItemsTaxonsFashion.includes(filter.id)}
                                                                    onChange={() => handleCheckItemTaxonsFashion(filter.id)}
                                                                    icon={<FaRegCircle />}
                                                                    checkedIcon={<FaCheckCircle />}
                                                                    sx={sxCheckBox}
                                                                />
                                                            }
                                                                label={filter.title}
                                                                sx={sxControlLabel}
                                                            />
                                                        ))}
                                                    </div>
                                                }
                                            </div>

                                        </>
                                    }

                                    {taxonsRetrieve?.data.attributes.name === 'Wellness' &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Wellness..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueWellness(e.target.value)}
                                                        value={inputValueWellness}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsWellness}
                                                            checked={allCheckedTaxonsWellness}
                                                            onChange={handleCheckAllTaxonsWellness}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchWellness.map((filter) => (
                                                        <FormControlLabel key={filter.id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsWellness.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsWellness(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Men' && filterFashionMen!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsMen(e.target.value)}
                                                        value={inputValueTaxonsMen}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsMen}
                                                            checked={allCheckedTaxonsMen}
                                                            onChange={handleCheckAllTaxonsMen}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsMen!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsMen.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsMen(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Women' && filterFashionWomen!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsWomen(e.target.value)}
                                                        value={inputValueTaxonsWomen}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsWomen}
                                                            checked={allCheckedTaxonsWomen}
                                                            onChange={handleCheckAllTaxonsWomen}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsWomen!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsWomen.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsWomen(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Accessories' && filterFashionAccessories!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsAccessories(e.target.value)}
                                                        value={inputValueTaxonsAccessories}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsAccessories}
                                                            checked={allCheckedTaxonsAccessories}
                                                            onChange={handleCheckAllTaxonsAccessories}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsAccessories!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsAccessories.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsAccessories(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Fitness' && filterWellnessFitness!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsFitness(e.target.value)}
                                                        value={inputValueTaxonsFitness}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsFitness}
                                                            checked={allCheckedTaxonsFitness}
                                                            onChange={handleCheckAllTaxonsFitness}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsFitness!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsFitness.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsFitness(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Relaxation' && filterWellnessRelaxation!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsRelaxation(e.target.value)}
                                                        value={inputValueTaxonsRelaxation}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsRelaxation}
                                                            checked={allCheckedTaxonsRelaxation}
                                                            onChange={handleCheckAllTaxonsRelaxation}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsRelaxation!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsRelaxation.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsRelaxation(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Mental Stimulation' && filterWellnessMentalStimulation!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsMentalStimulation(e.target.value)}
                                                        value={inputValueTaxonsMentalStimulation}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsMentalStimulation}
                                                            checked={allCheckedTaxonsMentalStimulation}
                                                            onChange={handleCheckAllTaxonsMentalStimulation}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsMentalStimulation!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsMentalStimulation.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsMentalStimulation(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }

                                    {(taxonsRetrieve?.data.attributes.name === 'Nutrition' && filterWellnessNutrition!.length > 0) &&
                                        <div className="flex flex-col gap-5">
                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                onClick={() => {
                                                    setShowTaxons(!showTaxons)
                                                }}
                                            >
                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                            </button>
                                            {showTaxons && (
                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                    <TextField
                                                        type="search"
                                                        placeholder="Search of Taxons..."
                                                        sx={sxTextField}
                                                        onChange={(e) => setInputValueTaxonsNutrition(e.target.value)}
                                                        value={inputValueTaxonsNutrition}
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
                                                    <FormControlLabel control={
                                                        <Checkbox
                                                            indeterminate={isIndeterminateTaxonsNutrition}
                                                            checked={allCheckedTaxonsNutrition}
                                                            onChange={handleCheckAllTaxonsNutrition}
                                                            icon={<FaRegCircle />}
                                                            indeterminateIcon={<FaMinusCircle />}
                                                            checkedIcon={<FaCheckCircle />}
                                                            sx={sxCheckBoxMinate}
                                                        />
                                                    }
                                                        label="All"
                                                        sx={sxControlLabel}
                                                    />
                                                    {filterSearchTaxonsNutrition!.map((filter, id) => (
                                                        <FormControlLabel key={id} control={
                                                            <Checkbox
                                                                checked={checkedItemsTaxonsNutrition.includes(Number(filter.id))}
                                                                onChange={() => handleCheckItemTaxonsNutrition(Number(filter.id))}
                                                                icon={<FaRegCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBox}
                                                            />
                                                        }
                                                            label={filter.attributes.name}
                                                            sx={sxControlLabel}
                                                        />
                                                    ))}
                                                </div>)}
                                        </div>
                                    }
                                </>
                            }
                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowCollectons(!showCollectons)
                                    }}
                                >
                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Collectons</h3>
                                    <span className="">{showCollectons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showCollectons &&
                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <FormControlLabel control={
                                            <Checkbox
                                                indeterminate={isIndeterminateCollectonsAllProduct}
                                                checked={allCheckedCollectonsAllProduct}
                                                onChange={handleCheckAllCollectonsAllProduct}
                                                icon={<FaRegCircle />}
                                                indeterminateIcon={<FaMinusCircle />}
                                                checkedIcon={<FaCheckCircle />}
                                                sx={sxCheckBoxMinate}
                                            />
                                        }
                                            label="All"
                                            sx={sxControlLabel}
                                        />
                                        {filterCollectonsAllProduct.map((filter) => (
                                            <FormControlLabel key={filter.id} control={
                                                <Checkbox
                                                    checked={checkedItemsCollectonsAllProduct.includes(filter.id)}
                                                    onChange={() => handleCheckItemCollectonsAllProduct(filter.id)}
                                                    icon={<FaRegCircle />}
                                                    checkedIcon={<FaCheckCircle />}
                                                    sx={sxCheckBox}
                                                />
                                            }
                                                label={filter.title}
                                                sx={sxControlLabel}
                                            />
                                        ))}
                                    </div>
                                }
                            </div>

                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowColor(!showColor)
                                    }}
                                >
                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Color</h3>
                                    <span className="">{showColor ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showColor && (
                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <TextField
                                            type="search"
                                            placeholder="Search of Color..."
                                            sx={sxTextField}
                                            onChange={(e) => setInputValueColor(e.target.value)}
                                            value={inputValueColor}
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
                                        {filterSearchColor.length > 0 ? (
                                            <div className="flex flex-wrap gap-4">
                                                {filterSearchColor.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => handleSelectColor(res.id)}
                                                        style={{
                                                            border: checkedColor.includes(res.id) ? (
                                                                toLowerNoSpace(res.title) === 'white'
                                                                    ? '1px solid var(--color-gray-300)'
                                                                    : toLowerNoSpace(res.title) === 'cream'
                                                                        ? '1px solid var(--color-gray-300)'
                                                                        : `1px solid ${toLowerNoSpace(res.title)}`
                                                            ) : ""
                                                        }}
                                                        className={`flex items-center gap-2 p-2 rounded-3xl transition-all duration-300
                                                            ${checkedColor.includes(res.id)
                                                                ? 'bg-white shadow-lg scale-[1.05]'
                                                                : 'bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md'}
                                                             `}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span
                                                                style={{
                                                                    background: toLowerNoSpace(res.title) === 'cream' ? "lightyellow" : toLowerNoSpace(res.title),
                                                                    border: toLowerNoSpace(res.title) === 'white' ? '1px solid var(--color-gray-300)' : 'none',
                                                                    boxShadow:
                                                                        toLowerNoSpace(res.title) === 'white'
                                                                            ? 'inset 0 0 3px rgba(0,0,0,0.1)'
                                                                            : '0 0 4px rgba(0,0,0,0.08)',
                                                                }}
                                                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                                                                    ${checkedColor.includes(res.id) ? 'opacity-100 ' : 'opacity-70'}`}
                                                            >
                                                                {checkedColor.includes(res.id) && (
                                                                    <svg className="w-3 h-3 text-white mix-blend-difference" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                            <p
                                                                className={`text-sm transition-colors ${checkedColor.includes(res.id)
                                                                    ? 'text-gray-800 font-medium'
                                                                    : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                    }`}
                                                            >
                                                                {res.title}
                                                            </p>
                                                        </div>
                                                    </button>

                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">
                                                No color found.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-5">
                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                    onClick={() => {
                                        setShowSize(!showSize)
                                    }}
                                >
                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Size</h3>
                                    <span className="">{showSize ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                </button>
                                {showSize && (
                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                        <TextField
                                            type="search"
                                            placeholder="Search of size..."
                                            sx={sxTextField}
                                            onChange={(e) => setInputValueSize(e.target.value)}
                                            value={inputValueSize}
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
                                        {filterSearchSize.length > 0 ? (
                                            <div className="flex flex-wrap gap-3">
                                                {filterSearchSize.map((res) => (
                                                    <button
                                                        key={res.id}
                                                        onClick={() => handleSelectSize(res.id)}
                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl group ${checkedSize.includes(res.id) ? 'bg-white shadow-lg scale-[1.03] border border-gray-300'
                                                            : 'bg-gray-50 hover:bg-gray-100 shadow-sm'}`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <p className={`text-sm text-start ${checkedSize.includes(res.id)
                                                                ? 'text-gray-800 font-medium'
                                                                : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                }`}>{res.title}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-400 text-sm italic">
                                                No size found.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </aside >
                        <section className="flex flex-col gap-5"
                            data-aos="fade-left"
                            data-aos-duration="1200">
                            <div className="flex items-center justify-between max-lg:hidden">
                                <h3 className="text-lg flex gap-2 tracking-wide text-black/70 ">
                                    Showing
                                    <span className=" text-green-600 font-bold">
                                        {products.length === 0 ?
                                            0 :
                                            filteredProducts.length > totalDatas
                                                ?
                                                totalDatas
                                                : filteredProducts.length
                                        }
                                    </span> of {totalDatas}
                                </h3>
                                <button
                                    className={`
                    ${openSortBy ? "shadow-xl " : ""} 
                    flex justify-between items-center w-full sm:w-auto 
                    px-3 py-2 md:px-4 md:py-2  md:rounded-xl 
                     transition-all duration-300 ease 
                    h-[40px] hover:shadow-xl rounded-xl transition-all duration-300 
                `}
                                    onClick={handleClickSortBy}
                                >
                                    <div className="flex items-center gap-2 md:gap-4">
                                        <p className="text-black/70 text-md">Sort by:</p>
                                        <p className=" text-lg w-[80px] md:w-[120px] text-start truncate">
                                            {sortBy}
                                        </p>
                                    </div>
                                    <span className="transtion-all duration-300 ease ml-2">
                                        {openSortBy ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                                    </span>
                                </button>
                                <Menu
                                    anchorEl={anchorElSortBy}
                                    open={openSortBy}
                                    onClose={handleCloseSortBy}
                                    PaperProps={PaperProps}
                                    MenuListProps={MenuListProps}
                                >
                                    <MenuItem onClick={handleSortDefault} sx={sxMenuItem}>
                                        Relevance
                                    </MenuItem>
                                    <MenuItem onClick={handleSortHighest} sx={sxMenuItem}>
                                        Price (Highest)
                                    </MenuItem>
                                    <MenuItem onClick={handleSortLowest} sx={sxMenuItem}>
                                        Price (Lowest)
                                    </MenuItem>
                                    <MenuItem onClick={handleSortNewest} sx={sxMenuItem}>
                                        Release Date (Newest)
                                    </MenuItem>
                                    <MenuItem onClick={handleSortOldest} sx={sxMenuItem}>
                                        Release Date (Oldest)
                                    </MenuItem>
                                    <MenuItem onClick={handleSortAtoZ} sx={sxMenuItem}>
                                        Title (A-Z)
                                    </MenuItem>
                                    <MenuItem onClick={handleSortZtoA} sx={sxMenuItem}>
                                        Title (Z-A)
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className="grid grid-cols-2 gap-5 items-center lg:hidden">
                                <button
                                    onClick={toggleDrawerFilter(true)}
                                    className="flex items-center w-full px-5 gap-3 h-[40px] transition-all duration-300 ease border border-slate-100 shadow-md hover:shadow-xl rounded-xl">
                                    <span className="w-full text-black/70 text-lg">Filter</span>
                                    <FaChevronDown size={14} />
                                </button>
                                <Drawer
                                    anchor="left"
                                    open={openDrawerFilter}
                                    onClose={toggleDrawerFilter(false)}
                                    PaperProps={sxPaperPropsDrawer}
                                >
                                    <Box sx={sxBox1Drawer}>
                                        <div className="max-h-70vh flex flex-col overflow-y-auto scroll-y">
                                            <div className='flex justify-between items-center px-[16px] py-[12px] cursor-pointer'>
                                                <h3 className=" text-2xl">Filter</h3>
                                                <a onClick={() => {
                                                    setOpenDrawerFilter(false)
                                                    router.push('/')
                                                }}>
                                                    <img className="w-30 custom-desktop-height "
                                                        alt="Spree Commerce DEMO logo"
                                                        src="../../LogoFullBlack.webp" />
                                                </a>
                                                <IconButton onClick={toggleDrawerFilter(false)} >
                                                    <IoClose className='mx-auto' size={24} />
                                                </IconButton>
                                            </div>
                                            <Divider sx={sxDivider} />
                                            <div className="p-4 flex flex-col gap-4">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowAvailabity(!showAvailabity)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Availabity</h3>
                                                    <span className="">{showAvailabity ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showAvailabity && (
                                                    <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <FormControlLabel control={
                                                            <Checkbox
                                                                indeterminate={isIndeterminateAvailabity}
                                                                checked={allCheckedAvailabity}
                                                                onChange={handleCheckAllAvailabity}
                                                                icon={<FaRegCircle />}
                                                                indeterminateIcon={<FaMinusCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBoxMinate}
                                                            />
                                                        }
                                                            label="All"
                                                            sx={sxControlLabel}
                                                        />
                                                        {filterAvailabity.map((vailabity) => (
                                                            <FormControlLabel key={vailabity.id} control={
                                                                <Checkbox
                                                                    checked={checkedItemsAvailabity.includes(vailabity.id)}
                                                                    onChange={() => handleCheckItemAvailabity(vailabity.id)}
                                                                    icon={<FaRegCircle />}
                                                                    checkedIcon={<FaCheckCircle />}
                                                                    sx={sxCheckBox}
                                                                />
                                                            }
                                                                label={vailabity.title}
                                                                sx={sxControlLabel}
                                                            />
                                                        ))}

                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex flex-col gap-4">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowPrice(!showPrice)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Price</h3>
                                                    <span className="">{showPrice ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showPrice && (
                                                    <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <div className="px-2">
                                                            <Slider
                                                                value={[priceMin, priceMax]}
                                                                onChange={handleChangeSlider}
                                                                onChangeCommitted={handleChangeSliderCommitted}
                                                                min={0}
                                                                max={1000}
                                                                valueLabelDisplay="auto"
                                                                sx={sxSlider}
                                                            />
                                                        </div>
                                                        <div className="flex justify-between gap-2 items-center">
                                                            <TextField
                                                                type="number"
                                                                slotProps={{
                                                                    input: {
                                                                        startAdornment: (
                                                                            <InputAdornment position="start"
                                                                            >
                                                                                <PiCurrencyDollar />
                                                                            </InputAdornment>
                                                                        ),
                                                                    },
                                                                }}
                                                                value={priceMin}
                                                                variant="outlined"
                                                                sx={sxTextField}
                                                                onChange={handleChangeInputPriceMin}
                                                            />
                                                            <p>to</p>
                                                            <TextField
                                                                type="number"
                                                                slotProps={{
                                                                    input: {
                                                                        startAdornment: (
                                                                            <InputAdornment position="start"
                                                                            >
                                                                                <PiCurrencyDollar />
                                                                            </InputAdornment>
                                                                        ),
                                                                    },
                                                                }}
                                                                value={priceMax}
                                                                variant="outlined"
                                                                sx={sxTextField}
                                                                onChange={handleChangeInputPriceMax}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            {!taxonsRetrieve ?
                                                <div className="p-4 flex flex-col gap-4">
                                                    <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                        onClick={() => {
                                                            setShowTaxons(!showTaxons)
                                                        }}
                                                    >
                                                        <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                        <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                    </button>
                                                    {showTaxons &&
                                                        <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                            <TextField
                                                                type="search"
                                                                placeholder="Search of Taxons..."
                                                                sx={sxTextField}
                                                                onChange={(e) => setInputValueAllProject(e.target.value)}
                                                                value={inputValueAllProject}
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
                                                            <FormControlLabel control={
                                                                <Checkbox
                                                                    indeterminate={isIndeterminateTaxonsAllProduct}
                                                                    checked={allCheckedTaxonsAllProduct}
                                                                    onChange={handleCheckAllTaxonsAllProduct}
                                                                    icon={<FaRegCircle />}
                                                                    indeterminateIcon={<FaMinusCircle />}
                                                                    checkedIcon={<FaCheckCircle />}
                                                                    sx={sxCheckBoxMinate}
                                                                />
                                                            }
                                                                label="All"
                                                                sx={sxControlLabel}
                                                            />
                                                            {filterSearchAllProject.map((filter) => (
                                                                <FormControlLabel key={filter.id} control={
                                                                    <Checkbox
                                                                        checked={checkedItemsTaxonsAllProduct.includes(filter.id)}
                                                                        onChange={() => handleCheckItemTaxonsAllProduct(filter.id)}
                                                                        icon={<FaRegCircle />}
                                                                        checkedIcon={<FaCheckCircle />}
                                                                        sx={sxCheckBox}
                                                                    />
                                                                }
                                                                    label={filter.title}
                                                                    sx={sxControlLabel}
                                                                />
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                                :
                                                <>
                                                    {taxonsRetrieve?.data.attributes.name === 'Fashion' &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons &&
                                                                <div className="text-md  text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsFashion(e.target.value)}
                                                                        value={inputValueTaxonsFashion}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsFashion}
                                                                            checked={allCheckedTaxonsFashion}
                                                                            onChange={handleCheckAllTaxonsFashion}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsFashion.map((filter) => (
                                                                        <FormControlLabel key={filter.id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsFashion.includes(filter.id)}
                                                                                onChange={() => handleCheckItemTaxonsFashion(filter.id)}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.title}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                    {taxonsRetrieve?.data.attributes.name === 'Wellness' &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Wellness..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueWellness(e.target.value)}
                                                                        value={inputValueWellness}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsWellness}
                                                                            checked={allCheckedTaxonsWellness}
                                                                            onChange={handleCheckAllTaxonsWellness}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchWellness.map((filter) => (
                                                                        <FormControlLabel key={filter.id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsWellness.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsWellness(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Men' && filterFashionMen!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsMen(e.target.value)}
                                                                        value={inputValueTaxonsMen}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsMen}
                                                                            checked={allCheckedTaxonsMen}
                                                                            onChange={handleCheckAllTaxonsMen}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsMen!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsMen.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsMen(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Women' && filterFashionWomen!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsWomen(e.target.value)}
                                                                        value={inputValueTaxonsWomen}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsWomen}
                                                                            checked={allCheckedTaxonsWomen}
                                                                            onChange={handleCheckAllTaxonsWomen}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsWomen!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsWomen.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsWomen(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Accessories' && filterFashionAccessories!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsAccessories(e.target.value)}
                                                                        value={inputValueTaxonsAccessories}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsAccessories}
                                                                            checked={allCheckedTaxonsAccessories}
                                                                            onChange={handleCheckAllTaxonsAccessories}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsAccessories!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsAccessories.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsAccessories(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Fitness' && filterWellnessFitness!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsFitness(e.target.value)}
                                                                        value={inputValueTaxonsFitness}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsFitness}
                                                                            checked={allCheckedTaxonsFitness}
                                                                            onChange={handleCheckAllTaxonsFitness}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsFitness!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsFitness.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsFitness(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Relaxation' && filterWellnessRelaxation!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsRelaxation(e.target.value)}
                                                                        value={inputValueTaxonsRelaxation}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsRelaxation}
                                                                            checked={allCheckedTaxonsRelaxation}
                                                                            onChange={handleCheckAllTaxonsRelaxation}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsRelaxation!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsRelaxation.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsRelaxation(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Mental Stimulation' && filterWellnessMentalStimulation!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsMentalStimulation(e.target.value)}
                                                                        value={inputValueTaxonsMentalStimulation}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsMentalStimulation}
                                                                            checked={allCheckedTaxonsMentalStimulation}
                                                                            onChange={handleCheckAllTaxonsMentalStimulation}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsMentalStimulation!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsMentalStimulation.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsMentalStimulation(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    {(taxonsRetrieve?.data.attributes.name === 'Nutrition' && filterWellnessNutrition!.length > 0) &&
                                                        <div className="p-4 flex flex-col gap-4">
                                                            <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                                onClick={() => {
                                                                    setShowTaxons(!showTaxons)
                                                                }}
                                                            >
                                                                <h3 className="text-md font-medium bg-clip-text tracking-wide">Categories</h3>
                                                                <span className="">{showTaxons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                            </button>
                                                            {showTaxons && (
                                                                <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                                    <TextField
                                                                        type="search"
                                                                        placeholder="Search of Taxons..."
                                                                        sx={sxTextField}
                                                                        onChange={(e) => setInputValueTaxonsNutrition(e.target.value)}
                                                                        value={inputValueTaxonsNutrition}
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
                                                                    <FormControlLabel control={
                                                                        <Checkbox
                                                                            indeterminate={isIndeterminateTaxonsNutrition}
                                                                            checked={allCheckedTaxonsNutrition}
                                                                            onChange={handleCheckAllTaxonsNutrition}
                                                                            icon={<FaRegCircle />}
                                                                            indeterminateIcon={<FaMinusCircle />}
                                                                            checkedIcon={<FaCheckCircle />}
                                                                            sx={sxCheckBoxMinate}
                                                                        />
                                                                    }
                                                                        label="All"
                                                                        sx={sxControlLabel}
                                                                    />
                                                                    {filterSearchTaxonsNutrition!.map((filter, id) => (
                                                                        <FormControlLabel key={id} control={
                                                                            <Checkbox
                                                                                checked={checkedItemsTaxonsNutrition.includes(Number(filter.id))}
                                                                                onChange={() => handleCheckItemTaxonsNutrition(Number(filter.id))}
                                                                                icon={<FaRegCircle />}
                                                                                checkedIcon={<FaCheckCircle />}
                                                                                sx={sxCheckBox}
                                                                            />
                                                                        }
                                                                            label={filter.attributes.name}
                                                                            sx={sxControlLabel}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    }

                                                </>
                                            }
                                            <div className="p-4 flex flex-col gap-4">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowCollectons(!showCollectons)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Collectons</h3>
                                                    <span className="">{showCollectons ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showCollectons &&
                                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <FormControlLabel control={
                                                            <Checkbox
                                                                indeterminate={isIndeterminateCollectonsAllProduct}
                                                                checked={allCheckedCollectonsAllProduct}
                                                                onChange={handleCheckAllCollectonsAllProduct}
                                                                icon={<FaRegCircle />}
                                                                indeterminateIcon={<FaMinusCircle />}
                                                                checkedIcon={<FaCheckCircle />}
                                                                sx={sxCheckBoxMinate}
                                                            />
                                                        }
                                                            label="All"
                                                            sx={sxControlLabel}
                                                        />
                                                        {filterCollectonsAllProduct.map((filter) => (
                                                            <FormControlLabel key={filter.id} control={
                                                                <Checkbox
                                                                    checked={checkedItemsCollectonsAllProduct.includes(filter.id)}
                                                                    onChange={() => handleCheckItemCollectonsAllProduct(filter.id)}
                                                                    icon={<FaRegCircle />}
                                                                    checkedIcon={<FaCheckCircle />}
                                                                    sx={sxCheckBox}
                                                                />
                                                            }
                                                                label={filter.title}
                                                                sx={sxControlLabel}
                                                            />
                                                        ))}
                                                    </div>
                                                }
                                            </div>
                                            <div className="p-4 flex flex-col gap-4">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowColor(!showColor)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Color</h3>
                                                    <span className="">{showColor ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showColor && (
                                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <TextField
                                                            type="search"
                                                            placeholder="Search of Color..."
                                                            sx={sxTextField}
                                                            onChange={(e) => setInputValueColor(e.target.value)}
                                                            value={inputValueColor}
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
                                                        {filterSearchColor.length > 0 ? (
                                                            <div className="flex flex-wrap gap-4">
                                                                {filterSearchColor.map((res) => (
                                                                    <button
                                                                        key={res.id}
                                                                        onClick={() => handleSelectColor(res.id)}
                                                                        style={{
                                                                            border: checkedColor.includes(res.id) ? (
                                                                                toLowerNoSpace(res.title) === 'white'
                                                                                    ? '1px solid var(--color-gray-300)'
                                                                                    : toLowerNoSpace(res.title) === 'cream'
                                                                                        ? '1px solid var(--color-gray-300)'
                                                                                        : `1px solid ${toLowerNoSpace(res.title)}`
                                                                            ) : ""
                                                                        }}
                                                                        className={`flex items-center gap-2 p-2 rounded-3xl transition-all duration-300
                                                            ${checkedColor.includes(res.id)
                                                                                ? 'bg-white shadow-lg scale-[1.05]'
                                                                                : 'bg-gray-50 hover:bg-gray-100 shadow-sm hover:shadow-md'}
                                                             `}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <span
                                                                                style={{
                                                                                    background: toLowerNoSpace(res.title) === 'cream' ? "lightyellow" : toLowerNoSpace(res.title),
                                                                                    border: toLowerNoSpace(res.title) === 'white' ? '1px solid var(--color-gray-300)' : 'none',
                                                                                    boxShadow:
                                                                                        toLowerNoSpace(res.title) === 'white'
                                                                                            ? 'inset 0 0 3px rgba(0,0,0,0.1)'
                                                                                            : '0 0 4px rgba(0,0,0,0.08)',
                                                                                }}
                                                                                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 
                                                                    ${checkedColor.includes(res.id) ? 'opacity-100 ' : 'opacity-70'}`}
                                                                            >
                                                                                {checkedColor.includes(res.id) && (
                                                                                    <svg className="w-3 h-3 text-white mix-blend-difference" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                                    </svg>
                                                                                )}
                                                                            </span>
                                                                            <p
                                                                                className={`text-sm transition-colors ${checkedColor.includes(res.id)
                                                                                    ? 'text-gray-800 font-medium'
                                                                                    : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                                    }`}
                                                                            >
                                                                                {res.title}
                                                                            </p>
                                                                        </div>
                                                                    </button>

                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-400 text-sm italic">
                                                                No color found.
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 flex flex-col gap-4">
                                                <button className="flex justify-between items-center w-full transition-all duration-300 ease"
                                                    onClick={() => {
                                                        setShowSize(!showSize)
                                                    }}
                                                >
                                                    <h3 className="text-md font-medium bg-clip-text tracking-wide">Size</h3>
                                                    <span className="">{showSize ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}</span>
                                                </button>
                                                {showSize && (
                                                    <div className="text-md text-black/70 gap-4 flex flex-col transition-all duration-300 ease">
                                                        <TextField
                                                            type="search"
                                                            placeholder="Search of size..."
                                                            sx={sxTextField}
                                                            onChange={(e) => setInputValueSize(e.target.value)}
                                                            value={inputValueSize}
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
                                                        {filterSearchSize.length > 0 ? (
                                                            <div className="flex flex-wrap gap-3">
                                                                {filterSearchSize.map((res) => (
                                                                    <button
                                                                        key={res.id}
                                                                        onClick={() => handleSelectSize(res.id)}
                                                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl group ${checkedSize.includes(res.id) ? 'bg-white shadow-lg scale-[1.03] border border-gray-300'
                                                                            : 'bg-gray-50 hover:bg-gray-100 shadow-sm'}`}
                                                                    >
                                                                        <div className="flex items-center gap-4">
                                                                            <p className={`text-sm text-start ${checkedSize.includes(res.id)
                                                                                ? 'text-gray-800 font-medium'
                                                                                : 'text-gray-400 font-medium group-hover:text-gray-500'
                                                                                }`}>{res.title}</p>
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-400 text-sm italic">
                                                                No size found.
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 p-5 mt-auto">
                                            <button
                                                onClick={toggleDrawerFilter(false)}
                                                className="h-[50px] rounded-xl bg-gradient-to-br from-green-500 px-10 to-emerald-600 text-white 
                            hover:from-green-600 hover:to-emerald-700 hover:shadow-xl uppercase
                            font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg relative overflow-hidden group"
                                            >Filter
                                                <div className="absolute inset-0 overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                                </div>
                                                <div className="absolute inset-0 rounded-xl border-2 border-green-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            </button>
                                            <button
                                                className='px-16 uppercase h-[50px] rounded-xl border border-green-600 text-green-600 font-semibold transition-transform hover:border-green-700 hover:scale-105'
                                                onClick={() => {
                                                    handleClearAllFilters()
                                                    setOpenDrawerFilter(false)
                                                }}
                                            >Clear</button>
                                        </div>
                                    </Box>
                                </Drawer>
                                <button
                                    onClick={toggleDrawerSort(true)}
                                    className="flex items-center w-full px-5 gap-3 h-[40px] transition-all duration-300 ease border border-slate-100 shadow-md hover:shadow-xl rounded-xl">
                                    <span className="w-full text-black/70 text-lg">Sort</span>
                                    <FaChevronDown size={14} />
                                </button>
                                <Drawer
                                    anchor="left"
                                    open={openDrawerSort}
                                    onClose={toggleDrawerSort(false)}
                                    PaperProps={sxPaperPropsDrawer}
                                >
                                    <Box sx={sxBox1Drawer}>
                                        <div className="max-h-70vh flex flex-col overflow-y-auto scroll-y">
                                            <div className='flex justify-between items-center px-[16px] py-[12px] cursor-pointer'>
                                                <h3 className=" text-2xl">Sort</h3>
                                                <a onClick={() => {
                                                    setOpenDrawerSort(false)
                                                    router.push('/')
                                                }}>
                                                    <img className="w-30 custom-desktop-height "
                                                        alt="Spree Commerce DEMO logo"
                                                        src="../../LogoFullBlack.webp" />
                                                </a>
                                                <IconButton onClick={toggleDrawerSort(false)} >
                                                    <IoClose className='mx-auto' size={24} />
                                                </IconButton>
                                            </div>
                                            <Divider sx={sxDivider} />
                                            <List>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortDefault()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Relevance</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortHighest()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Price (Highest)</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortLowest()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Price (Lowest)</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortNewest()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Release Date (Newest)</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortOldest()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Release Date (Oldest)</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortAtoZ()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Title (A-Z)</ListItem>
                                                <ListItem
                                                    onClick={() => {
                                                        handleSortZtoA()
                                                        setOpenDrawerSort(false)
                                                    }}
                                                    sx={sxListItemDrawer}>Title (Z-A)</ListItem>
                                            </List>
                                        </div>
                                    </Box>
                                </Drawer>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                                <ListProductCard products={filteredProducts ?? []} included={included ?? []} />
                            </div>

                            {loadingReadMore && <p className="text-center py-4 text-gray-500">loading more...</p>}

                        </section>

                    </div >
                }
            </div >
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default ListProduct