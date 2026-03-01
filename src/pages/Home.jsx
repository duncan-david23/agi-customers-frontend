import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon, 
  WalletIcon, 
  CheckBadgeIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  PlayIcon,
  UserGroupIcon,
  CalendarIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import asosIcon from '../assets/asosglobal_logo.png'

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  const stats = [
    { value: '5,000+', label: 'Active Investors', icon: UserGroupIcon },
    { value: '₵2.5M+', label: 'Total Commission Paid', icon: CurrencyDollarIcon },
    { value: '98%', label: 'Success Rate', icon: ChartBarIcon },
    { value: '24/7', label: 'Support', icon: ShieldCheckIcon }
  ];

  const investmentPlans = [
    {
      name: 'Merger Arbitration',
      range: '₵500 - ₵6,500',
      profit: '3% Daily Profit',
      color: 'from-blue-500 to-cyan-500',
      description: 'Stable investment with consistent daily returns'
    },
    {
      name: 'Triangular Arbitration',
      range: '₵7,000 - ₵25,000',
      profit: '3% Daily Profit',
      color: 'from-green-500 to-emerald-600',
      popular: true,
      description: 'Advanced trading strategy for higher returns'
    },
    {
      name: 'Forex Arbitrage',
      range: '₵30,000+',
      profit: '3% Daily Profit',
      color: 'from-purple-500 to-indigo-600',
      description: 'Professional forex arbitrage opportunities'
    },
    {
      name: 'ASOS Grand Package',
      range: '₵50,000 - ₵500,000',
      profit: '95% Monthly Profit',
      color: 'from-orange-500 to-red-600',
      featured: true,
      description: 'Premium investment for special investors'
    }
  ];

  const features = [
    {
      title: 'Instant Wallet Funding',
      description: 'Deposit funds instantly and start investing immediately',
      icon: WalletIcon
    },
    {
      title: 'Daily Profits',
      description: 'Earn consistent 3% daily profits on your investments',
      icon: CurrencyDollarIcon
    },
    // {
    //   title: 'Team Trading Bonuses',
    //   description: 'Earn 3% daily commission on team trading activities',
    //   icon: UserGroupIcon
    // },
    {
      title: 'Referral Program',
      description: '8% immediate commission on referrals deposits across all levels',
      icon: GiftIcon
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10  rounded-full flex items-center justify-center">
              <img src={asosIcon} alt="asosglobal icon" />
            </div>
            <span className="text-md md:text-2xl font-bold ">
              ASOS Global
            </span>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black px-6 py-2 md:text-md text-sm rounded-full font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all"
            onClick={()=> navigate('/register')}
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <div className="mb-6">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-semibold text-white"
              >
                🚀 Official Launch: 17th December 2025
              </motion.span>
            </div> */}

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block">
                ASOS Global
              </span>
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              A world-leading fashion investment platform with stable and long-term growth. 
              The company invests globally to realize the dream of wealth and create a better future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black  px-8 py-4 rounded-full font-semibold text-lg text-white flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                onClick={()=> navigate('/register')}
              >
                <span>Start Investing</span>
                <PlayIcon className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
                onClick={()=> navigate('/register')}
              >
                Get ₵56 Bonus
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <stat.icon className="w-6 h-6 text-cyan-600" />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Animated Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Investment Dashboard</h3>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-100/80 rounded-xl">
                  <span className="text-gray-700">Wallet Balance</span>
                  <span className="text-green-600 font-bold">₵500.00</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-100/80 rounded-xl">
                  <span className="text-gray-700">Today's Profit</span>
                  <span className="text-cyan-600 font-bold">₵15.00</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-gray-100/80 rounded-xl">
                  <span className="text-gray-700">Referral Earnings</span>
                  <span className="text-blue-600 font-bold">₵56.00</span>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-4 rounded-xl border border-blue-300">
                  <div className="text-sm text-gray-700">Weekly Withdrawal</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Next: Thursday</span>
                    <span className="text-sm font-semibold text-gray-800">Fee: 14%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                y: [0, -15, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl shadow-2xl text-white"
            >
              <div className="text-sm">+₵15.00</div>
              <div className="text-xs opacity-90">Daily Profit</div>
            </motion.div>
            
            <motion.div
              animate={{ 
                x: [0, -10, 0],
                y: [0, 15, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-xl shadow-2xl text-white"
            >
              <div className="text-sm">8% Ref</div>
              <div className="text-xs opacity-90">Commission</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Investment Plans Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Investment <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Plans</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our range of arbitration investment plans with consistent daily profits
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {investmentPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className={`relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 border transition-all group ${
                plan.popular ? 'border-cyan-500 shadow-lg shadow-cyan-500/25' : 
                plan.featured ? 'border-orange-500 shadow-lg shadow-orange-500/25' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 px-4 py-1 rounded-full text-sm font-semibold text-white">
                    Featured
                  </span>
                </div>
              )}
              
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Investment Range:</span>
                  <span className="font-semibold text-gray-900">{plan.range}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profit:</span>
                  <span className="font-semibold text-green-600">{plan.profit}</span>
                </div>
              </div>
              
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all`}
              >
                Invest Now
              </motion.button> */}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-6 text-gray-900"
            >
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">ASOS Global</span>
            </motion.h2>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 bg-gray-100/80 rounded-xl border border-gray-200"
            >
              <h4 className="font-semibold mb-4 text-cyan-600">Key Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Minimum Deposit:</span>
                  <span className="font-semibold text-gray-900">₵500</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Minimum Withdrawal:</span>
                  <span className="font-semibold text-gray-900">₵165</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Withdrawal Fee:</span>
                  <span className="font-semibold text-gray-900">0%</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Withdrawal Day:</span>
                  <span className="font-semibold text-gray-900">Thursday</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-gray-200 backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Referral Program</h3>
              <div className="space-y-4">
                <div className="bg-gray-100/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-cyan-600">8%</div>
                  <div className="text-sm text-gray-600">Commission on all referral levels</div>
                </div>
                {/* <div className="bg-gray-100/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">3%</div>
                  <div className="text-sm text-gray-600">Daily team trading bonus</div>
                </div> */}
                <div className="bg-gray-100/80 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">₵56</div>
                  <div className="text-sm text-gray-600">Welcome bonus after registration</div>
                </div>
              </div>
              
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 md:p-12 text-center border border-gray-200 backdrop-blur-lg"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Ready to Start Your <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Wealth Journey</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join ASOS Global today and get ₵56 welcome bonus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black  px-8 py-4 rounded-full font-semibold text-lg text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
              onClick={()=> navigate('/register')}
           >
              Register Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={asosIcon} alt="asosglobal icon" />
            </div>
            <span className="text-xl font-bold text-black bg-clip-text ">
              ASOS Global
            </span>
          </div>
          <p className="text-gray-600 mb-2">Creating better futures through global investments</p>
          <p className="text-gray-600">© {new Date().getFullYear()} ASOS Global. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;