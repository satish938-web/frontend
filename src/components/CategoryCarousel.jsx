import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="px-4">
            <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Explore Categories</h2>
            <Carousel className="w-full max-w-xl mx-auto my-10 sm:my-16 md:my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full w-full sm:w-auto text-xs sm:text-sm hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-md">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex hover:text-purple-500 transition-all duration-300" />
                <CarouselNext className="hidden sm:flex hover:text-purple-500 transition-all duration-300" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel