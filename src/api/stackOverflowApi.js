import axios from 'axios';

export const fetchTagsFromApi = async (props) => {
    try {
        const response = await axios.get(`https://api.stackexchange.com/2.3/tags?pagesize=${props.page_size}&order=desc&sort=${props.sort_type}&site=stackoverflow&page=${props.page_number}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const fetchLatestPostForTag = async (tagName) => {
    try {
        const response = await axios.get(`https://api.stackexchange.com/2.3/tags/${tagName}/faq?site=stackoverflow`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
