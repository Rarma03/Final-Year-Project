import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'
import LowerSectionPage from './Adders/LowerSectionPage'
import FeaturesBoxPage from './Adders/FeaturesBoxPage'

const FeaturePage = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            {/* Navigation-Bar */}
            <MainNavBar />

            {/* Content - Middle Layer */}
            <div className='flex-grow grid grid-cols-1 md:grid-cols-10 gap-2'>
                {/* Contains Features */}
                <div className='col-span-7 bg-white rounded-r-md border-2 border-l-0 border-amber-400 p-4'>
                    {/* main items */}
                    <FeaturesBoxPage />
                </div>

                {/* Recent things */}
                <div className='col-span-3 flex flex-col gap-2 rounded-l-md'>
                    <div className='h-[350px] bg-white rounded-l-2xl border-2 border-r-0 border-amber-400 p-2'>Recent Top Picks</div>
                    <div className='h-[300px] bg-white rounded-l-2xl border-2 border-r-0 border-amber-400 p-2'>Latest Links</div>
                </div>
            </div>

            {/* Links Section */}
            <div className='mt-5'>
                <LowerSectionPage />
            </div>
        </div>
    )
}

export default FeaturePage