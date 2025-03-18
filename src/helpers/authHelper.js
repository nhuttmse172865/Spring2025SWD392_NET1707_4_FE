import {jwtDecode} from 'jwt-decode';

export const getUserInfo = () => {
    const token = localStorage.getItem('customer_information');
    if (!token) return null;

    try {
        const decode = jwtDecode(token);
        return {
            accountId: decode.accountId,
            role: decode.roles ? decode.roles[0] : null,
           
        };
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
