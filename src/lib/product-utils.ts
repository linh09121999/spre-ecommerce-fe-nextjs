import { IncludedTaxon } from "@/interface/interface";
import { ResProduct_ListAll } from "@/interface/responseData/interfaceStorefront";
import { ListAllProducts } from "@/service/storefront/products";

export interface SimplifiedProduct {
    id: string;
    name: string;
    description: string;
    price: string;
    compare_at_price: string | null,
    display_price: string;
    display_compare_at_price: string | null,
    category: string;
    subCategory: string;
    image_url?: string | null;
    slug: string;
    available: boolean;
    in_stock: boolean;
    tags: string[];
    brand?: string | null;
}

export async function getProductsForChatbot(category?: string, subCategory?: string): Promise<SimplifiedProduct[]> {
    try {
        const filters: any = {};

        // Dynamic taxon filter
        if (category || subCategory) {
            let taxonFilter = '';

            if (category === 'fashion') {
                if (subCategory === 'men') taxonFilter = 'men';
                else if (subCategory === 'women') taxonFilter = 'women';
                else if (subCategory === 'accessories') taxonFilter = 'accessories';
            }

            if (category === 'wellness') {
                if (subCategory === 'fitness') taxonFilter = 'fitness';
                else if (subCategory === 'relaxation') taxonFilter = 'relaxation';
                else if (subCategory === 'mental-stimulation') taxonFilter = 'mental-stimulation';
                else if (subCategory === 'nutrition') taxonFilter = 'nutrition';
            }

            if (taxonFilter) {
                filters.filter_taxons = taxonFilter;
            }
        }

        filters.filter_purchasable = true;
        filters.filter_in_stock = true;
        filters.per_page = 50;
        filters.include = 'images,taxons';

        const response = await ListAllProducts(filters);
        const data = response.data as ResProduct_ListAll;

        // console.log('data', data)

        return data.data.map(product => {
            // CATEGORY HANDLING
            let category = 'uncategorized';
            let subCategory = 'general';

            const taxons = data.included.filter(
                item => item.type === 'taxon'
            ) as IncludedTaxon[];

            const productTaxons = taxons.filter(taxon =>
                product.relationships?.taxons?.data?.some(t => t.id === taxon.id)
            );

            if (productTaxons.length > 0) {
                const mainTaxon = productTaxons[0];
                const taxonName = mainTaxon.attributes.name.toLowerCase();

                if (['men', 'women', 'accessories'].includes(taxonName)) {
                    category = 'fashion';
                    subCategory = taxonName;
                } else if (
                    ['fitness', 'relaxation', 'nutrition', 'mental', 'stimulation']
                        .some(t => taxonName.includes(t))
                ) {
                    category = 'wellness';
                    subCategory =
                        taxonName.includes('fitness') ? 'fitness' :
                            taxonName.includes('relaxation') ? 'relaxation' :
                                taxonName.includes('nutrition') ? 'nutrition' :
                                    'mental-stimulation';
                }
            }

            // IMAGE HANDLING
            let image_url: string | null = null;
            const images = data.included.filter(
                img =>
                    img.type === 'image' &&
                    product.relationships?.images?.data?.some(i => i.id === img.id)
            );

            if (images.length > 0) {
                const imgAttr = images[0].attributes as any;
                image_url = imgAttr?.original_url ||
                    null;
            }

            // BRAND HANDLING
            let brand: string | null = null;
            const properties = data.included.filter(
                prop =>
                    prop.type === 'product_property' &&
                    product.relationships?.product_properties?.data?.some(i => i.id === prop.id)
            );

            const brandProperty = properties.find((prop: any) =>
                prop.attributes?.name?.toLowerCase().includes('brand')
            );

            if (brandProperty) {
                brand = (brandProperty as any).attributes.value;
            }

            const dataReturn = {
                id: product.id,
                name: product.attributes.name,
                description: product.attributes.description || '',
                price: product.attributes.price,
                compare_at_price: product.attributes.compare_at_price || null,
                display_price: product.attributes.display_price,
                display_compare_at_price: product.attributes.display_compare_at_price || null,
                category,
                subCategory,
                image_url,
                slug: product.attributes.slug,
                available: product.attributes.available,
                in_stock: product.attributes.in_stock,
                tags: Array.isArray(product.attributes.tags)
                    ? product.attributes.tags.map((t: any) => t.name || t.value || String(t))
                    : [],
                brand
            }

            return dataReturn
        });

    } catch (error) {
        console.error('Error fetching products for chatbot:', error);
        return [];
    }
}

export function filterProductsByContext(products: SimplifiedProduct[], context: any): SimplifiedProduct[] {
    // console.log("DEBUG CONTEXT:", context);

    let filtered = [...products];

    // CATEGORY
    if (context?.currentCategory) {
        const cat = context.currentCategory.toLowerCase();
        filtered = filtered.filter(p => p.category?.toLowerCase().includes(cat));
    }

    // console.log("AFTER CATEGORY:", filtered.length);

    // SUB CATEGORY
    if (context?.subCategory) {
        const sub = context.subCategory.toLowerCase().replace(/[\s_-]+/g, "-");
        filtered = filtered.filter(p =>
            p.subCategory.toLowerCase().replace(/[\s_-]+/g, "-").includes(sub)
        );
    }

    // console.log("AFTER SUBCATEGORY:", filtered.length);

    // BUDGET
    if (context?.budget) {
        const budgetNum = parseFloat(context.budget.replace(/[^0-9.]/g, ''));
        if (!isNaN(budgetNum)) {
            filtered = filtered.filter(p => parseFloat(p.price) <= budgetNum);
        }
    }

    // console.log("AFTER BUDGET:", filtered.length);

    // STYLE
    // if (context?.style) {
    //     const style = context.style.toLowerCase();
    //     filtered = filtered.filter(p =>
    //         p.name.toLowerCase().includes(style) ||
    //         p.description.toLowerCase().includes(style) ||
    //         p.tags.some(tag => tag.toLowerCase().includes(style))
    //     );
    // }

    // console.log("AFTER STYLE:", filtered.length);

    return filtered.slice(0, 6);
}
