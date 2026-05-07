import React from 'react'
import { Link, NavLink } from 'react-router';
import { useTheme } from '../../context/ThemeContext';

export default function Header() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-[var(--bg-header)] border-[var(--border-color)] px-4 lg:px-6 py-2.5 transition-colors duration-300">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://img.freepik.com/premium-vector/movie-ticket-logo-template-design_20029-891.jpg?semt=ais_incoming&w=740&q=80"
                            className="mr-3 h-12 scale-120 rounded-xl"
                            alt="Logo"
                            width={48}
                            height={48}
                        />
                    </Link>
                    <div className="flex items-center lg:order-2 gap-2">
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl transition-all duration-300 cursor-pointer
                            hover:scale-110 active:scale-95
                            bg-[var(--bg-card)] text-[var(--text-primary)]
                            border border-[var(--border-color)]
                            shadow-sm hover:shadow-md"
                            aria-label="Toggle dark mode"
                            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {isDark ? (
                                /* Sun icon */
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"/>
                                    <line x1="12" y1="1" x2="12" y2="3"/>
                                    <line x1="12" y1="21" x2="12" y2="23"/>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                                    <line x1="1" y1="12" x2="3" y2="12"/>
                                    <line x1="21" y1="12" x2="23" y2="12"/>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                                </svg>
                            ) : (
                                /* Moon icon */
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                                </svg>
                            )}
                        </button>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none transition-colors duration-200"
                        >
                            Get started
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                to={'/'}
                                className={({ isActive }) =>
                                `block px-3 py-1 border-b border-[var(--border-color)] rounded-2xl transition-all duration-300 ease-in-out
                                hover:text-orange-700 lg:border-0 
                                ${isActive ? "text-orange-700 dark:text-orange-400 bg-amber-200/40 dark:bg-orange-900/30" : "text-[var(--text-primary)] bg-transparent"}`
                                }
                                
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={"/bookinghistory"}
                                className={({ isActive }) =>
                                `block px-3 py-1 border-b border-[var(--border-color)] rounded-2xl transition-all duration-300 ease-in-out
                                hover:text-orange-700 lg:border-0 
                                ${isActive ? "text-orange-700 dark:text-orange-400 bg-amber-200/40 dark:bg-orange-900/30" : "text-[var(--text-primary)] bg-transparent"}`
                                }
                                
                                >
                                    Booking History
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                to={"/watchhistory"}
                                className={({ isActive }) =>
                                `block px-3 py-1 border-b border-[var(--border-color)] rounded-2xl transition-all duration-300 ease-in-out
                                hover:text-orange-700 lg:border-0 
                                ${isActive ? "text-orange-700 dark:text-orange-400 bg-amber-200/40 dark:bg-orange-900/30" : "text-[var(--text-primary)] bg-transparent"}`
                                }
                                
                                >
                                    Watch History
                                </NavLink>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
