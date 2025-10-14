import React, { useState } from 'react';

function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navButtons = ['🏠 Home', '🤖 DL Model', '🔍 Search', '👤 Account'];

    return (
        <nav className="bg-green-200 shadow-lg border-b border-gray-200 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-lg">🌱</span>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Agro-IoT</span>
                        </div>
                    </div>
                    
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navButtons.map((text, index) => (
                                <button key={text} className={index === 0 ? "bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200" : "text-gray-600 hover:text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"}>
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-green-600 p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Mobile menu */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {navButtons.map((text, index) => (
                         <button key={text} className={index === 0 ? "bg-green-500 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left" : "text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium w-full text-left"}>
                            {text}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;