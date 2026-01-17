import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'

const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/reset-password`, {
                email,
                newPassword
            });
            
            if (res.data.success) {
                toast.success("Password reset successful! You can now login.");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            toast.error("Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md border border-gray-200 rounded-md p-6">
                <h1 className="font-bold text-xl mb-4">Reset Password</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <Label className="text-sm">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <Label className="text-sm">New Password</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-blue-600 hover:underline">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
