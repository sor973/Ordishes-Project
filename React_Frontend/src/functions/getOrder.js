import axios from 'axios'
import { axiosConfiguration } from '../variable/axios';

const listoforder = async () => {
    try {
        const response = await axios.get(`${axiosConfiguration.url}/api/orderlist`);
        return response.data;
    } catch (err) {
        console.log(err);
    }

}

export default listoforder;