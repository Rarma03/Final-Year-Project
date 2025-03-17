import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <img src="/sharingan.gif" alt="Loading..." className="w-32 h-32" />
        </div>
    );
};

export default LoadingScreen;