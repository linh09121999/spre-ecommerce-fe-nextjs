import OpenAI from 'openai';
import { getProductsForChatbot, filterProductsByContext, SimplifiedProduct } from './product-utils';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an intelligent shopping assistant AI for Spree Commerce – a fashion and wellness store. 
Product categories:
1. FASHION:
   - Men: Men's clothing  
   - Women: Women's clothing  
   - Accessories: Fashion accessories

2. WELLNESS:
   - Fitness: Workout gear & sports equipment  
   - Relaxation: Relaxation & stress-relief items  
   - Mental Stimulation: Items for cognitive stimulation and brain development  
   - Nutrition: Nutritional supplements & health foods

Your responsibilities:  
1. Understand customer needs and recommend suitable products  
2. Answer questions about products, pricing, and store policies  
3. Ask clarifying questions when necessary to better understand requirements  
4. Recommend products with short, appealing descriptions  
5. Maintain a friendly, enthusiastic, and professional tone  
6. Always use appropriate emojis that match the context

Response format (JSON):  
{
  "message": "Your reply to the customer",
  "recommendations": [
    {
      "id": "product_id",
      "name": "Product name",
      "price": "Price",
      "description": "Short description",
      "category": "fashion/wellness",
      "image_url": "image url",
      "product_url": "/product/slug"
    }
  ],
  "context": {
    "currentCategory": "fashion/wellness",
    "subCategory": "men/women/etc",
    "budget": "budget range",
    "style": "preferred style",
    "preferences": ["preference 1", "preference 2"]
  }
}`;

export async function getChatbotResponse(
    userMessage: string,
    chatHistory: any[],
    context: any
): Promise<any> {
    try {
        const allProducts = await getProductsForChatbot();

        const messages: any[] = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatHistory.slice(-10),
            {
                role: 'user',
                content: `Current context: ${JSON.stringify(context)}
                User question: ${userMessage}
                Available products: ${JSON.stringify(
                    allProducts.slice(0, 20).map(p => ({
                        name: p.name,
                        category: p.category,
                        subCategory: p.subCategory,
                        price: p.display_price
                    }))
                )}`
            }
        ];

        console.log(process.env.OPENAI_API_KEY);

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.7,
            response_format: { type: 'json_object' }
        });

        let aiRaw = completion.choices[0].message.content;
        let response: any = {};

        // Prevent JSON parse crash
        try {
            response = JSON.parse(aiRaw ?? '{}');
        } catch {
            console.warn("AI returned invalid JSON:", aiRaw);
            response = { message: aiRaw, recommendations: [] };
        }

        // Ensure recommendations always generated
        const finalContext = {
            ...context,
            ...(response.context || {})
        };

        const recommendedProducts = filterProductsByContext(allProducts, finalContext);

        response.recommendations = recommendedProducts.map(product => ({
            id: product.id,
            name: product.name,
            price: product.display_price,
            description: (product.description || '').slice(0, 100) + '...',
            category: product.category,
            subCategory: product.subCategory,
            image_url: product.image_url || '/placeholder.png',
            product_url: `/product/${product.slug}`
        }));

        response.context = finalContext;

        // console.log('recommendedProducts',recommendedProducts)

        return response;

    } catch (error) {
        console.error('Chatbot error:', error);

        return {
            message: "Oops! Something went wrong, but I'm still here to help 😊",
            recommendations: [],
            context
        };
    }
}