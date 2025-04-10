
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Heart, DollarSign, IndianRupee, CreditCard, Users, BadgeCheck } from 'lucide-react';

const DonationPage = () => {
  const [amount, setAmount] = useState<string>('');
  const [showQR, setShowQR] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleAmountClick = (value: string) => {
    setAmount(value);
  };

  const handleShowQR = () => {
    setShowQR(true);
  };

  const donationTiers = [
    {
      title: "Supporter",
      amount: "₹500",
      description: "Help cover basic website costs",
      icon: <Heart className="h-8 w-8 text-pink-500" />
    },
    {
      title: "Contributor",
      amount: "₹1,000",
      description: "Support our technical infrastructure",
      icon: <CreditCard className="h-8 w-8 text-blue-500" />
    },
    {
      title: "Sustainer",
      amount: "₹2,500",
      description: "Help us reach more social workers",
      icon: <Users className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Champion",
      amount: "₹5,000",
      description: "Enable new feature development",
      icon: <BadgeCheck className="h-8 w-8 text-green-500" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Support Our Mission</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-300 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your donations help us maintain and improve the NGO Freelancing platform, connecting more social workers with meaningful opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-300">Make a Donation</CardTitle>
                <CardDescription className="text-gray-400">
                  Your contribution helps keep our platform running and growing
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showQR ? (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        className="bg-gray-700/50 border-gray-600 text-white mt-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-gray-700/50 border-gray-600 text-white mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-gray-300 mb-2 block">Select or Enter Amount</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                        {["500", "1000", "2500", "5000"].map((value) => (
                          <Button 
                            key={value}
                            variant={amount === value ? "default" : "outline"} 
                            className={`${amount === value ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-600 text-gray-300 hover:bg-gray-700/50'}`}
                            onClick={() => handleAmountClick(value)}
                          >
                            ₹{value}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="relative mt-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IndianRupee className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Other amount"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-6 text-lg font-medium mt-6 group transition-all duration-300"
                      onClick={handleShowQR}
                      disabled={!amount || parseFloat(amount) <= 0}
                    >
                      <DollarSign className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Proceed to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-6 space-y-6">
                    <div className="relative">
                      <div className="w-64 h-64 mx-auto bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                        <QrCode className="w-48 h-48 text-gray-900" />
                        <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-800 font-semibold">
                          QR Placeholder
                        </div>
                      </div>
                    </div>
                    <div className="text-center space-y-3">
                      <p className="text-xl font-medium text-blue-300">Scan to Pay ₹{amount}</p>
                      <p className="text-gray-400">Use any UPI app to scan and make payment</p>
                      <p className="mt-4 text-sm text-gray-500">Amount: ₹{amount} • Ref: {name.split(' ')[0]?.substring(0, 3) || 'NGO'}{Date.now().toString().substring(9, 13)}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() => setShowQR(false)}
                    >
                      Go Back
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 shadow-xl rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-blue-300">Why Donate?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Keep the platform free for social workers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Improve search algorithms and matching</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Develop new features for NGOs and social workers</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-blue-400 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Maintain servers and technical infrastructure</p>
                </li>
              </ul>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {donationTiers.map((tier, index) => (
                <Card 
                  key={index} 
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 shadow-xl hover:transform hover:scale-105 transition-all duration-300 overflow-hidden group"
                >
                  <CardContent className="p-6 flex items-center">
                    <div className="mr-4 bg-gray-700/50 rounded-full p-3 group-hover:bg-gray-700 transition-colors">
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-300 text-lg">{tier.title}</h4>
                      <p className="text-gray-400 text-sm">{tier.description}</p>
                      <p className="font-medium text-white mt-1">{tier.amount}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DonationPage;
