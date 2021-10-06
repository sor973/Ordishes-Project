import axios from 'axios'

const listofmenu = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/menu");
        localStorage.setItem("menu", JSON.stringify(response.data.menu));
        return 
    } catch (err) {
        console.log(err);
    }

}

export default listofmenu;

