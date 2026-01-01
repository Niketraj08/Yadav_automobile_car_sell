import React, { useEffect } from 'react';
import { FaCheckCircle, FaDownload, FaTimes } from 'react-icons/fa';

const RazorpaySuccessModal = ({
    isOpen,
    onClose,
    amount,
    transactionId,
    onContinue
}) => {
    useEffect(() => {
        if (isOpen) {
            // Auto-close after 3 seconds
            const timer = setTimeout(() => {
                if (onContinue) {
                    onContinue();
                }
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isOpen, onContinue]);

    const handleDownloadReceipt = () => {
        // Create a simple receipt
        const receiptText = `
RAZORPAY PAYMENT RECEIPT
========================

Transaction ID: ${transactionId}
Amount: ₹${amount?.toLocaleString('en-IN')}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Payment Status: SUCCESS
Payment Method: Demo Payment

Thank you for using Razorpay!
        `;

        const blob = new Blob([receiptText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `razorpay-receipt-${transactionId}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm">
                {/* Close button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Success Content */}
                <div className="px-6 pb-6 text-center">
                    {/* Success Icon */}
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-4xl text-green-600" />
                    </div>

                    {/* Amount */}
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                        ₹{amount?.toLocaleString('en-IN')}
                    </div>

                    {/* Status */}
                    <div className="text-green-600 font-semibold mb-4">
                        Payment Successful
                    </div>

                    {/* Transaction ID */}
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                        <div className="font-mono text-sm text-gray-900">{transactionId}</div>
                    </div>

                    {/* Download Receipt */}
                    <button
                        onClick={handleDownloadReceipt}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center mb-3 transition-colors"
                    >
                        <FaDownload className="mr-2" />
                        Download Receipt
                    </button>

                    {/* Continue Button */}
                    <button
                        onClick={onContinue}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold transition-colors"
                    >
                        Continue
                    </button>

                    {/* Footer */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Redirecting in a few seconds...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RazorpaySuccessModal;
