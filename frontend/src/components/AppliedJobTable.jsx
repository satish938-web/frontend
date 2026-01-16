import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-xs sm:text-sm">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Job Role</TableHead>
                        <TableHead className="text-xs sm:text-sm">Company</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-sm text-gray-500 py-4">You haven't applied any job yet.</TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell className="text-xs sm:text-sm">{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{appliedJob.job?.title}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{appliedJob.job?.company?.name}</TableCell>
                                <TableCell className="text-right"><Badge className={`text-xs ${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable