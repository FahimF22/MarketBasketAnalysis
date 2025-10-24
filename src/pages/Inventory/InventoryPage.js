import React from 'react';
import { BoxesIcon, Trash2Icon, PlusIcon, MinusIcon } from '../../icons';

function InventoryPage({ inventory, onRemove, onIncrease, onDecrease }) {
    if (inventory.length === 0) {
        return (
            <div className="text-center text-slate-500 py-12">
                    <BoxesIcon className="w-12 h-12 text-slate-300 mb-4 mx-auto"/>
                    <p className="font-semibold">Your shop is empty.</p>
                    <p className="text-sm">Visit the Marketplace to add items.</p>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {inventory.map(item => (
                    <div key={item.product.id} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col text-center items-center relative border border-slate-200">
                        <button onClick={() => onRemove(item.product.id)} className="absolute top-3 right-3 p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 rounded-full transition-colors">
                            <Trash2Icon className="h-5 w-5" />
                        </button>
                        <span className="text-7xl mb-4">{item.product.image}</span>
                        <h3 className="font-bold text-lg text-slate-800 flex-grow">{item.product.name}</h3>
                        <p className="text-slate-600 my-4 text-xl font-semibold">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center justify-center space-x-3 mt-auto">
                            <button onClick={() => onDecrease(item.product.id)} className="p-2.5 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"><MinusIcon className="h-4 w-4" /></button>
                            <span className="text-xl font-bold w-10 text-center">{item.quantity}</span>
                            <button onClick={() => onIncrease(item.product.id)} className="p-2.5 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"><PlusIcon className="h-4 w-4" /></button>
                        </div>
                    </div>
            ))}
        </div>
    );
}

export default InventoryPage;