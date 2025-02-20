import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'
import LowerSectionPage from './Adders/LowerSectionPage'
import FeaturesBoxPage from './Adders/FeaturesBoxPage'
import RecentThingsPage from './Adders/RecentThingsPage'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'

const FeaturePage = () => {
    const { user } = useContext(AuthContext);
    // console.log(user);

    return (
        <div className='flex flex-col min-h-screen'>
            {/* Navigation-Bar */}
            <MainNavBar />

            {/* Content - Middle Layer */}
            <div className='flex-grow grid grid-cols-1 md:grid-cols-10 md:gap-2'>
                {/* Contains Features */}
                <div className='col-span-7 bg-white rounded-r-md border-2 border-l-0 border-amber-400 p-4 mb-5 md:mb-0'>
                    {/* main items */}
                    <FeaturesBoxPage user={user} />
                </div>

                {/* Recent things */}
                <RecentThingsPage />
            </div>

            {/* Links Section */}
            <div className='mt-5'>
                <LowerSectionPage />
            </div>
        </div>
    )
}

export default FeaturePage