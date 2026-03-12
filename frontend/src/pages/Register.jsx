import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
    const { register, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        // By default, open registration creates a 'user' role
        const success = await register(name, email, password, 'user');
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
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                    Create an Account
                </h2>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            minLength={6}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="h-px bg-slate-200 flex-1"></div>
                    <span className="text-slate-400 text-sm">OR</span>
                    <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                
                <div className="mt-6 flex justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => console.log('Login Failed')}
                        theme="filled_blue"
                        size="large"
                        shape="rectangular"
                        width="100%"
                        text="signup_with"
                    />
                </div>

                <div className="mt-6 text-center text-sm text-slate-600">
                    Already have an account? <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium whitespace-nowrap">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
