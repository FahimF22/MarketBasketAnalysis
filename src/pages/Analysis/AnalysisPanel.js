import React, { useMemo } from 'react';
import { LightbulbIcon, PlusCircleIcon, DollarSignIcon, SparklesIcon } from '../../icons';
import AIGenerator from './AIGenerator';

function AnalysisPanel({ inventory, selectedProduct, associatedItems, onGenerateSlogans, onGeneratePromotion, onGeneratePricing, marketingIdeas, weeklyPromotion, pricingStrategy, isGenerating, onPurchaseMultiple }) {
    if (!selectedProduct) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex items-center justify-center border border-slate-200">
                <div className="text-center text-slate-500">
                    <LightbulbIcon className="h-16 w-16 mx-auto mb-4 text-slate-300"/>
                    <p className="font-semibold">Select an item from your shop</p>
                    <p className="text-sm">to view co-purchase data and generate AI-powered ideas.</p>
                </div>
            </div>
        );
    }

    const recommendedItemsToAdd = useMemo(() => {
        if (!associatedItems || associatedItems.length === 0) return [];
        return associatedItems
            .filter(item => item.percentage >= 50).filter(assocItem => !inventory.some(invItem => invItem.product.id === assocItem.id)).slice(0, 3);
    }, [associatedItems, inventory]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm h-full overflow-y-auto border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-1">Analysis for: <span className="text-sky-600">{selectedProduct.name}</span></h2>
            
            <div className="my-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Top Co-Purchased Items</h3>
                {associatedItems.length > 0 ? (
                    <ul className="space-y-2">
                        {associatedItems.slice(0, 3).map(item => (
                            <li key={item.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                            <div className="flex items-center"><span className="text-3xl mr-3">{item.image}</span><span className="font-medium text-slate-700">{item.name}</span></div>
                            <span className="font-bold text-sky-600 text-xl">{item.percentage}%</span>
                            </li>
                        ))}
                    </ul>
                ) : <p className="text-sm text-slate-500">No co-purchase data available.</p>}
                {recommendedItemsToAdd.length > 0 && (
                    <div className="mt-4">
                        <button onClick={() => onPurchaseMultiple(recommendedItemsToAdd)}
                            className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 bg-emerald-500 text-white hover:bg-emerald-600">
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Add {recommendedItemsToAdd.length} Recommended Item(s) to Shop
                        </button>
                    </div>
                )}
            </div>
            
            <div className="border-t border-slate-200 pt-6 space-y-6">
                <AIGenerator title="Pricing Strategy" buttonText="Suggest Pricing" idea={pricingStrategy}
                    onGenerate={onGeneratePricing} isGenerating={isGenerating.pricing} color="bg-blue-500 hover:bg-blue-600 text-white"
                    Icon={DollarSignIcon} ideaBg="bg-blue-50" ideaTextColor="text-blue-800" />
                <AIGenerator title="Weekly Promotion" buttonText="Create Promotion" idea={weeklyPromotion}
                    onGenerate={onGeneratePromotion} isGenerating={isGenerating.promotion} color="bg-green-500 hover:bg-green-600 text-white"
                    Icon={SparklesIcon} ideaBg="bg-green-50" ideaTextColor="text-green-800" />
                <AIGenerator title="Marketing Slogans" buttonText="Generate Slogans" idea={marketingIdeas}
                    onGenerate={onGenerateSlogans} isGenerating={isGenerating.slogans} color="bg-amber-500 hover:bg-amber-600 text-white"
                    Icon={SparklesIcon} ideaBg="bg-amber-50" ideaTextColor="text-amber-800" />
            </div>
        </div>
    );
}

export default AnalysisPanel;