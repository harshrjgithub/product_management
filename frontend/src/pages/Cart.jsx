import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { Trash2, AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/cart');
            setCart(data);
        } catch (error) {
            toast.error('Failed to load cart');
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        if (!window.confirm('Are you sure you want to remove this item?')) return;
        
        try {
            await axios.delete(`/cart/${productId}`);
            setCart(cart.filter(item => item.product._id !== productId));
            toast.success('Item removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-5">
                <Link to="/products" className="p-2 -ml-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <ShoppingBag className="h-6 w-6 text-indigo-600" />
                        Your Cart
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Review your selected items before checkout.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <AlertCircle className="h-8 w-8 text-indigo-600 mb-4" />
                        <p className="text-sm font-medium">Loading your shopping cart...</p>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                        <div className="bg-slate-50 p-4 rounded-full mb-4">
                            <ShoppingBag className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">Your cart is empty</h3>
                        <p className="text-sm text-slate-500 max-w-sm mb-6">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link 
                            to="/products" 
                            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div>
                        <ul className="divide-y divide-slate-100">
                            {cart.map((item) => (
                                <li key={item.product._id} className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 relative group">
                                        {item.product.imageUrl ? (
                                            <img
                                                src={item.product.imageUrl}
                                                alt={item.product.productName}
                                                className="h-full w-full object-cover object-center"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://placehold.co/400x400/f8fafc/94a3b8?text=No+Image';
                                                }}
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-400">
                                                <AlertCircle className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col gap-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-semibold text-slate-900">
                                                    {item.product.productName}
                                                </h3>
                                                <p className="text-sm text-slate-500 mt-1">{item.product.category || 'General'}</p>
                                            </div>
                                            <p className="text-base font-medium text-slate-900">
                                                ${item.product.price ? item.product.price.toFixed(2) : '0.00'}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                                                    Qty: {item.quantity}
                                                </span>
                                            </div>
                                            
                                            <button
                                                onClick={() => removeFromCart(item.product._id)}
                                                className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="border-t border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Subtotal</p>
                                <p className="text-2xl font-bold text-slate-900">${calculateTotal()}</p>
                            </div>
                            <button
                                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                onClick={() => toast.success('Checkout flow not implemented in this demo!')}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
