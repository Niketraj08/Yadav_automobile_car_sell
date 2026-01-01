import React, { useState } from 'react';
import { FaTimes, FaCreditCard, FaMobile, FaUniversity, FaWallet } from 'react-icons/fa';

const RazorpayModal = ({
    isOpen,
    onClose,
    amount,
    onPaymentSuccess,
    carName,
    customerName
}) => {
    const [selectedMethod, setSelectedMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            onPaymentSuccess();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-sm">₹</span>
                            </div>
                            <span className="font-semibold">Razorpay</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 rounded-full p-1"
                        >
                            <FaTimes className="text-lg" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Amount and Description */}
                    <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            ₹{amount?.toLocaleString('en-IN')}
                        </div>
                        <div className="text-sm text-gray-600">
                            <div>{carName}</div>
                            <div>{customerName}</div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-3 mb-6">
                        <div
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedMethod === 'card'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedMethod('card')}
                        >
                            <FaCreditCard className="text-gray-600 mr-3" />
                            <span className="text-gray-900">Card</span>
                        </div>

                        <div
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedMethod === 'upi'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedMethod('upi')}
                        >
                            <FaMobile className="text-gray-600 mr-3" />
                            <span className="text-gray-900">UPI</span>
                        </div>

                        <div
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedMethod === 'netbanking'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedMethod('netbanking')}
                        >
                            <FaUniversity className="text-gray-600 mr-3" />
                            <span className="text-gray-900">Net Banking</span>
                        </div>

                        <div
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                                selectedMethod === 'wallet'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedMethod('wallet')}
                        >
                            <FaWallet className="text-gray-600 mr-3" />
                            <span className="text-gray-900">Wallet</span>
                        </div>
                    </div>

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                            isProcessing
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {isProcessing ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Processing Payment...
                            </div>
                        ) : (
                            `Pay ₹${amount?.toLocaleString('en-IN')}`
                        )}
                    </button>

                    {/* Footer */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Secured by Razorpay • 256-bit SSL encryption
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RazorpayModal;
