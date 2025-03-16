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
            <div className="container mx-auto px-4 py-4">
                {/* Desktop Layout: Visible on md and above */}
                <div className="hidden md:flex items-center justify-between">
                    {/* Logo */}
                    <div>
                        <Link to="/">
                            <WebLogo />
                        </Link>
                    </div>
                    {/* Menu items */}
                    <div>
                        <SelectionBar />
                    </div>
                    {/* Profile / Login */}
                    <div>
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
                    </div>
                </div>

                {/* Mobile Layout: Visible on screens below md */}
                <div className="md:hidden">
                    {/* Row 1: Logo */}
                    <div className="flex justify-center">
                        <Link to="/">
                            <WebLogo />
                        </Link>
                    </div>
                    {/* Row 2: Hamburger Menu & Profile */}
                    <div className="flex items-center justify-between mt-4">
                        {/* Hamburger Icon for Menu Toggle */}
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
                        {/* Profile / Login remains visible */}
                        <div>
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
                        </div>
                    </div>
                    {/* Mobile Dropdown Menu: Shown when hamburger is toggled */}
                    {isMobileMenuOpen && (
                        <div className="mt-4 border-t border-gray-200 pt-4">
                            <SelectionBar />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default MainNavBar;