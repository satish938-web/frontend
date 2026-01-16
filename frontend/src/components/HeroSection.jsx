import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black py-10'>
            <div className='flex flex-col gap-3 sm:gap-4 md:gap-5 my-6 sm:my-8 md:my-10'>
                <span className='mx-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-xs sm:text-sm'>Welcome to CareerConnect</span>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 animate-fade-in'>Find Your Path & <br className="hidden sm:block" /> Build Your <span className='text-yellow-500'>Future</span></h1>
                <p className='text-sm sm:text-base px-4 max-w-2xl mx-auto'>Discover thousands of opportunities tailored to your skills and aspirations. Start your journey today!</p>
                <div className='flex flex-col sm:flex-row w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Search for your dream job'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-sm sm:text-base px-2 py-2 sm:py-0 rounded-l-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shrink-0 w-full sm:w-auto transition-all duration-300">
                        <Search className='h-4 w-4 sm:h-5 sm:w-5 mx-auto' />
                    </Button>
                </div>
                <div className='mt-4'>
                    <Button
                        onClick={() => navigate("/browse")}
                        className='bg-[#F83002] text-white px-6 py-2 rounded-full hover:bg-[#d72a02] transition-all duration-300'>
                        Get Started
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection