import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesBoxPage = () => {
    function box_print(feature_name, feature_desc, feature_color, feature_link, feature_svg) {
        return (
            <Link to={feature_link} className={`${feature_color} m-2 h-[300px] rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:z-10 cursor-pointer flex flex-col items-center justify-center p-4 relative overflow-hidden group`}>
                <div className="absolute w-full h-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {feature_svg}
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">{feature_name}</h2>
                <p className="text-gray-600 text-center mt-2 group-hover:text-white/90 transition-colors duration-300">{feature_desc}</p>
            </Link>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-4 max-w-6xl mx-auto'>

            {box_print("Virtual Library", "Description for feature 1", "bg-red-200", "/library", (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg>
            ))}

            {box_print("Interview Experiences", "Description for feature 2", "bg-yellow-200", "/interviews", (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'black' }}>
                    <path d="M6 18a6.06 6.06 0 0 0 5.17-6 7.62 7.62 0 0 1 6.52-7.51l2.59-.37c-.07-.08-.13-.16-.21-.24-3.26-3.26-9.52-2.28-14 2.18C2.28 9.9 1 15 2.76 18.46z"></path>
                    <path d="M12.73 12a7.63 7.63 0 0 1-6.51 7.52l-2.46.35.15.17c3.26 3.26 9.52 2.29 14-2.17C21.68 14.11 23 9 21.25 5.59l-3.34.48A6.05 6.05 0 0 0 12.73 12z"></path>
                </svg>
            ))}

            {box_print("FundRaising", "Description for feature 3", "bg-green-200", "/library", (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'black' }}>
                    <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 11a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v6z" />
                    <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                </svg>
            ))}

            {box_print("Feature 4", "Description for feature 4", "bg-blue-200", "/library", (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
                </svg>
            ))}

            {box_print("Feature 5", "Description for feature 5", "bg-purple-200", "/library", (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                </svg>
            ))}

            {box_print("Feature 6", "Description for feature 6", "bg-pink-200", "/library", (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            ))}
        </div>
    );
}

export default FeaturesBoxPage;