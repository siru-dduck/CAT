'use strict';

import axios from "axios";
import apiConfig from "../../common/upbitApiConfig.mjs";

const headers = {Authorization: `Bearer ${apiConfig.token}`};

/**
 * upbit 캔들(분단위) 조회 API URL
 * @type {String}
 */
const GET_CANDLES_MINUTES_API_URL = "https://api.upbit.com/v1/candles/minutes";

/**
 * upbit 캔들(일단위) 조회 API URL
 * @type {String}
 */
 const GET_CANDLES_DAYS_API_URL = "https://api.upbit.com/v1/candles/days";

/**
 * 캔들(분단위) 조회 API 호출
 * @param {String} market 
 * @param {String} to date string (ex: yyyy-MM-dd HH:mm:ss) 
 * @param {Number} count 최대 200 
 * @param {Number} unit 분 단위 (1,3,5,15,10,30,60,240)
 * @returns 
 */
export const getCandleForMinutes = async (market, to, count, unit) => {
    try {
        const result = await axios.get(`${GET_CANDLES_MINUTES_API_URL}/${unit}`, { 
            headers,
            params: {
                market,
                to,
                count
            }
        });    
        // console.debug("GET Candles Minute Response: ", result.data);
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * 캔들(일단위) 조회 API 호출
 * @param {String} market 
 * @param {String} to date string (ex: yyyy-MM-dd HH:mm:ss) 
 * @param {Number} count 
 * @returns 
 */
export const getCandleForDays = async (market, to, count) => {
    try {
        const result = await axios.get(GET_CANDLES_DAYS_API_URL, { 
            headers,
            params: {
                market,
                to,
                count
            }
        });    
        // console.debug("GET Candles Minute Response: ", result.data);
        return result.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
