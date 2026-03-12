import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ShoppingCart, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to={user ? "/products" : "/"} className="flex items-center gap-2.5 group">
                            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors">
                                <Package className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-slate-800 tracking-tight">ProductHub</span>
                        </Link>
                    </div>

                    {user && (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-slate-600">
                                Welcome, {user.name} 
                                {user.role === 'admin' && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Admin</span>}
                            </span>
                            
                            {user.role === 'user' && (
                                <Link to="/cart" className="p-2 text-slate-500 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-50">
                                    <ShoppingCart className="h-5 w-5" />
                                </Link>
                            )}

                            <button 
                                onClick={handleLogout}
                                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
