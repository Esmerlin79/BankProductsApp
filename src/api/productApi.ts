import axios from "axios";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const productApi = axios.create({ baseURL });


productApi.interceptors.request.use(
    async (config: any) => {
        const authorId = Math.floor(Math.random() * 1000000);
        config.headers['authorId'] = 1234
        return config;
    }
);

export default productApi;