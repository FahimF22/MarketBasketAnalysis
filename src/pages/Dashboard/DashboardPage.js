import React, { useMemo } from 'react';
import StatCard from './StatCard';
import { BoxesIcon, DollarSignIcon, ShoppingCartIcon } from '../../icons';

function DashboardPage({ inventory }) {
    const totalValue = useMemo(() => inventory.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [inventory]);
    const totalUnits = useMemo(() => inventory.reduce((sum, item) => sum + item.quantity, 0), [inventory]);
    const mostExpensive = useMemo(() => inventory.reduce((max, item) => item.product.price > (max?.price || 0) ? item.product : max, null), [inventory]);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <StatCard title="Total Units in Shop" value={totalUnits} icon={<BoxesIcon className="h-8 w-8 text-blue-500" />} />
                <StatCard title="Total Shop Value" value={`$${totalValue.toFixed(2)}`} icon={<DollarSignIcon className="h-8 w-8 text-green-500" />} />
                {mostExpensive && <StatCard title="Highest Value Item" value={mostExpensive.name} subValue={`$${mostExpensive.price.toFixed(2)}`} icon={<ShoppingCartIcon className="h-8 w-8 text-red-500" />} />}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Shop Overview</h3>
                {inventory.length > 0 ? (
                    <ul className="space-y-3">
                    {inventory.map(item => (
                        <li key={item.product.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <div className="flex items-center">
                                    <span className="text-3xl mr-4">{item.product.image}</span>
                                    <div>
                                        <span className="font-semibold text-slate-700">{item.product.name}</span>
                                        <span className="text-sm text-slate-500 block">x{item.quantity}</span>
                                    </div>
                                </div>
                            <span className="font-bold text-lg text-slate-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <div className="text-center text-slate-500 py-12">
                            <BoxesIcon className="w-12 h-12 text-slate-300 mb-4 mx-auto"/>
                            <p className="font-semibold">Your shop is empty.</p>
                            <p className="text-sm">Visit the Marketplace to add items.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;