// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail } from 'lucide-react';

const Login = () => {
  const { login, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFriendlyAuthError = (error) => {
    if (!error) return 'Failed to login. Please try again.';
    if (error?.message?.includes('Invalid login credentials')) return 'Invalid email or password.';
    if (error?.message?.includes('Email not confirmed')) return 'Check your email for confirmation link.';
    return error.message;
  };

  // Google OAuth login
  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      navigate('/dashboard'); // direct to dashboard
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      await login(formData.email, formData.password);
      navigate('/dashboard'); // direct to dashboard
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 bg-white">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-gray-600">Welcome back! Please login</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading || loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
            Sign in with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or sign in manually</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Label>Email</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            <Label>Password</Label>
            <Input name="password" type="password" value={formData.password} onChange={handleInputChange} required />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
