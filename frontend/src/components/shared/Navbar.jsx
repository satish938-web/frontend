import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to logout");
        }
    }
    return (
        <>
            <div className='bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white fixed top-0 left-0 w-full z-50'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-center'>
                        <h1 className='text-xl sm:text-2xl font-bold'>Job<span className='text-yellow-400'>Search</span></h1>
                    </div>
                    <div className='hidden md:flex items-center gap-6 lg:gap-12'>
                        <ul className='flex font-medium items-center gap-3 lg:gap-5'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies" className="hover:text-yellow-400 transition-colors">Companies</Link></li>
                                        <li><Link to="/admin/jobs" className="hover:text-yellow-400 transition-colors">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
                                        <li><Link to="/jobs" className="hover:text-yellow-400 transition-colors">Jobs</Link></li>
                                        <li><Link to="/browse" className="hover:text-yellow-400 transition-colors">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline" className="text-sm text-black border-black hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-md">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-yellow-400 hover:bg-yellow-500 text-sm text-black px-4 py-2 rounded-md">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            <AvatarFallback className="bg-yellow-400 text-black">
                                                {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 bg-gray-800 text-white">
                                        <div className=''>
                                            <div className='flex gap-2 space-y-2'>
                                                <Avatar className="cursor-pointer">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                    <AvatarFallback className="bg-yellow-400 text-black">
                                                        {user?.fullname?.charAt(0)?.toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                            <User2 />
                                                            <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }

                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='md:hidden p-2 rounded-md hover:bg-gray-700'>
                        {mobileMenuOpen ? <X className='h-6 w-6 text-white' /> : <Menu className='h-6 w-6 text-white' />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className='md:hidden bg-gray-900 p-4'>
                        <ul className='flex flex-col gap-4 text-white'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Browse</Link></li>
                            {
                                !user ? (
                                    <>
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/signup">Signup</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/profile">Profile</Link></li>
                                        <li><button onClick={logoutHandler}>Logout</button></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                )}
            </div>
            <div className='mt-16'></div>
        </>
    )
}

export default Navbar