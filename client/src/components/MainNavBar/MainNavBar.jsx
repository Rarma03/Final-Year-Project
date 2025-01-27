import React from 'react'
import WebLogo from './Adders/WebLogo'
import SelectionBar from './Adders/SelectionBar'
import ProfileLogo from './Adders/ProfileLogo'

const MainNavBar = () => {
    return (
        // <div className='grid grid-cols-10 mt-2 items-center'>
        <div className='grid grid-cols-10 mt-2 items-center px-2 mb-5'>
            <div className='col-span-2'>
                <WebLogo />
            </div>
            <div className='col-span-7'>
                <SelectionBar />
            </div>
            <div className='col-span-1'>
                <ProfileLogo />
            </div>
        </div>
    )
}

export default MainNavBar