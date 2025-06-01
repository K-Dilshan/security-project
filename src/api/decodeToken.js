import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {

   if(!token) return null;
    try{
        return jwtDecode(token);
    } catch(e){
        console.error("Token decoding failed", e)
        return null;
    }

};