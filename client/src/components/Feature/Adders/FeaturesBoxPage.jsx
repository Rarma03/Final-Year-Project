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

            {box_print("FundRaising", "Description for feature 3", "bg-green-200", "/fundrasing", (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'black' }}>
                    <path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1 11a3 3 0 0 0-3 3H7a3 3 0 0 0-3-3V9a3 3 0 0 0 3-3h10a3 3 0 0 0 3 3v6z" />
                    <path d="M12 8c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
                </svg>
            ))}

            {box_print("Room-Mate Finder", "Description for feature 4", "bg-blue-200", "/roomfinder", (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'black' }}>
                    <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm9-8.586 6 6V15l.001 5H6v-9.586l6-6z"></path><path d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"></path>
                </svg>
            ))}

            {box_print("Campus Events", "Description for feature 5", "bg-purple-200", "/events", (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'black' }}>
                    <path d="M19 4h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-1 15h-6v-6h6v6zm1-10H5V7h14v2z"></path>
                </svg>
            ))}

            {box_print("Notification", "Description for feature 6", "bg-pink-200", "/", (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            ))}
        </div>
    );
}

export default FeaturesBoxPage;