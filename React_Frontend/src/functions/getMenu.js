import axios from 'axios'
import { axiosConfiguration } from '../variable/axios';

const listofmenu = async () => {
    try {
        const response = await axios.get(`${axiosConfiguration.url}/api/menu`);
        localStorage.setItem("menu", JSON.stringify(response.data.menu));
        return 
    } catch (err) {
        console.log(err);
    }

}

export default listofmenu;

