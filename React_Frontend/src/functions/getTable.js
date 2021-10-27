import axios from 'axios'
import { axiosConfiguration } from '../variable/axios';

const gettable = async () => {
    var tokenObject = localStorage.getItem("token");
    const table = {
        "token": tokenObject
    };
    await axios.post(`${axiosConfiguration.url}/api/table`, {
        table
    }).then((response) => {
        localStorage.setItem("table", JSON.stringify(response.data.table));
    }).catch((err) => {
        console.log(err)
    })
}

export default gettable;