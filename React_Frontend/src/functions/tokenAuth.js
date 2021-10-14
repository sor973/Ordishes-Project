import axios from 'axios'
import { axiosConfiguration } from '../variable/axios';

const tokenCheck = new RegExp(/^[A-Za-z0-9]+$/);

async function tokenAuthCheck(token){
    if(token){
        if(token === "") return false;
        if(!tokenCheck.test(token)) return false;
        const response = await axios.post(`${axiosConfiguration.url}/api/checktoken`,{
            token: token
        });
        if(!response.data.exist) return false;
        if(response.data.exist) return true;
    }
    return false;
}

export const TokenAuth = {
    tokenAuthCheck
}