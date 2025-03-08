import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import WebLogo from './Adders/WebLogo';
import SelectionBar from './Adders/SelectionBar';
import ProfileLogo from './Adders/ProfileLogo';
import { AuthContext } from '../AuthContext.jsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const MainNavBar = () => {
    const { user } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <WebLogo />
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden md:block">
                    <SelectionBar />
                </div>
                {/* Profile / Login and Mobile Menu Toggle */}
                <div className="flex items-center">
                    {user ? (
                        <ProfileLogo username={user.name} />
                    ) : (
                        <Link
                            to="/login"
                            className="p-2 bg-blue-400 rounded-md hover:bg-blue-700 text-white px-5"
                        >
                            Login
                        </Link>
                    )}
                    {/* Hamburger Icon for Mobile */}
                    <div className="md:hidden ml-4">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-800 focus:outline-none"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="px-4 py-2">
                        {/* You can reuse SelectionBar or place mobile-friendly nav items here */}
                        <SelectionBar />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default MainNavBar;