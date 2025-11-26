import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../utils/supabase.js';
import toast, { Toaster } from 'react-hot-toast';



const Tasks = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [commissionEarned, setCommissionEarned] = useState(0);
  const [userTasks, setUserTasks] = useState([]);
  const [userCapital, setUserCapital] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showProducts, setShowProducts] = useState(true);

  const totalTasks = 10;
  const dailyCommissionRate = 0.03;

  const handleBuy = async (userTasks) => {
  try {
    // 1️⃣ Prevent buying more than allowed or duplicate buys
    const alreadyBought = purchasedItems.find(item => item.id === userTasks.product_id);

    if (purchasedItems.length >= totalTasks) {
      return toast.error("You’ve reached your daily limit.");
    }

    if (alreadyBought) {
      return toast.error("You have already purchased this item.");
    }

    // 2️⃣ Update frontend state immediately
    setPurchasedItems(prev => [...prev, userTasks]);
    setTasksCompleted(prev => prev + 1);


    toast.success("Product added to your tasks.");
  } catch (error) {
    console.error("Buy error:", error);
    toast.error("Failed to add product. Try again.");
  }
};








const handleSellAll = async () => {
  try {
    // Ensure user has completed all tasks
    if (purchasedItems.length !== totalTasks) {
      toast.error("You must complete all tasks before selling.");
      alert("You must complete all tasks before selling.");
      return;
    }

    // 1️⃣ Get user token  
    const { data: { session } } = await supabase.auth.getSession();
    const accessToken = session?.access_token;

    if (!accessToken) {
      return alert("Authentication error. Please log in again.");
    }

    // 2️⃣ Call backend to delete all tasks
    const response = await axios.delete(
      "http://localhost:3001/api/users/sell-all-tasks",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    console.log("Sell All Response:", response.data);

    // 3️⃣ Calculate commission earned
    const commission = userCapital * dailyCommissionRate;

    await axios.put(
      "http://localhost:3001/api/users/update-commission",
      { commissionAmount: commission },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    // 4️⃣ Update UI after success
    setCommissionEarned(commission);
    setPurchasedItems([]); // Clear purchased items
    setShowSuccess(true);
    setShowProducts(false);

  } catch (error) {
    console.error("Sell all error:", error);
    alert("An error occurred while selling your tasks.");
  }
};


  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const isProductPurchased = (productId) => {
    return purchasedItems.some(item => item.id === productId);
  };

  const progressPercentage = (tasksCompleted / totalTasks) * 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount);
  };



   useEffect(() => {
    const fetchTasks = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const accessToken = session?.access_token

      const tasksResponse = await axios.get(`http://localhost:3001/api/users/tasks`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const result = tasksResponse.data;
      

      if (tasksResponse.status === 200) {
        setUserTasks(result.tasks);
      } else {
        console.error("Error fetching user tasks:", tasksResponse.data.error);
      }
    };

    fetchTasks();
  }, []);



  



  // fetch user profile to get capital amount 
   useEffect(() => {
    const fetchUserCapital = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const accessToken = session?.access_token
           

      const profileResponse = await axios.get(`http://localhost:3001/api/users/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const result = profileResponse.data;
      const profile = result.profile;
      setUserCapital(profile.wallet);
    };

    fetchUserCapital();
  }, []);




  return (
    <div className="h-screen bg-gray-50 px-4 pt-20 pb-8 overflow-scroll w-full">
      {/* Header Stats - Clean ASOS Style */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Tasks</h1>
        <p className="text-gray-600 mb-6">Complete 10 trades to unlock your commission</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Progress Card - Clean Style */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Progress Tracker</h2>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                <span className="text-blue-600 font-bold text-sm">{tasksCompleted}/10</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-600">
              {tasksCompleted === totalTasks 
                ? "✅ All tasks completed! Ready to sell!"
                : `${totalTasks - tasksCompleted} trades remaining`
              }
            </p>
          </div>

          {/* Commission Card - Clean Style */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Today's Commission</h2>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                <span className="text-green-600 font-bold">%</span>
              </div>
            </div>
            
            <p className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(commissionEarned)}
            </p>
            
            <p className="text-gray-600 text-sm">
              3% of {formatCurrency(userCapital)} • Complete all trades to claim
            </p>
          </div>
        </div>

        {/* Sell All Button - Clean Style */}
        {tasksCompleted === totalTasks && (
          <div className="flex justify-center mb-6">
            <button
              onClick={handleSellAll}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-200 flex items-center space-x-3"
            >
              <span className="text-lg">💎</span>
              <span className="text-lg">SELL ALL & CLAIM COMMISSION</span>
              <span className="text-lg">💰</span>
            </button>
          </div>
        )}
      </div>

      {/* Purchased Items Preview */}
      {purchasedItems.length > 0 && showProducts && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Collection ({purchasedItems.length}/10)</h3>
          <div className="flex flex-wrap gap-2">
            {purchasedItems.map(item => (
              <div key={item.id} className="w-12 h-12 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <img 
                  src={item.product_image} 
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid - ASOS Style Cards */}
      {showProducts ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {userTasks.map(product => (
            <div 
              key={product.id}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:border-gray-300 ${
                isProductPurchased(product.id) 
                  ? 'border-green-500 bg-green-50' 
                  : ''
              }`}
            >
              {/* Product Image Container */}
              <div className="relative bg-white rounded-t-lg overflow-hidden">
                <img 
                  src={product.product_image} 
                  alt={product.product_name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                {isProductPurchased(product.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2 shadow-md">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {/* ASOS-style gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/10 to-transparent h-8"></div>
              </div>

              {/* Product Info - ASOS Style */}
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                  {product.product_name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(product.product_price)}
                  </span>
                </div>

                {/* Buy Button - ASOS Style */}
                <button
                  onClick={() => handleBuy(product)}
                  disabled={isProductPurchased(product.id) || purchasedItems.length >= totalTasks}
                  className={`w-full py-2 px-3 rounded-md font-semibold text-sm transition-all duration-200 border ${
                    isProductPurchased(product.id)
                      ? 'bg-green-500 text-white border-green-500 cursor-not-allowed'
                      : purchasedItems.length >= totalTasks
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 text-white border-black hover:shadow-md'
                  }`}
                >
                  {isProductPurchased(product.id) ? (
                    <span className="flex items-center justify-center text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      PURCHASED
                    </span>
                  ) : purchasedItems.length >= totalTasks ? (
                    'MAX REACHED'
                  ) : (
                    'BUY NOW'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Products Message - Clean Style */
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Come Back Tomorrow!</h3>
            <p className="text-gray-600 mb-4">You've completed all tasks for today. New products will be available tomorrow.</p>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-green-600 text-sm font-medium">
                🎉 You earned {formatCurrency(commissionEarned)} today!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal - Clean ASOS Style */}
      {showSuccess && (
        <div className="fixed flex items-center justify-center z-50 bg-black bg-opacity-80 inset-0">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-sm mx-4 border border-gray-200">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Success! 🎉</h3>
            <p className="text-gray-600 mb-4 text-lg">
              You earned <span className="text-green-600 font-bold">{formatCurrency(commissionEarned)}</span> commission!
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Daily tasks completed successfully
            </p>
            <button
              onClick={handleCloseSuccess}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg w-full transition-all duration-200"
            >
              GOT IT!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;