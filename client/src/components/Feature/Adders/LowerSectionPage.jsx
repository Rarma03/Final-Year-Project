import React from 'react';

const LowerSectionPage = () => {
    return (
        <footer className="bg-black text-amber-200 p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-3">Campus Life</h3>
                        <p className="text-sm">
                            Immerse yourself in the vibrant energy of college life. From engaging events to creative student initiatives, our campus is a hub of innovation and community spirit.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Our Platform</h3>
                        <p className="text-sm">
                            Our website is dedicated to celebrating academic excellence and fostering meaningful connections. Explore resources, discover news, and get inspired by our community.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">Stay Connected</h3>
                        <p className="text-sm">
                            Join us on this journey of learning and growth. Stay updated with the latest happenings and be a part of our dynamic college community.
                        </p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                    <p className="text-xs">&copy; 2025 Campus-Connect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default LowerSectionPage;