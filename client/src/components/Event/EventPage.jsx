import React from 'react'
import { Link } from 'react-router-dom'
import MainNavBar from '../MainNavBar/MainNavBar';

const EventPage = () => {
    return (
        <div className='grid grid-cols-1'>
            <MainNavBar />
            <div>
                {/* Carasoul Of Any 5 Images from event model */}
            </div>

            <div>
                <h1>Upcoming Events</h1>
                {/* load all the events with lazy loading and pagination */}
                {/* before loading an even make sure it is within uploaded in last seven days from current day, if not then delete it from db */}
                {/* {data.map()} */}
            </div>
        </div>
    )
}

export default EventPage