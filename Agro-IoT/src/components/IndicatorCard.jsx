import React from 'react';

function IndicatorCard({ icon, title, subtitle, value, unit, status, statusColor, progressWidth, target, colorName }) {
    const statusClasses = {
        green: 'text-green-600 bg-green-100',
        yellow: 'text-yellow-600 bg-yellow-100',
    };

    const textClasses = {
        blue: 'text-blue-600',
        green: 'text-green-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600',
    };

    const gradientClasses = {
        blue: 'from-blue-400 to-blue-600',
        green: 'from-green-400 to-green-600',
        purple: 'from-purple-400 to-purple-600',
        orange: 'from-orange-400 to-orange-600',
    };

    const bgIconClasses = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100',
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className={`w-12 h-12 ${bgIconClasses[colorName]} rounded-xl flex items-center justify-center mr-3`}>
                        <span className="text-2xl">{icon}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </div>
            </div>
            
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-3xl font-bold ${textClasses[colorName]}`}>{value}{unit}</span>
                    <span className={`text-sm font-medium ${statusClasses[statusColor]} px-2 py-1 rounded-full`}>{status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`bg-gradient-to-r ${gradientClasses[colorName]} h-3 rounded-full progress-animation`} style={{ width: `${progressWidth}%` }}></div>
                </div>
            </div>
            
            <div className="text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Target: {target}</span>
                    <span className={`${textClasses[colorName]}`}>●</span>
                </div>
            </div>
        </div>
    );
}

export default IndicatorCard;