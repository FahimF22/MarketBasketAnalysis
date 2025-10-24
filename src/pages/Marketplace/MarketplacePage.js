import React from 'react';
import ProductCard from './ProductCard';

function MarketplacePage({ products, inventory, onAddItem, onIncrease, onDecrease }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {products.map(product => {
                const inventoryItem = inventory.find(item => item.product.id === product.id);
                const quantity = inventoryItem ? inventoryItem.quantity : 0;
                return <ProductCard key={product.id} product={product} quantity={quantity} onAdd={() => onAddItem(product)} onIncrease={() => onIncrease(product.id)} onDecrease={() => onDecrease(product.id)} />
            })}
        </div>
    );
}

export default MarketplacePage;