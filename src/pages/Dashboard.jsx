import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { supabase } from '../utils/supabase.js';

const Dashboard = () => {
  // Sample data - you can replace with actual data from your state/props
  const accountData = {
    totalBalance: 1250.75,
    capital: 1000.00,
    commissionEarned: 250.75
  };

  const transactions = [
    { type: 'deposit', amount: 500.00, date: '2024-01-15' },
    { type: 'withdrawal', amount: 150.00, date: '2024-01-14' },
    { type: 'deposit', amount: 1000.00, date: '2024-01-10' },
    { type: 'withdrawal', amount: 200.00, date: '2024-01-08' },
   
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHC'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };



  const [userProfile, setUserProfile] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const accessToken = session?.access_token
           

      const profileResponse = await axios.get(`http://localhost:3001/api/users/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const result = profileResponse.data;
      const totalAmount = result.profile.wallet + result.profile.withdrawable_commission;
      setTotalAmount(totalAmount);


      if (profileResponse.status === 200) {
        setUserProfile(result.profile);
      } else {
        console.error("Error fetching user profile:", profileResponse.data.error);
      }
    };

    fetchUserProfile();
  }, []);




  return (
    <div className='h-screen w-full bg-gray-50 px-4 pt-20 overflow-scroll '>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-xl font-thin text-gray-900'>Wlecome back, <span className='font-bold text-blue-600 italic'>{userProfile?.user_name}</span></h1>
        <div className='flex items-center text-sm text-gray-500 gap-[2px]'>
          <p>A/C No:</p>
          <p className='border border-blue-600 text-gray-500 py-[5px] px-[15px] rounded-lg w-fit mt-[6px]'>{userProfile?.account_number}</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Account Balance Card */}
       <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden border-t border-l border-r border-b-2 border-t-blue-400 border-b-blue-300'>
  {/* Metallic Shine */}
  <div className='absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-blue-900/30'></div>
  
  {/* Corner Accents */}
  <div className='absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-300'></div>
  <div className='absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-300'></div>

  <div className='flex items-center justify-between mb-6 relative z-10'>
    <h2 className='text-lg font-semibold text-white'>Account Balance</h2>
    <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner'>
      <span className='text-blue-600 font-bold text-lg'>$</span>
    </div>
  </div>
  
  <div className='mb-6 relative z-10'>
    <p className='text-4xl font-bold text-white tracking-tight'>
      {formatCurrency(totalAmount)}
    </p>
  </div>

  <div className='space-y-4 relative z-10'>
    <div className='flex justify-between items-center'>
      <span className='text-blue-200'>Capital Invested</span>
      <span className='font-semibold text-white'>
        {formatCurrency(userProfile?.wallet)}
      </span>
    </div>
    <div className='flex justify-between items-center'>
      <span className='text-blue-200'>Commission Earned</span>
      <span className='font-semibold text-green-300'>
        +{formatCurrency(userProfile?.withdrawable_commission)}
      </span>
    </div>
  </div>
</div>

        {/* Total Commission Card */}
       <div className='bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-lg font-semibold'>Total Commission</h2>
            <div className='w-8 h-8 bg-white bg-opacity-30 rounded-lg flex items-center justify-center backdrop-blur-sm'>
              <span className='font-bold  text-blue-600'>%</span>
            </div>
          </div>
          
          <div className='mb-2'>
            <p className='text-3xl font-bold'>
              {formatCurrency(userProfile?.withdrawable_commission)}
            </p>
          </div>

          <p className='text-purple-100 text-sm'>
            Earned from completing daily tasks
          </p>
        </div>
      </div>

      {/* Recent Transactions */}
      {/* <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-semibold text-gray-900'>Recent Transactions</h2>
          <button className='text-blue-600 text-sm font-medium hover:text-blue-700'>
            View All
          </button>
        </div>

        <div className='space-y-4'>
          {transactions.map((transaction, index) => (
            <div key={index} className='flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0'>
              <div className='flex items-center space-x-3'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'deposit' ? (
                    <span className='font-bold'>+</span>
                  ) : (
                    <span className='font-bold'>-</span>
                  )}
                </div>
                <div>
                  <p className='font-medium text-gray-900 capitalize'>
                    {transaction.type}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              
              <div className={`text-right ${
                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
              }`}>
                <p className='font-semibold'>
                  {transaction.type === 'deposit' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className='text-sm text-gray-500'>
                  {transaction.type === 'deposit' ? 'Added' : 'Withdrawn'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;