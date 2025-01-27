import React from 'react'
import MainNavBar from '../MainNavBar/MainNavBar'

const FeaturePage = () => {
    return (
        <div>
            {/* Navigation-Bar */}
            <MainNavBar />

            {/* Content - Middle Layer*/}
            <div className='grid grid-cols-10 gap-2 mx-5'>
                {/* Contains Features */}
                <div className='col-span-7'>
                    main items
                </div>
                {/* Recent things */}
                <div className='col-span-3 flex flex-col gap-2'>
                    <div>item-1</div>
                    <div>item-2</div>
                </div>
            </div>

            {/* Links Section */}
            <div>
                LowerSection
            </div>
        </div>
    )
}

export default FeaturePage