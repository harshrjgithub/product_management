import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Cart from './pages/Cart';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#334155',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
        
        {/* Render Navbar only if logged in */}
        {user && <Navbar />}

        {/* Main Content Area */}
        <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${user ? 'py-8 md:py-10' : ''}`}>
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={!user ? <Login /> : <Navigate to="/products" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/products" />} />

            {/* Protected User & Admin Routes */}
            <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            
            {/* Protected Admin Only Routes */}
            <Route path="/add" element={
              <ProtectedRoute requireAdmin={true}>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute requireAdmin={true}>
                <EditProduct />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
