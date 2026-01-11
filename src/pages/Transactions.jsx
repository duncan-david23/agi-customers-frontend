import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { supabase } from '../utils/supabase.js';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('withdrawal');
  const [withdrawalData, setWithdrawalData] = useState({
    fullName: '',
    referenceNumber: '',
    amount: '',
    paymentMethod: '',
    recipientDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Company bank details for topup
  const companyBankDetails = [{
    bankName: 'Access bank ',
    accountName: 'Blebu Victoria',
    accountNumber: '1038000005486',
  },
  {
    bankName: 'Fidelity bank ',
    accountName: 'Blebu Victoria',
    accountNumber: '2400192677419',
  }];

  // Payment methods
  const paymentMethods = [
    { value: 'mtn', label: 'MTN Mobile Money' },
    { value: 'telecel', label: 'Telecel Cash' },
    { value: 'airteltigo', label: 'AirtelTigo Money' },
    { value: 'bank', label: 'Bank Account' }
  ];

  const handleWithdrawalChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWithdrawalSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1️⃣ Get user token  
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;

      if (!accessToken) {
        return toast.error("Authentication error. Please log in again.");
      }

      // https://agi-backend.onrender.com


      const response = await axios.post(
        "http://localhost:3001/api/users/withdrawal-request",
        {
          amount: parseFloat(withdrawalData.amount),
          method: withdrawalData.paymentMethod,
          recipientDetails: withdrawalData.recipientDetails,
          referenceNumber: withdrawalData.referenceNumber,
          fullName: withdrawalData.fullName
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      toast.success(response.data.message);

      // Reset form
      setWithdrawalData({
        fullName: '',
        amount: '',
        paymentMethod: '',
        recipientDetails: '',
        referenceNumber: ''
      });

    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 403) {
        // Handle referral restriction message
        if (error.response.data.message && 
            error.response.data.message.includes('refer')) {
          toast.error(
            <div>
              <p className="font-semibold">Referral Required</p>
              <p className="text-sm">{error.response.data.message}</p>
            </div>, 
            { duration: 5000 }
          );
        } else {
          toast.error(error.response.data.message || "Insufficient funds for withdrawal");
        }
      } else if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "Missing required information");
      } else {
        toast.error("Failed to submit withdrawal request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };

  return (
    <div className="w-full px-4 py-8 flex items-center justify-center">
      {/* Centered Container */}
      <div className="w-full max-w-2xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Tab Navigation */}
          <div className="flex justify-center p-4 bg-gray-50">
            <div className="bg-gray-100 rounded-2xl p-1 flex">
              <button
                onClick={() => setActiveTab('withdrawal')}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'withdrawal'
                    ? 'bg-white shadow-md text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Withdrawal
              </button>
              <button
                onClick={() => setActiveTab('topup')}
                className={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === 'topup'
                    ? 'bg-white shadow-md text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Top Up
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Withdrawal Tab */}
            {activeTab === 'withdrawal' && (
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Withdraw Funds</h2>
                <p className="text-gray-600 mb-6">Enter your details to withdraw to your preferred payment method</p>

                {/* IMPORTANT: Add referral requirement notice */}
                <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 max-w-2xl mx-auto">
                  <h3 className="font-semibold text-yellow-800 mb-2 flex items-center justify-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Withdrawal Eligibility
                  </h3>
                  <p className="text-xs text-yellow-700">
                    You must refer at least one person before you can withdraw funds. 
                    Share your referral code with friends to unlock withdrawals.
                  </p>
                </div>

                <form onSubmit={handleWithdrawalSubmit}>
                  {/* Grid Layout for Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    
                    {/* Full Name */}
                    <div className="text-left">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={withdrawalData.fullName}
                        onChange={handleWithdrawalChange}
                        required
                        className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Reference Number */}
                    <div className="text-left">
                      <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700 mb-2">
                        Reference No. (use your app A/C No. as reference)
                      </label>
                      <input
                        type="text"
                        id="referenceNumber"
                        name="referenceNumber"
                        value={withdrawalData.referenceNumber}
                        onChange={handleWithdrawalChange}
                        required
                        className="w-full px-3 py-3 uppercase border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder="ACC-123456"
                      />
                    </div>

                    {/* Payment Method */}
                    <div className="text-left">
                      <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                      </label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={withdrawalData.paymentMethod}
                        onChange={handleWithdrawalChange}
                        required
                        className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 appearance-none"
                      >
                        <option value="">Select Payment Method</option>
                        {paymentMethods.map(method => (
                          <option key={method.value} value={method.value}>
                            {method.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Recipient Details */}
                    <div className="text-left">
                      <label htmlFor="recipientDetails" className="block text-sm font-medium text-gray-700 mb-2">
                        {withdrawalData.paymentMethod === 'bank' 
                          ? 'Bank Account Number' 
                          : withdrawalData.paymentMethod 
                          ? `${paymentMethods.find(m => m.value === withdrawalData.paymentMethod)?.label} Number`
                          : 'Recipient Details'
                        }
                      </label>
                      <input
                        type="text"
                        id="recipientDetails"
                        name="recipientDetails"
                        value={withdrawalData.recipientDetails}
                        onChange={handleWithdrawalChange}
                        required
                        className="w-full px-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                        placeholder={
                          withdrawalData.paymentMethod === 'bank' 
                            ? 'Enter bank account number' 
                            : 'Enter phone number'
                        }
                      />
                    </div>

                    {/* Amount - Full Width */}
                    <div className="text-left md:col-span-2">
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (GHS)
                      </label>
                      <div className="relative max-w-md mx-auto">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                          GHS
                        </span>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={withdrawalData.amount}
                          onChange={handleWithdrawalChange}
                          required
                          min="300"
                          step="0.01"
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                          placeholder="0.00"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">Minimum: {formatCurrency(300)}</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full max-w-md mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg block"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Request Withdrawal'
                    )}
                  </button>
                </form>

                {/* Important Notes */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 max-w-2xl mx-auto">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center justify-center text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Important Information
                  </h3>
                  <ul className="text-xs text-blue-800 space-y-2 text-left">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Must have referred at least one person
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Withdrawals processed within 24-48 hours
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      Ensure all details are correct
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      No withdrawal fees apply
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Top Up Tab remains the same */}
              {activeTab === 'topup' && (
              <div className="text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Top Up Wallet</h2>
                <p className="text-gray-600 mb-6">Send money to our account to fund your wallet</p>

                {/* Company Bank Details Card */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-4 mb-4 max-w-2xl mx-auto">
                  <h3 className="text-md font-semibold text-gray-900 mb-3 flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Company Bank Details
                  </h3>
                  
                  <div className="space-y-3">
                    {companyBankDetails.map((bank, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                        <p className="text-sm text-gray-700"><span className="font-semibold">Bank:</span> {bank.bankName}</p>
                        <p className="text-sm text-gray-700"><span className="font-semibold">Account Name:</span> {bank.accountName}</p>
                        <p className="text-sm text-gray-700"><span className="font-semibold">Account Number:</span> {bank.accountNumber}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
               <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6 mb-6 mx-4 lg:mx-auto max-w-2xl">
  <h3 className="font-bold text-yellow-900 mb-4 flex items-center justify-center text-lg md:text-xl">
    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
    Important Instructions
  </h3>
  
  <ol className="text-base md:text-lg text-yellow-800 space-y-4 text-left">
    <li className="flex items-start">
      <span className="font-bold text-yellow-700 text-lg mr-3 min-w-[25px]">1.</span>
      <span className="pt-0.5">Send money to the company account above</span>
    </li>
    
    <li className="flex items-start">
      <span className="font-bold text-yellow-700 text-lg mr-3 min-w-[25px]">2.</span>
      <div className="pt-0.5">
        Use your 
        <span className="font-bold mx-2 px-2 py-1 bg-yellow-100 border border-yellow-300 rounded-md text-yellow-900 text-base">
          App A/C No. (ACCT-XXXXXX)
        </span> 
        as reference
      </div>
    </li>
    
    <li className="flex items-start">
      <span className="font-bold text-yellow-700 text-lg mr-3 min-w-[25px]">3.</span>
      <span className="pt-0.5">Funds will be credited within 1-2 hours</span>
    </li>
  </ol>
</div>

                {/* Quick Action Buttons */}
                {/* <div className="space-y-3 max-w-md mx-auto">
                  <button
                    onClick={() => copyToClipboard(companyBankDetails.accountNumber)}
                    className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 border border-gray-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy Account Number</span>
                  </button>
                  <button
                    onClick={() => {
                      const allDetails = `Bank: ${companyBankDetails.bankName}\nAccount Name: ${companyBankDetails.accountName}\nAccount Number: ${companyBankDetails.accountNumber}\nBranch: ${companyBankDetails.branch}`;
                      copyToClipboard(allDetails);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy All Details</span>
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default Transactions;