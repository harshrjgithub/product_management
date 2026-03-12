import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, AlertCircle, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const ProductList = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
            toast.success('Product deleted successfully');
        } catch (error) {
            toast.error('Failed to delete product');
        }
    };

    const addToCart = async (id) => {
        try {
            await api.post('/cart', { productId: id, quantity: 1 });
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const isSearchEmpty = searchTerm.trim() === '';
    
    // Admins see all by default. Users only see matches when searching.
    const filteredProducts = products.filter(p => {
        if (user.role === 'user' && isSearchEmpty) return false;
        
        return p.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and track your product inventory.</p>
                </div>
                {user.role === 'admin' && (
                    <Link 
                        to="/add" 
                        className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-4 py-2 gap-2 shadow-sm whitespace-nowrap"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Link>
                )}
            </div>

            {/* Search and Filters */}
            <div className="flex items-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 pl-9 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <AlertCircle className="h-8 w-8 text-indigo-600 mb-4" /> {/* Changed from Loader2 */}
                        <p className="text-sm font-medium">Loading inventory...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <Search className="h-6 w-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-1">No products found</h3>
                        <p className="text-sm text-slate-500 max-w-sm">
                            {user.role === 'user' && isSearchEmpty
                                ? "Use the search bar above to look for your desired items!"
                                : searchTerm
                                    ? "We couldn't find anything matching your search. Try different keywords."
                                    : "Your inventory is currently empty. Add a new product to get started."}
                        </p>
                        {!searchTerm && user.role === 'admin' && (
                            <Link to="/add" className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                                + Add your first product
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="h-11 px-5 align-middle font-semibold">Product</th>
                                    <th className="h-11 px-5 align-middle font-semibold">Category</th>
                                    <th className="h-11 px-5 align-middle font-semibold">Price</th>
                                    <th className="h-11 px-5 align-middle font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-5 py-3 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 shrink-0 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                                                    {product.imageUrl ? (
                                                        <img 
                                                            src={product.imageUrl} 
                                                            alt={product.productName} 
                                                            className="h-full w-full object-cover" 
                                                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                        />
                                                    ) : null}
                                                    <div className={product.imageUrl ? "hidden" : "flex flex-col items-center text-slate-400"}>
                                                        <AlertCircle className="h-4 w-4" /> {/* Changed from ImageOff */}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-slate-900 truncate max-w-[200px]" title={product.productName}>
                                                        {product.productName}
                                                    </span>
                                                    {product.description && (
                                                        <span className="text-xs text-slate-500 truncate max-w-[200px]">
                                                            {product.description}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 align-middle">
                                            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                                                {product.category || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 align-middle font-medium text-slate-900">
                                            ${product.price ? product.price.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="px-5 py-3 align-middle text-right">
                                            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                                <div className="text-sm text-slate-500">
                                                    Added {new Date(product.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex gap-2">
                                                    {user.role === 'admin' ? (
                                                        <>
                                                            <Link 
                                                                to={`/edit/${product._id}`}
                                                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                                                title="Edit Product"
                                                            >
                                                                <Edit2 className="h-4 w-4" />
                                                            </Link>
                                                            <button 
                                                                onClick={() => deleteProduct(product._id)}
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                title="Delete Product"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button 
                                                            onClick={() => addToCart(product._id)}
                                                            className="px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5"
                                                        >
                                                            <ShoppingCart className="h-4 w-4" />
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
