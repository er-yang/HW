import axios from 'axios';


export default axios.create({headers:{authorizstion: token}});