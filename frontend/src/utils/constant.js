const API_BASE_URL = import.meta.env.VITE_API_URL || "https://jobportalfinal-ez4j.onrender.com";

// Debug: Log the API URL
console.log("API_BASE_URL:", API_BASE_URL);
console.log("Environment:", import.meta.env.MODE);

export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;