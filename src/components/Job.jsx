import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className='p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-xs sm:text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark className="h-4 w-4" /></Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-4 sm:p-6" variant="outline" size="icon">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div className="min-w-0 flex-1">
                    <h1 className='font-medium text-base sm:text-lg truncate'>{job?.company?.name || 'Company Name'}</h1>
                    <p className='text-xs sm:text-sm text-gray-500 truncate'>{job?.company?.location || job?.location || 'Location'}</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-base sm:text-lg my-2'>{job?.title}</h1>
                <p className='text-xs sm:text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            <div className='flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4'>
                <Badge className={'text-blue-700 font-bold text-xs'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold text-xs'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold text-xs'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-4'>
                <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline" className="text-xs sm:text-sm flex-1 sm:flex-initial">Details</Button>
                <Button className="bg-[#7209b7] text-xs sm:text-sm flex-1 sm:flex-initial">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job