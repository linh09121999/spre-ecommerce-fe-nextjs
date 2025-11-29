"use client"

import ListProduct from "@/components/listProduct";
import { ListAllProducts } from "@/service/storefront/products";
import { RetrieveATaxon } from "@/service/storefront/taxons";
import { useStateGeneral } from "@/useState/useStateGeneralStoreFront";
import { useState_ResProducts, useState_ResTaxons } from "@/useState/useStatestorefront";

import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const Accessories: React.FC = () => {
    const { resDataIcludes_List, resDataProducts_List, setResDataIcludes_List, setResDataProduct_List } = useState_ResProducts()
    const { resTaxons_Retrieve, setResTaxons_Retrieve } = useState_ResTaxons()

    const { setLoading, setSelectNav, prePage, loadingReadMore, setLoadingReadMore,
        currentPage, setCurrentPage, totalDatas, totalPages, setTotalDatas, setTotalPages,
        setSortBy, setSortOption, sortBy, sortOption
    } = useStateGeneral()

    const getApiTaxonsFashion = async (taxon_permalink: string) => {
        try {
            setLoading(true);
            const res = await RetrieveATaxon(taxon_permalink)
            setResTaxons_Retrieve(res.data)
        } catch (error: any) {
            toast.error(`Retrueve a taxon: ` + error.response.data.error)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
        }
    }

    const getApiProducts = async (filter_taxons: string, page: number, per_page: number, include: string) => {
        try {
            { page === 1 ? setLoading(true) : setLoadingReadMore(true) }
            setLoadingReadMore(true)
            const res = await ListAllProducts({ filter_taxons, page, per_page, include })
            setTotalDatas(res.data.meta.total_count)
            setTotalPages(res.data.meta.total_pages)
            setCurrentPage(page); // cập nhật page hiện tại sau khi load xong

            if (page === 1) {
                setResDataProduct_List(res.data.data);
                setResDataIcludes_List(res.data.included)
            } else {
                setResDataProduct_List((prev) => [...prev, ...res.data.data]);
                setResDataIcludes_List((prev) => [...prev, ...res.data.included])
            }
        } catch (error: any) {
            toast.error(`Products: ` + error.response.data.error)
            setResDataProduct_List([])
            setResDataIcludes_List([])
            setCurrentPage(0)
        }
        finally {
            setLoading(false); // 👈 tắt loading sau khi có dữ liệu
            setLoadingReadMore(false)
        }
    }

    useEffect(() => {
        setSelectNav(1)
        getApiTaxonsFashion("categories/fashion/accessories")
        getApiProducts("179", 1, prePage, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
    }, [])

    // Infinite scroll
    useEffect(() => {
        if (sortBy !== "Relevance") setSortBy("Relevance");
        if (sortOption !== "relevance") setSortOption("relevance");
        const handleScroll = () => {
            if (loadingReadMore) return;

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
                if (currentPage < totalPages) {
                    getApiProducts("179", currentPage + 1, prePage, "default_variant,variants,option_types,product_properties,taxons,images,primary_variant")
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingReadMore, currentPage, totalDatas, getApiProducts]);

    return (
        <>
            <ListProduct included={resDataIcludes_List ?? []} products={resDataProducts_List ?? []} taxonsRetrieve={resTaxons_Retrieve!} />
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Accessories