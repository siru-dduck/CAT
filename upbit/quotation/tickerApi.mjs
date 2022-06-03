'use strict';

import axios from "axios";
import apiConfig from "../../common/upbitApiConfig.mjs";

const headers = {Authorization: `Bearer ${apiConfig.token}`};

/**
 * upbit 현재가 조회 API URL
 * @type {String}
 */
const GET_TICKER_API_URL = "https://api.upbit.com/v1/ticker";

/**
 * 현재가 조회 API 호출
 */
export const getTicker = async (markets) => {
    try {
        const result = await axios.get(GET_TICKER_API_URL, { 
            params: {
                markets
            },
            headers });    
        console.debug("GET Ticker Response: ", result.data);
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
