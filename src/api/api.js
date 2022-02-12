import axios from "axios";

const apis =  axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/users"
     //baseURL: "http://3.38.178.109/"
    //baseURL: "http://3.35.140.5/api/auth/userid"
    // baseURL: "http://3.35.140.5/api/item"

    // baseURL: "http://3.35.140.5"
})

export default apis;