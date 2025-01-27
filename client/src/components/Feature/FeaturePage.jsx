import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'
import LowerSectionPage from './Adders/LowerSectionPage'

const FeaturePage = () => {
    return (
        <div>
            {/* Navigation-Bar */}
            <MainNavBar />

            {/* Content - Middle Layer*/}
            <div className='grid grid-cols-10 gap-2'>
                {/* Contains Features */}
                <div className='col-span-7 bg-gray-100 rounded-r-md'>
                    main items
                </div>

                {/* Recent things */}
                <div className='col-span-3 flex flex-col gap-2 bg-gray-100 rounded-l-md'>
                    <div>item-1</div>
                    <div>item-2</div>
                </div>
            </div>

            {/* Links Section */}
            <div>
                <LowerSectionPage />
            </div>
        </div>
    )
}

export default FeaturePage