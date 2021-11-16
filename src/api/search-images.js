import axios from "axios";

const baseURL = 'https://api.unsplash.com';

export const searchApi = axios.create({ baseURL });

