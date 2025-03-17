import React, { useEffect, useState } from 'react';
import MainNavBar from '../MainNavBar/MainNavBar';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
                const response = await axios.get(`${BASE_URL}/api/event/allevents?page=${page}&limit=10`);

                if (response.data.length < 10) {
                    setHasMore(false);
                }

                setEvents(prevEvents => {
                    const newEvents = response.data.filter(newEvent =>
                        !prevEvents.some(event => event._id === newEvent._id)
                    );
                    return [...prevEvents, ...newEvents];
                });
            } catch (error) {
                console.error('Error fetching events:', error);
            }
            setLoading(false);
        };

        fetchEvents();
    }, [page]);

    const loadMore = () => {
        if (hasMore && !loading) {
            setPage(prevPage => prevPage + 1);
        }
    };

    // Updated arrow components with proper prop handling
    const NextArrow = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className="!right-4 md:!right-8 !w-12 !h-12 hover:!scale-110 !transition-all !duration-300 z-10"
        >
            <svg className="w-full h-full" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );

    const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
        <button
            {...props}
            className="!left-4 md:!left-8 !w-12 !h-12 hover:!scale-110 !transition-all !duration-300 z-10"
        >
            <svg className="w-full h-full" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
    );

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        appendDots: dots => (
            <div className="flex justify-center items-center mt-4 space-x-2">
                <ul className="flex space-x-2">{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div className="w-3 h-3 bg-white/30 rounded-full transition-all duration-300 hover:bg-white/50" />
        ),
        dotsClass: 'slick-dots !relative',
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    const handleImageClick = async (eventItem) => {
        try {
            const BASE_URL = import.meta.env.VITE_REQUEST_HEADER;
            await axios.patch(`${BASE_URL}/api/event/events/${eventItem._id}/view`);
            setEvents(prev =>
                prev.map(e => e._id === eventItem._id ? { ...e, view: e.view + 1 } : e)
            );
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
        setSelectedEvent(eventItem);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <div className="min-h-screen">
            <MainNavBar />

            {/* Carousel Section */}
            <h1 className="font-bold text-gray-800 mb-[-80px] bg-white text-center">🍿Latest Events</h1>
            <div className="my-8 px-4">
                <Slider {...carouselSettings}>
                    {events.slice(0, 5).map(event => (
                        <div key={event._id} className="relative">
                            <div className="relative overflow-hidden rounded-xl shadow-xl group">
                                <img
                                    src={event.posterLink}
                                    alt="Event Poster"
                                    className="w-full h-[70vh] md:h-[80vh] object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-4">
                                    <h2 className="text-3xl md:text-4xl font-bold drop-shadow-lg">{event.title}</h2>
                                    <p className="text-lg md:text-xl line-clamp-2 drop-shadow-md">{event.description}</p>
                                    <div className="flex gap-4">
                                        <a
                                            href={event.registerLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                                        >
                                            Register Now
                                        </a>
                                        <button
                                            onClick={() => handleImageClick(event)}
                                            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Events Grid */}
            <div className="p-4 md:p-8 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">⭐ Upcoming Events ⭐</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                            onClick={() => handleImageClick(event)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={event.posterLink}
                                    alt="Event Poster"
                                    className="w-full h-56 object-cover transform transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                    👁️ {event.view} views
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                                <div className="flex justify-between items-center">
                                    <a
                                        href={event.registerLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105 shadow-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Register Now
                                    </a>
                                    {event.instagramLink && (
                                        <a
                                            href={event.instagramLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-pink-500 hover:text-pink-600 flex items-center space-x-1 transition-colors duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                            </svg>
                                            <span className="hidden sm:inline">Follow</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {loading && (
                    <p className="text-center mt-6 text-gray-600 animate-pulse">Loading events...</p>
                )}
                {hasMore && !loading && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={loadMore}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                        >
                            Load More Events
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl">
                        <img
                            src={selectedEvent.posterLink}
                            alt="Zoomed Event Poster"
                            className="w-full h-full object-contain max-h-[80vh] mx-auto"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventPage;