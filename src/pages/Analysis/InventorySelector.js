import React from 'react';
import { BoxesIcon } from '../../icons';

function InventorySelector({ inventory, onSelectItem, selectedProductId }) {
    return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full flex flex-col border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4 pb-3 border-b border-slate-200">Select Item for Analysis</h2>
        <div className="flex-grow overflow-y-auto -mr-2 pr-2">
        {inventory.length > 0 ? (
            inventory.map(item => (
            <div key={item.product.id} onClick={() => onSelectItem(item.product.id)}
                className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedProductId === item.product.id ? 'bg-sky-100 ring-2 ring-sky-500' : 'bg-slate-50 hover:bg-sky-50'}`}>
                <span className="text-4xl mr-4">{item.product.image}</span>
                <p className="font-semibold text-slate-700">{item.product.name}</p>
            </div>
            ))
        ) : (
            <div className="text-center text-slate-500 pt-10 h-full flex flex-col items-center justify-center">
                <BoxesIcon className="w-12 h-12 text-slate-300 mb-4"/>
                <p>Your shop is empty.</p>
                <p className="text-sm">Add items from the Marketplace to get started.</p>
            </div>
        )}
        </div>
    </div>
    );
}

export default InventorySelector;