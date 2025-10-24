import React from 'react';

function StatCard({ title, value, icon, subValue }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-slate-200">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
                {subValue && <p className="text-sm text-slate-500">{subValue}</p>}
            </div>
            <div className="bg-slate-100 p-4 rounded-full">{icon}</div>
        </div>
    );
}

export default StatCard;