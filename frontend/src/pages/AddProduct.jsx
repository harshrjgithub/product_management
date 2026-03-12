import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../api/axios';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        price: '',
        category: '',
        description: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.productName || !formData.price) {
            toast.error('Product Name and Price are required.');
            return;
        }

        setLoading(true);
        const promise = axios.post('/products', formData);
        
        toast.promise(promise, {
            loading: 'Adding product...',
            success: 'Product added successfully!',
            error: (err) => err.response?.data?.message || 'Failed to add product'
        });

        try {
            await promise;
            navigate('/');
        } catch (err) {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Link to="/" className="inline-flex items-center justify-center rounded-lg h-9 w-9 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors focus:ring-2 focus:ring-indigo-500 outline-none">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Add New Product</h1>
                    <p className="text-sm text-slate-500 mt-1">Fill in the details to expand your catalog.</p>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="productName" className="text-sm font-semibold text-slate-700">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                placeholder="e.g. Wireless Headphones"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-semibold text-slate-700">
                                Price ($) <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-semibold text-slate-700">
                            Category
                        </label>
                        <input
                            id="category"
                            name="category"
                            value={formData.category} // Ensure it is passed
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                            placeholder="e.g. Electronics, Home, Fashion..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-semibold text-slate-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm resize-y"
                            placeholder="Provide a detailed description of the product..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="imageUrl" className="text-sm font-semibold text-slate-700">
                            Image URL
                        </label>
                        <input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Actions */}
                    <div className="pt-6 flex justify-end gap-3 border-t border-slate-100">
                        <Link 
                            to="/"
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 h-10 px-5 py-2 text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70 bg-indigo-600 text-white hover:bg-indigo-700 h-10 px-5 py-2 gap-2 shadow-sm min-w-[140px]"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Add Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
