import React, { useState, useMemo } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import DashboardPage from './pages/Dashboard/DashboardPage';
import MarketplacePage from './pages/Marketplace/MarketplacePage';
import InventoryPage from './pages/Inventory/InventoryPage';
import AnalysisPage from './pages/Analysis/AnalysisPage';
import { ALL_PRODUCTS } from './data/mockData';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [shopInventory, setShopInventory] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const handleAddItem = (product) => { setShopInventory(prev => [...prev, { product, quantity: 1 }]); };
  const handleIncreaseQuantity = (productId) => { setShopInventory(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item)); };
  const handleDecreaseQuantity = (productId) => {
    const item = shopInventory.find(item => item.product.id === productId);
    if (item && item.quantity > 1) { setShopInventory(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item)); } 
    else { handleRemoveItem(productId); }
  };
  const handlePurchaseMultipleItems = (productsToAdd) => {
    const newItems = productsToAdd.filter(product => !shopInventory.some(item => item.product.id === product.id)).map(product => ({ product, quantity: 1 }));
    if (newItems.length > 0) { setShopInventory(prev => [...prev, ...newItems]); }
  };
  const handleRemoveItem = (productId) => {
    setShopInventory(prev => prev.filter(item => item.product.id !== productId));
    if (selectedProductId === productId) { setSelectedProductId(null); }
  };
  
  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return null;
    return shopInventory.find(p => p.product.id === selectedProductId)?.product || null;
  }, [selectedProductId, shopInventory]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <DashboardPage inventory={shopInventory} />;
      case 'marketplace': return <MarketplacePage products={ALL_PRODUCTS} inventory={shopInventory} onAddItem={handleAddItem} onIncrease={handleIncreaseQuantity} onDecrease={handleDecreaseQuantity} />;
      case 'inventory': return <InventoryPage inventory={shopInventory} onRemove={handleRemoveItem} onIncrease={handleIncreaseQuantity} onDecrease={handleDecreaseQuantity} />;
      case 'analysis': return <AnalysisPage inventory={shopInventory} selectedProduct={selectedProduct} onSelectItem={setSelectedProductId} onPurchaseMultiple={handlePurchaseMultipleItems} />;
      default: return <DashboardPage inventory={shopInventory} />;
    }
  };

  return (
    <div className="h-screen bg-slate-50 font-sans flex overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col">
        <Header currentPage={activePage} />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}