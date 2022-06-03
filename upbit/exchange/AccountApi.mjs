'use strict';

import axios from "axios";
import apiConfig from "../../common/upbitApiConfig.mjs";

const headers = {Authorization: `Bearer ${apiConfig.token}`};

/**
 * upbit 전체계좌 조회 API URL
 * @type {String}
 */
const GET_ACCOUNTS_API_URL = "https://api.upbit.com/v1/accounts";

/**
 * 전체계좌 조회 API 호출
 */
export const getAccount = async () => {
    try {
        const result = await axios.get(GET_ACCOUNTS_API_URL, { headers });    
        console.debug("GET Accounts Response: ", result.data);
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
