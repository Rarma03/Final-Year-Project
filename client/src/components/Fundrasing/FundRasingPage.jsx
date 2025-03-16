import React from 'react'
import { Link } from 'react-router-dom'

const FundRasingPage = () => {
    return (
        < div className='relative bg-white p-4 flex flex-col items-center justify-center text-4xl h-[100vh]' >
            <Link to={'/feature'} className="absolute top-4 left-4 hover:text-5xl">
                🔙
            </Link>
            🚧 Under construction.
        </div >
    )
}

export default FundRasingPage