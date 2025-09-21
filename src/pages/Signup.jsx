// Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, User, UserCheck, Shield } from 'lucide-react';

const Signup = () => {
  const { signUp, signInWithGoogle, updateProfile, loading } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('patient');

  const [formData, setFormData] = useState({
    patient: { fullName: '', age: '', email: '', password: '', confirmPassword: '' },
    doctor: { fullName: '', specialization: '', hospital: '', email: '', password: '', confirmPassword: '' },
    admin: { fullName: '', email: '', password: '', confirmPassword: '' }
  });

  const getFriendlyAuthError = (error) => {
    if (!error) return 'Failed to create account. Please try again.';
    if (error?.message?.includes('Invalid login credentials')) return 'Invalid email or password.';
    if (error?.message?.includes('Email not confirmed')) return 'Check your email for confirmation link.';
    if (error?.message?.includes('User already registered')) return 'An account with this email exists.';
    if (error?.message?.includes('Password should be at least 6 characters')) return 'Password must be at least 6 characters.';
    return error.message;
  };

  // Google OAuth signup/login
  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      setSuccessMessage('Account created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentForm = formData[activeTab];

    if (currentForm.password !== currentForm.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (currentForm.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const { user } = await signUp(currentForm.email, currentForm.password, {
        name: currentForm.fullName,
        age: currentForm.age || null,
        specialization: currentForm.specialization || null,
        hospital: currentForm.hospital || null
      });

      if (user) {
        await updateProfile({
          name: currentForm.fullName,
          age: currentForm.age ? parseInt(currentForm.age) : null,
          specialization: currentForm.specialization || null,
          hospital: currentForm.hospital || null
        });
      }

      setSuccessMessage('Account created successfully! Please check your email.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [name]: value }
    }));
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'patient': return <User className="w-4 h-4" />;
      case 'doctor': return <UserCheck className="w-4 h-4" />;
      case 'admin': return <Shield className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-2 bg-white">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">H</span>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-gray-600">Join Healthcare Assistant</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {successMessage && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{successMessage}</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleGoogleSignUp}
            disabled={isLoading || loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
            Sign up with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or create account manually</span>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="patient" className="flex items-center gap-2">{getRoleIcon('patient')} Patient</TabsTrigger>
              <TabsTrigger value="doctor" className="flex items-center gap-2">{getRoleIcon('doctor')} Doctor</TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">{getRoleIcon('admin')} Admin</TabsTrigger>
            </TabsList>

            {/* Patient Form */}
            <TabsContent value="patient">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Full Name</Label><Input name="fullName" value={formData.patient.fullName} onChange={handleInputChange} required /></div>
                  <div><Label>Age</Label><Input name="age" type="number" value={formData.patient.age} onChange={handleInputChange} required /></div>
                </div>
                <Label>Email</Label>
                <Input name="email" type="email" value={formData.patient.email} onChange={handleInputChange} required />
                <Label>Password</Label>
                <Input name="password" type="password" value={formData.patient.password} onChange={handleInputChange} required />
                <Label>Confirm Password</Label>
                <Input name="confirmPassword" type="password" value={formData.patient.confirmPassword} onChange={handleInputChange} required />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Patient Account'}
                </Button>
              </form>
            </TabsContent>

            {/* Doctor Form */}
            <TabsContent value="doctor">
              <form onSubmit={handleSubmit} className="space-y-3">
                <Label>Full Name</Label>
                <Input name="fullName" value={formData.doctor.fullName} onChange={handleInputChange} required />
                <Label>Specialization</Label>
                <Input name="specialization" value={formData.doctor.specialization} onChange={handleInputChange} required />
                <Label>Hospital</Label>
                <Input name="hospital" value={formData.doctor.hospital} onChange={handleInputChange} required />
                <Label>Email</Label>
                <Input name="email" type="email" value={formData.doctor.email} onChange={handleInputChange} required />
                <Label>Password</Label>
                <Input name="password" type="password" value={formData.doctor.password} onChange={handleInputChange} required />
                <Label>Confirm Password</Label>
                <Input name="confirmPassword" type="password" value={formData.doctor.confirmPassword} onChange={handleInputChange} required />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Doctor Account'}
                </Button>
              </form>
            </TabsContent>

            {/* Admin Form */}
            <TabsContent value="admin">
              <form onSubmit={handleSubmit} className="space-y-3">
                <Label>Full Name</Label>
                <Input name="fullName" value={formData.admin.fullName} onChange={handleInputChange} required />
                <Label>Email</Label>
                <Input name="email" type="email" value={formData.admin.email} onChange={handleInputChange} required />
                <Label>Password</Label>
                <Input name="password" type="password" value={formData.admin.password} onChange={handleInputChange} required />
                <Label>Confirm Password</Label>
                <Input name="confirmPassword" type="password" value={formData.admin.confirmPassword} onChange={handleInputChange} required />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Admin Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
