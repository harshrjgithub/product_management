import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default view is User

    const submitHandler = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/products');
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const success = await googleLogin(credentialResponse.credential);
        if (success) {
            navigate('/products');
        }
    };

    return (
        <div className="flex items-center justify-center h-full min-h-[70vh]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                {/* Tabs for Role Selection */}
                <div className="flex border-b border-slate-200">
                    <button
                        className={`flex-1 py-4 text-center font-medium transition-colors ${role === 'user' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        onClick={() => setRole('user')}
                    >
                        User Login
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-medium transition-colors ${role === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                        onClick={() => setRole('admin')}
                    >
                        Admin Login
                    </button>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                        {role === 'admin' ? 'Welcome Back, Admin' : 'Sign In'}
                    </h2>

                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            Sign In
                        </button>
                    </form>

                    {role === 'user' && (
                        <>
                            <div className="mt-6 flex items-center justify-center space-x-2">
                                <div className="h-px bg-slate-200 flex-1"></div>
                                <span className="text-slate-400 text-sm">OR</span>
                                <div className="h-px bg-slate-200 flex-1"></div>
                            </div>
                            
                            <div className="mt-6 flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                    theme="filled_blue"
                                    size="large"
                                    shape="rectangular"
                                    width="100%"
                                />
                            </div>

                            <div className="mt-6 text-center text-sm text-slate-600">
                                New Customer? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap">Create an account</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
