import React from 'react';

function Header({ currentPage }) {
    const title = currentPage === 'inventory' ? 'My Shop' : currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    return (
        <header className="flex-shrink-0 bg-white h-20 flex items-center px-8">
            <h1 className="text-3xl font-bold text-slate-800">{title}</h1>
        </header>
    );
}

export default Header;