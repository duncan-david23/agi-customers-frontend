import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import asosIcon from '../assets/asosglobal_logo.png';
import { useNavigate } from 'react-router-dom';
import {supabase} from '../utils/supabase.js';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    referralCode: '',
    agreeTerms: false
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here

    if(formData.password !== formData.confirmPassword){
            setMsg('Passwords do not match')
              return;
            }
            
  
    try {
      setLoading(true);
      const { data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });
  
      if (error) {
            console.log(error);
            setMsg(error.message);
            return
        }

        console.log(data.user);
        setMsg('User has been successfully registered');
        console.log(data.user.id,  data.user.email, formData.fullName, formData.referralCode);

      const { data: { session } } = await supabase.auth.getSession()
      const accessToken = session?.access_token
     

           const response = await axios.post(`http://localhost:3001/api/users/create-profile`,{userId:data.user.id, fullName:formData.fullName, email:formData.email, referralCode:formData.referralCode}, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const result = response.data;
          console.log('User profile created:', result);

       
  
  
  
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error signing in:', error);
      setMsg( 'An error occurred during sign up, please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };











  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-[4px] mb-8 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <img src={asosIcon} alt="asosglobal icon" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
            ASOS Global
          </span>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join ASOS Global and start investing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {msg &&
                    <p className='text-amber-500 text-center text-sm px-5 py-[2px] rounded-full bg-amber-100'>{msg}</p>
                }

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="+233 XXX XXX XXX"
                    required
                  />
                </div>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-12 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (Optional)
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border uppercase border-gray-300 rounded-xl pl-10 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Enter referral code"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-black focus:ring-2"
                  required
                />
                <label className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-gray-900 hover:text-black font-medium transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-black to-gray-800 py-4 rounded-xl font-semibold text-lg text-white hover:shadow-2xl hover:shadow-gray-500/25 transition-all flex items-center justify-center space-x-2"
              >
                {loading ? 'Setting up your account...' : <span>Create Account</span>}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-200"
              >
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <CurrencyDollarIcon className="w-5 h-5" />
                  <span className="font-semibold">₵56 Welcome Bonus!</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Complete registration and get ₵56 bonus instantly
                </p>
              </motion.div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-900 hover:text-black font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Side - Features & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block space-y-8"
          >
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                Join <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">ASOS Global</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Start your investment journey with one of the world's leading fashion investment platforms
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Secure Platform</h4>
                    <p className="text-sm text-gray-400">Protected with Google Authenticator</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <CurrencyDollarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Daily Profits</h4>
                    <p className="text-sm text-gray-400">Earn consistent 3% daily returns</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Referral Program</h4>
                    <p className="text-sm text-gray-400">8% commission on all levels</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">₵2.5M+</div>
                <div className="text-sm text-gray-600">Commission Paid</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">5,000+</div>
                <div className="text-sm text-gray-600">Active Investors</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-200 shadow-lg">
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;