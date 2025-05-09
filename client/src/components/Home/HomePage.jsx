import React from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div className="top-logo-bar">
                <div className="flex justify-between items-center p-4">
                    {/* Home button aligned to the left */}
                    <button className="px-5 py-2 border border-dashed rounded-full mx-2 border-black bg-white hover:shadow-lg hover:shadow-black">
                        <Link to={'/feature'}>Home</Link>
                    </button>
                    {/* Login and Register buttons aligned to the right */}
                    <div className="flex space-x-4">
                        <button className="px-5 py-2 border border-dashed rounded-full border-black bg-white hover:shadow-lg hover:shadow-black">
                            <Link to={'/login'}>Login</Link>
                        </button>
                        <button className="px-5 py-2 border border-dashed rounded-full border-black bg-white hover:shadow-lg hover:shadow-black">
                            <Link to={'/register'}>Register</Link>
                        </button>
                    </div>
                </div>
                <h1 className="text-[40px] pt-[100px] pb-[100px] flex flex-col items-center justify-center leading-none">
                    {/* Image Row */}
                    <div className="flex items-center justify-center space-x-4">
                        {/* <img src="/images/image_prev_ui.png" alt="Preview Image" class="w-40 h-40"> */}
                        <img
                            src="/images/logo.png"
                            alt="sgsits_logo"
                            className="w-40 h-40 drop-shadow-lg"
                        />
                        {/* <img src="/images/image_prev_ui.png" alt="Preview Image" class="w-40 h-40"> */}
                    </div>
                    {/* Title with GS Highlighted */}
                    <span className="text-[50px] font-bold bg-white rounded-full px-3 py-1 mt-5 flex items-center">
                        <span className="text-blue-400 font-bold text-outline">G</span>
                        <span className="text-green-400 font-bold text-outline">S</span>
                    </span>
                    {/* Campus Connect Title with Divider */}
                    <div className="flex flex-row items-center w-full mt-5">
                        <div className="bg-black h-1 w-full" />
                        <div className="bg-black h-4 w-4" />
                        <span className="text-violet-400 font-bold mx-5 bg-white px-5 py-2 rounded-full border border-dashed border-black kumar-one-regular">
                            <span className="font-bold kumar-one-regular">Campus</span>&nbsp;Connect
                        </span>
                        <div className="bg-black h-4 w-4" />
                        <div className="bg-black h-1 w-full" />
                    </div>
                </h1>
            </div>
            <div className="bg-white h-full rounded-xl m-5 p-4 flex">
                <div className="gridywrap">
                    <div className="intro">
                        <h1>Let's Dive Into Insights Of SGSITS!</h1>
                        <br />
                    </div>
                    <div className="gridy-2 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://careermudhra.com/wp-content/uploads/sgsits-indore.jpg)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <Link to={'https://www.sgsits.ac.in/'} target='_blank'>
                                <h3>SGSITS</h3>

                                <p className="gridexerpt">
                                    Shri Govindram Seksaria Institute of Technology and Science (SGSITS) is an autonomous, state-aided engineering institute established in 1952 and spread over a 35-acre urban campus in Indore, Madhya Pradesh. Affiliated to Rajiv Gandhi Proudyogiki Vishwavidyalaya and Devi Ahilya Vishwavidyalaya, SGSITS fosters academic excellence through its diverse undergraduate, postgraduate, and doctoral programs
                                </p>
                                <a href="#" className="grid-btn grid-more">
                                    <span>More</span> <i className="fa fa-plus" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="gridy-1 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1525921429624-479b6a26d84d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Students</h3>

                            <p className="gridexerpt">
                                Our students form the vibrant heart of SGS Campus Connect, engaging in cultural fests, technical clubs, and leadership initiatives. From the annual techno-cultural extravaganza “Aayaam” to hobby clubs like CodeFoster and Team GSRacers, they explore innovation, creativity, and community outreach
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                    <div className="gridy-1 gridyhe-2">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvnGN_ngn4zI1QuYyKiRW--eHbWjqmZ3oTw&s)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Campus Ground</h3>

                            <p className="gridexerpt">
                                The sprawling campus ground serves as a multi-purpose arena for sports tournaments, open-air events, and social gatherings. Lush greenery and well-maintained lawns provide the perfect backdrop for everything from intra-college football matches to evening cultural soirées
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                    <div className="gridy-2 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://images.shiksha.com/mediadata/images/1666076242php4KEm6x.jpeg)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Training & Placements</h3>

                            <p className="gridexerpt">
                                The Training and Placement Cell (TPC) at SGSITS serves as the pivotal bridge between academia and industry, organizing structured pre-placement training, internship programs, and annual campus recruitment drives with leading companies. It boasts a 96%+ placement rate and has secured highest packages reaching up to INR 44.5 LPA for its students
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                    <div className="gridy-1 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Library</h3>

                            <p className="gridexerpt">
                                Established in 1955, the Central Library is the largest college library in Central India for technology and science education. Boasting over 108,000 books, 9,600 online journals, and extensive digital resources, it supports research and learning across all disciplines
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                    <div className="gridy-1 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Sports</h3>

                            <p className="gridexerpt">
                                SGSITS promotes holistic development through its dedicated sports facilities, including indoor and outdoor courts, gymnasium, and a professional-grade football field. Regular tournaments in cricket, basketball, and athletics encourage teamwork, fitness, and sportsmanship
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                    <div className="gridy-2 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVpbGRpbmdzJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <Link to={'https://sgsits.ac.in/departments'} target='_blank'>
                                <h3>Departments</h3>

                                <p className="gridexerpt">
                                    Comprising 13 undergraduate and multiple postgraduate departments—from Computer Engineering to Industrial Pharmacy—SGSITS delivers specialized curricula, state-of-the-art labs, and expert faculty to nurture future innovators and researchers
                                </p>
                                <a href="#" className="grid-btn grid-more">
                                    <span>More</span> <i className="fa fa-plus" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="gridy-1 gridyhe-1">
                        <div
                            className="gridimg"
                            style={{
                                backgroundImage:
                                    "url(https://plus.unsplash.com/premium_photo-1714329905829-41d19b4ad2f9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXdhcmRzfGVufDB8fDB8fHww)"
                            }}
                        >
                            &nbsp;
                        </div>
                        <div className="gridinfo">
                            <h3>Awards &amp; Achievements</h3>

                            <p className="gridexerpt">
                                SGSITS consistently earns national recognition, including NIRF rankings (201–300 in Engineering, 2024), AICTE approvals, and student-won gold medals in K.G. Seksaria Awards. Alumni and faculty have also received prestigious honors such as Padma Shri
                            </p>
                            <a href="#" className="grid-btn grid-more">
                                <span>More</span> <i className="fa fa-plus" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Information Section */}
            <section className="info-section flex flex-col">
                <div className="bg-white rounded-xl m-5 p-3 flex flex-col items-center">
                    {/* <h2 class="font-bold">About GS Campus Connect</h2> */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        {/* Image for About Us (Optional) */}
                        <div className="md:w-1/2 w-full">
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/007/932/867/original/about-us-button-about-us-text-template-for-website-about-us-icon-flat-style-vector.jpg"
                                alt="About Us Image"
                                className=""
                            />
                        </div>
                        {/* Text Content */}
                        <div className="md:w-1/2 w-full">
                            <p className="text-lg text-[#4A4947] leading-relaxed">
                                GS Campus Connect is a comprehensive platform designed to streamline
                                and enhance the academic and social experience for college students.
                                Our platform provides easy access to vital academic resources, past
                                exam papers, study materials, and collaborative tools. Stay
                                up-to-date with campus events, find housing, internships, and
                                connect with peers through our discussion forums.
                            </p>
                            <p className="text-lg text-[#4A4947] leading-relaxed mt-4">
                                We are committed to fostering a vibrant, supportive community where
                                students can thrive academically and socially. Join us and take full
                                advantage of our features designed to make college life easier and
                                more enriching.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl m-5 p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Section */}
                    <div className="w-full">
                        <img
                            src="https://t3.ftcdn.net/jpg/06/94/85/20/360_F_694852065_7ik2P5TmHdeqzM57iwDVODt1XlUghZdM.jpg"
                            alt="Services Image"
                            className="w-full h-auto object-cover rounded-xl"
                        />
                    </div>

                    {/* Service and Features Section */}
                    <div className="flex flex-col sm:flex-row gap-8 items-center justify-center text-2xl">
                        <div className="w-full">
                            <h2 className="font-bold mb-4 text-center sm:text-left underline">Themes</h2>
                            <ul className="border-l border-black pl-4">
                                <li>Academic Resource Hub</li>
                                <li>Campus Event Notifications</li>
                                <li>Room Finder and Flat-mate Match</li>
                                <li>Job and Internship Opportunities</li>
                                <li>Global Forums</li>
                                <li>Chatbot Support</li>
                            </ul>
                        </div>
                        <div className="w-full">
                            <h2 className="font-bold mb-4 text-center sm:text-left underline">Key Features</h2>
                            <ul className="border-l border-black pl-4">
                                <li>Discussion Forums</li>
                                <li>Virtual Library</li>
                                <li>Event Dashboard</li>
                                <li>Profile Tracking</li>
                                <li>Admin Panel</li>
                                <li>Fundraising Portal</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </section>
            {/* Footer Section */}
            <footer className="bg-black text-white flex justify-center py-5">
                <p>©2025 GS Campus Connect. All Rights Reserved.</p>
            </footer>
            {/* Link to JS */}
        </>

    )
}

export default HomePage