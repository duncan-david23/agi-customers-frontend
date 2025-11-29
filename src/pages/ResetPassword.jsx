import React, { useState, useEffect } from 'react'
import { AiFillSecurityScan } from "react-icons/ai";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import { supabase } from '../utils/supabase';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordStrength, setPasswordStrength] = useState('')

    const checkPasswordStrength = (pwd) => {
        if (!pwd) return ''
        if (pwd.length < 6) return 'weak'
        if (pwd.length < 8) return 'medium'
        if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 'strong'
        return 'medium'
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if(password !== confirmPassword){
            setMsg('Passwords do not match, try again')
            return;
        };

        if (!password || password.length < 6) {
            return setMsg('Password must be at least 6 characters');
        };

        setLoading(true);
        const { data, error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            console.error(error);
            setMsg('Error: ' + error.message);
        } else {
            setMsg('Password successfully reset! You can now log in.');
            setTimeout(() => {
                window.location.href = '/login'
            }, 3000);
        }

        setLoading(false);
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                setMsg('Session expired or invalid reset link.');
            }
        });
    }, []);

    useEffect(() => {
        setPasswordStrength(checkPasswordStrength(password))
    }, [password])

    const getStrengthColor = () => {
        switch(passwordStrength) {
            case 'weak': return 'bg-red-500'
            case 'medium': return 'bg-yellow-500'
            case 'strong': return 'bg-green-500'
            default: return 'bg-gray-200'
        }
    }

    const getStrengthText = () => {
        switch(passwordStrength) {
            case 'weak': return 'Weak'
            case 'medium': return 'Medium'
            case 'strong': return 'Strong'
            default: return ''
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-300 hover:shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-indigo-100 rounded-full">
                                <AiFillSecurityScan size={32} className="text-black" />
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Reset Password
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            Create a new password for your account
                        </p>
                    </div>

                    {/* Message Alert */}
                    {msg && (
                        <div className={`mb-6 p-4 rounded-lg text-sm ${
                            msg.includes('✅') || msg.includes('successfully') 
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                        }`}>
                            {msg}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(prev => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {password && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span>Password strength:</span>
                                        <span className={`font-medium ${
                                            passwordStrength === 'weak' ? 'text-red-600' :
                                            passwordStrength === 'medium' ? 'text-yellow-600' :
                                            passwordStrength === 'strong' ? 'text-green-600' : 'text-gray-600'
                                        }`}>
                                            {getStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()} ${
                                                passwordStrength === 'weak' ? 'w-1/3' :
                                                passwordStrength === 'medium' ? 'w-2/3' :
                                                passwordStrength === 'strong' ? 'w-full' : 'w-0'
                                            }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Requirements */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                                <li className={`flex items-center ${password.length >= 6 ? 'text-green-600' : ''}`}>
                                    • At least 6 characters
                                </li>
                                <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : ''}`}>
                                    • 8+ characters for better security
                                </li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Resetting Password...
                                </div>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>

                    {/* Back to Login */}
                    <div className="text-center mt-6">
                        <a 
                            href="/login" 
                            className="text-sm  hover:scale-105 font-medium transition-colors"
                        >
                            Back to Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword