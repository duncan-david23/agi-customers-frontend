import React, { useState } from 'react'
import { AiFillSecurityScan } from "react-icons/ai";
import { supabase } from '../utils/supabase';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if(!email) return setMsg('Please enter a valid email address');

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://asosglobalinvest.com/reset-password',
        });

        if (error) {
            console.error('Error:', error.message);
            setMsg('Error: ' + error.message);
            toast.error('Error: ' + error.message);
        } else {
            setMsg('Reset email sent! Check your inbox.')
            toast.success('Reset email sent! Check your inbox.')
            setEmail('')
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6 md:p-8 transition-all duration-300">
                    
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="p-3 bg-black rounded-full">
                                <AiFillSecurityScan size={32} className="text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Forgot Password
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Message Alert */}
                    {msg && (
                        <div className={`mb-6 p-4 rounded-lg border text-sm ${
                            msg.includes('✅') || msg.includes('sent') 
                                ? 'bg-gray-50 text-gray-800 border-gray-300' 
                                : 'bg-gray-50 text-gray-800 border-gray-300'
                        }`}>
                            <div className="flex items-center justify-between">
                                <span>{msg.replace(/[✅❌]/g, '')}</span>
                                <button 
                                    onClick={() => setMsg('')}
                                    className="text-gray-500 hover:text-gray-700 ml-2"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Form Section */}
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 bg-white placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Sending Reset Link...
                                </div>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    {/* Additional Links */}
                    <div className="mt-6 text-center space-y-3">
                        <p className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <a 
                                href="/login" 
                                className="text-black font-medium hover:text-gray-700 underline transition-colors"
                            >
                                Back to Login
                            </a>
                        </p>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-600 text-center">
                            <strong>Security Note:</strong> The reset link will expire after a short period for your protection.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">
                        Need help? Contact our support team
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword