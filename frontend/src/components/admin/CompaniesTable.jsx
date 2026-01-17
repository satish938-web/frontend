import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Check, X, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { updateCompanyStatusInStore, deleteCompanyFromStore } from '@/redux/companySlice'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

    const getStatusLabel = (status) => {
        if (status === "approved") return "Approved";
        if (status === "rejected") return "Rejected";
        return "Pending";
    }

    const getStatusColor = (status) => {
        if (status === "approved") return "text-green-600 bg-green-100";
        if (status === "rejected") return "text-red-600 bg-red-100";
        return "text-yellow-600 bg-yellow-100";
    }

    const handleApproveCompany = async (companyId) => {
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/approve/${companyId}`, {}, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(updateCompanyStatusInStore({ companyId, status: 'approved' }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve company");
        }
    }

    const handleRejectCompany = async (companyId) => {
        try {
            const res = await axios.put(`${COMPANY_API_END_POINT}/reject/${companyId}`, {}, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(updateCompanyStatusInStore({ companyId, status: 'rejected' }));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reject company");
        }
    }

    const handleDeleteCompany = async (companyId) => {
        try {
            const res = await axios.delete(`${COMPANY_API_END_POINT}/${companyId}`, {
                withCredentials: true
            });
            
            if (res.data.success) {
                dispatch(deleteCompanyFromStore(companyId));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete company");
        }
    }

    return (
        <div className="overflow-x-auto">
            <Table>
                <TableCaption className="text-xs sm:text-sm">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-xs sm:text-sm">Logo</TableHead>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-right text-xs sm:text-sm">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-sm text-gray-500 py-4">No companies found</TableCell>
                            </TableRow>
                        ) : filterCompany?.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                                        <AvatarImage src={company.logo}/>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-xs sm:text-sm">{company.name}</TableCell>
                                <TableCell className="text-xs sm:text-sm">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(company.status)}`}>
                                        {getStatusLabel(company.status)}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal className="h-4 w-4 sm:h-5 sm:w-5" /></PopoverTrigger>
                                        <PopoverContent className="w-40 space-y-2">
                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer text-xs sm:text-sm hover:bg-gray-100 p-1 rounded'>
                                                <Edit2 className='w-4 h-4' />
                                                <span>Edit</span>
                                            </div>
                                            
                                            {company.status !== 'approved' && (
                                                <div onClick={() => handleApproveCompany(company._id)} className='flex items-center gap-2 w-fit cursor-pointer text-xs sm:text-sm hover:bg-green-100 p-1 rounded text-green-600'>
                                                    <Check className='w-4 h-4' />
                                                    <span>Approve</span>
                                                </div>
                                            )}
                                            
                                            {company.status !== 'rejected' && (
                                                <div onClick={() => handleRejectCompany(company._id)} className='flex items-center gap-2 w-fit cursor-pointer text-xs sm:text-sm hover:bg-red-100 p-1 rounded text-red-600'>
                                                    <X className='w-4 h-4' />
                                                    <span>Reject</span>
                                                </div>
                                            )}
                                            
                                            <div onClick={() => handleDeleteCompany(company._id)} className='flex items-center gap-2 w-fit cursor-pointer text-xs sm:text-sm hover:bg-red-100 p-1 rounded text-red-600'>
                                                <Trash2 className='w-4 h-4' />
                                                <span>Delete</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable