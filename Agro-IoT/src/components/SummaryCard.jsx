import React from 'react';

function SummaryCard() {
    return (
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Overall Soil Health</h2>
                <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center indicator-glow">
                        <span className="text-4xl">✅</span>
                    </div>
                </div>
                <p className="text-lg text-gray-600 mb-4">Your soil is in <span className="font-semibold text-green-600">good condition</span> overall!</p>
                <p className="text-sm text-gray-500 max-w-2xl mx-auto">Consider adding nitrogen-rich fertilizer to optimize plant growth. All other nutrients are within healthy ranges.</p>
            </div>
        </div>
    );
}

export default SummaryCard;