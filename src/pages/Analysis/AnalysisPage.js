import React, { useState, useMemo, useEffect } from 'react';
import { ALL_PRODUCTS, PURCHASE_ASSOCIATIONS } from '../../data/mockData';
import { callGeminiAPI } from '../../services/geminiService';
import InventorySelector from './InventorySelector';
import AnalysisPanel from './AnalysisPanel';

function AnalysisPage({ inventory, selectedProduct, onSelectItem, onPurchaseMultiple }) {
    const [marketingIdeas, setMarketingIdeas] = useState('');
    const [weeklyPromotion, setWeeklyPromotion] = useState('');
    const [pricingStrategy, setPricingStrategy] = useState('');
    const [isGenerating, setIsGenerating] = useState({slogans: false, promotion: false, pricing: false });
    
    useEffect(() => {
        setMarketingIdeas('');
        setWeeklyPromotion('');
        setPricingStrategy('');
    }, [selectedProduct]);
    
    const associatedItems = useMemo(() => {
        if (!selectedProduct) return [];
        const associations = PURCHASE_ASSOCIATIONS[selectedProduct.id] || {};
        return Object.entries(associations)
        .map(([id, percentage]) => ({ ...ALL_PRODUCTS.find(p => p.id === parseInt(id)), percentage }))
        .sort((a, b) => b.percentage - a.percentage);
    }, [selectedProduct]);

    const handleGenerateSlogans = async () => {
        if (!selectedProduct || associatedItems.length === 0) return;
        setIsGenerating(p => ({...p, slogans: true}));
        const topItems = associatedItems.slice(0, 2).map(i => i.name).join(' and ');
        const systemPrompt = "You are a witty marketing expert for a supermarket. Generate 3 short, creative, and catchy promotional slogans for product bundles. Respond with 3 distinct ideas, each on a new line, prefixed with a dash '-'.";
        const userQuery = `Create slogans for a promotion bundling ${selectedProduct.name} with ${topItems}.`;
        setMarketingIdeas(await callGeminiAPI(systemPrompt, userQuery));
        setIsGenerating(p => ({...p, slogans: false}));
    };

    const handleGeneratePromotion = async () => {
        if (!selectedProduct || associatedItems.length === 0) return;
        setIsGenerating(p => ({...p, promotion: true}));
        const topItems = associatedItems.slice(0, 2).map(i => i.name).join(' & ');
        const systemPrompt = "You are a strategic retail analyst. Create a 'Weekly Special' promotion plan. The response should be a single block of text and must include a catchy promotion name on the first line, a brief description of the bundle deal on the second line, and the suggested discount on the third line.";
        const userQuery = `Design a weekly special promotion featuring ${selectedProduct.name} bundled with ${topItems}.`;
        setWeeklyPromotion(await callGeminiAPI(systemPrompt, userQuery));
        setIsGenerating(p => ({...p, promotion: false}));
    };

    const handleGeneratePricing = async () => {
        if (!selectedProduct || associatedItems.length === 0) return;
        setIsGenerating(p => ({...p, pricing: true}));
        const topItem = associatedItems[0];
        const systemPrompt = "You are a pricing analyst for a retail store. Suggest a smart bundle deal. The response should be a single block of text. Start with a header 'Bundle Suggestion:'. Then describe the bundle and a suggested bundle price that represents a ~10-15% discount over individual prices.";
        const userQuery = `Create a bundle deal for ${selectedProduct.name} (price $${selectedProduct.price.toFixed(2)}) and its top co-purchased item, ${topItem.name} (price $${topItem.price.toFixed(2)}).`;
        setPricingStrategy(await callGeminiAPI(systemPrompt, userQuery));
        setIsGenerating(p => ({...p, pricing: false}));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-5rem)]">
            <div className="lg:col-span-4 h-full">
                <InventorySelector inventory={inventory} onSelectItem={onSelectItem} selectedProductId={selectedProduct?.id} />
            </div>
            <div className="lg:col-span-8 h-full">
                <AnalysisPanel inventory={inventory} selectedProduct={selectedProduct} associatedItems={associatedItems}
                    onGenerateSlogans={handleGenerateSlogans} onGeneratePromotion={handleGeneratePromotion} onGeneratePricing={handleGeneratePricing}
                    marketingIdeas={marketingIdeas} weeklyPromotion={weeklyPromotion} pricingStrategy={pricingStrategy}
                    isGenerating={isGenerating} onPurchaseMultiple={onPurchaseMultiple} />
            </div>
        </div>
    );
}

export default AnalysisPage;