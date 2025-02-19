import React from 'react'
import WebLogo from './Adders/WebLogo'
import SelectionBar from './Adders/SelectionBar'
import ProfileLogo from './Adders/ProfileLogo'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../AuthContext.jsx'

const MainNavBar = () => {
    const { user } = useContext(AuthContext);

    return (
        // <div className='grid grid-cols-10 mt-2 items-center'>
        <div className='grid grid-cols-10 mt-10 items-center px-2 mb-10'>
            <Link to={'/'} className='col-span-2'>
                <WebLogo />
            </Link>
            <div className='col-span-7'>
                <SelectionBar />
            </div>
            <div className='col-span-1'>
                <ProfileLogo username={user.name} />
            </div>
        </div>
    )
}

export default MainNavBar