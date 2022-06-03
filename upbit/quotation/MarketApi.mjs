'use strict';

import axios from "axios";
import apiConfig from "../../common/upbitApiConfig.mjs";

/**
 * upbit API 요청 Header
 */
const headers = { Authorization: `Bearer ${apiConfig.token}` };

/**
 * upbit 마켓코드 조회 API URL
 * @type {String}
 */
const GET_MARKET_API_URL = "https://api.upbit.com/v1/market/all?isDetails=true";

/**
 * 마켓코드 조회 API 호출
 */
export const getMarket = async () => {
    try {
        const result = await axios.get(GET_MARKET_API_URL, { headers });
        console.debug("GET Market Response: ", result.data);
        return result.data;
    } catch (error) {
        console.error(error);
    }
};
