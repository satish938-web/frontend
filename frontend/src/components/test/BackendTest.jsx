import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const BackendTest = () => {
    const [loading, setLoading] = useState(false);
    const [testResults, setTestResults] = useState([]);

    const testBackendConnection = async () => {
        try {
            setLoading(true);
            const res = await axios.get('https://backend-job-three.vercel.app/test');
            setTestResults(prev => [...prev, { 
                test: 'Backend Connection', 
                status: '✅ Success', 
                data: res.data,
                timestamp: new Date().toLocaleTimeString()
            }]);
            toast.success('Backend connection successful!');
        } catch (error) {
            setTestResults(prev => [...prev, { 
                test: 'Backend Connection', 
                status: '❌ Failed', 
                error: error.message,
                timestamp: new Date().toLocaleTimeString()
            }]);
            toast.error('Backend connection failed!');
        } finally {
            setLoading(false);
        }
    };

    const testLoginEndpoint = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, {
                email: 'test@test.com',
                password: 'test123',
                role: 'student'
            });
            setTestResults(prev => [...prev, { 
                test: 'Login Endpoint', 
                status: '✅ Success', 
                data: res.data,
                timestamp: new Date().toLocaleTimeString()
            }]);
        } catch (error) {
            setTestResults(prev => [...prev, { 
                test: 'Login Endpoint', 
                status: '❌ Failed', 
                error: error.response?.data?.message || error.message,
                timestamp: new Date().toLocaleTimeString()
            }]);
        } finally {
            setLoading(false);
        }
    };

    const clearResults = () => {
        setTestResults([]);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Backend Connection Test</h1>
            
            <div className="space-y-4 mb-6">
                <Button onClick={testBackendConnection} disabled={loading} className="w-full">
                    {loading ? 'Testing...' : 'Test Backend Connection'}
                </Button>
                
                <Button onClick={testLoginEndpoint} disabled={loading} variant="outline" className="w-full">
                    {loading ? 'Testing...' : 'Test Login Endpoint'}
                </Button>
                
                <Button onClick={clearResults} variant="destructive" className="w-full">
                    Clear Results
                </Button>
            </div>

            {testResults.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Test Results:</h2>
                    {testResults.map((result, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{result.test}</span>
                                <span className="text-sm text-gray-500">{result.timestamp}</span>
                            </div>
                            <div className={`font-bold ${result.status.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                {result.status}
                            </div>
                            {result.data && (
                                <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                                    <pre>{JSON.stringify(result.data, null, 2)}</pre>
                                </div>
                            )}
                            {result.error && (
                                <div className="mt-2 p-2 bg-red-100 rounded text-sm text-red-700">
                                    {result.error}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BackendTest;
