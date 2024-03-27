import axios from 'axios';

export const fetchTagsFromApi = async () => {
    try {
        const response = await axios.get('https://api.stackexchange.com/2.3/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
