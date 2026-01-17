import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Avatar, AvatarImage } from './ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const BrowseCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const fetchAllCompanies = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${COMPANY_API_END_POINT}/get-all`);
                if (res.data.success) {
                    setCompanies(res.data.companies);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch companies");
            } finally {
                setLoading(false);
            }
        };

        fetchAllCompanies();
    }, []);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Browse Companies</h1>
            <div className="overflow-x-auto">
                <Table>
                    <TableCaption className="text-sm">A list of all approved companies</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-sm">Logo</TableHead>
                            <TableHead className="text-sm">Name</TableHead>
                            <TableHead className="text-sm">Description</TableHead>
                            <TableHead className="text-sm">Website</TableHead>
                            <TableHead className="text-sm">Location</TableHead>
                            <TableHead className="text-sm">Status</TableHead>
                            <TableHead className="text-sm">Posted</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filterCompany?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-sm text-gray-500 py-4">
                                    No companies found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterCompany?.map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={company.logo} alt={company.name} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{company.name}</TableCell>
                                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                                        {company.description || "No description available"}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {company.website ? (
                                            <a 
                                                href={company.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Visit
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Not available</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">{company.location || "Not specified"}</TableCell>
                                    <TableCell>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Approved
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {new Date(company.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default BrowseCompanies;
