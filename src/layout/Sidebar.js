import React from 'react';
import { ShoppingCartIcon, LayoutDashboardIcon, StoreIcon, BoxesIcon, LightbulbIcon } from '../icons';

function Sidebar({ activePage, setActivePage }) {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
        { id: 'marketplace', label: 'Marketplace', icon: StoreIcon },
        { id: 'inventory', label: 'My Shop', icon: BoxesIcon },
        { id: 'analysis', label: 'Analysis Hub', icon: LightbulbIcon },
    ];
    return (
        <nav className="w-20 lg:w-64 bg-slate-900 text-white flex flex-col">
            <div className="flex items-center justify-center lg:justify-start lg:pl-6 h-20 border-b border-slate-700">
                <ShoppingCartIcon className="h-8 w-8 text-sky-400" />
                <span className="hidden lg:block ml-3 text-2xl font-bold">SuperShop</span>
            </div>
            <ul className="flex-1 px-2 lg:px-4 py-4 space-y-2">
                {navItems.map(item => (
                    <li key={item.id}>
                        <a href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.id); }}
                            className={`flex items-center justify-center lg:justify-start p-3 rounded-lg text-sm font-medium transition-colors duration-200 ${ activePage === item.id ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:bg-slate-700 hover:text-white' }`}>
                            <item.icon className="h-6 w-6" />
                            <span className="hidden lg:block ml-4">{item.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Sidebar;