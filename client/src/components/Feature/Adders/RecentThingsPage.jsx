import React from 'react';

const RecentThingsPage = () => {
    return (
        <div className='col-span-3 flex flex-col gap-2 rounded-l-md'>
            <div className='h-[350px] bg-white rounded-l-2xl border-2 border-r-0 border-amber-400 p-2'>
                <h2>Recent Top Picks</h2>
                <ul className='pl-5 list-disc'>
                    <li className='truncate'>
                        <a href="https://drive.google.com/file/d/1b0wct2E3UhQJ4GFXbkcU0bDZuQTkSjoX/view" target="_blank" rel="noopener noreferrer" className='text-blue-800 truncate'>
                            Operating System Book
                        </a>
                    </li>
                    <li className='truncate'>
                        <a href="https://gs-campus-connect.vercel.app/interviews/Deloitte/67cc2dc8041d38474b8b7602" target="_blank" rel="noopener noreferrer" className='text-blue-800 truncate'>
                            Deloitte interview
                        </a>
                    </li>
                    <li className='truncate'>
                        <a href="https://gs-campus-connect.vercel.app/roomfinder" target="_blank" rel="noopener noreferrer" className='text-blue-800 truncate'>
                            New rooms
                        </a>
                    </li>
                </ul>
            </div>
            <div className='h-[300px] bg-white rounded-l-2xl border-2 border-r-0 border-amber-400 p-2 '>
                <h2>Latest Links</h2>
                <ul className='pl-5 list-disc'>
                    <li className='truncate'>
                        <span>Calendar: </span>
                        <a href="https://www.sgsits.ac.in/index.php/academics/academic-calendar" target="_blank" rel="noopener noreferrer" className='text-blue-800 truncate'>
                            https://www.sgsits.ac.in/index.php/academics/academic-calendar
                        </a>
                    </li>
                    <li className='truncate'>
                        <span>Syllabus: </span>
                        <a href="https://www.sgsits.ac.in/index.php/academics/academic-calendar" target="_blank" rel="noopener noreferrer" className='text-blue-800 truncate'>
                            https://www.sgsits.ac.in/index.php/academics/academic-calendar
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RecentThingsPage;