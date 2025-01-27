import React from 'react'
import WebLogo from './Adders/WebLogo'
import SelectionBar from './Adders/SelectionBar'
import ProfileLogo from './Adders/ProfileLogo'

const MainNavBar = () => {
    return (
        <div className='grid grid-cols-10 mt-2'>
            <div className='col-span-2'>
                <WebLogo />
            </div>
            <div className='col-span-6'>
                <SelectionBar />
            </div>
            <div className='col-span-2'>
                <ProfileLogo />
            </div>
        </div>
    )
}

export default MainNavBar