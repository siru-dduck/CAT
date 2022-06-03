import axios from "axios";

const TRADING_INFO_CHANNEL_URL = "https://hooks.slack.com/services/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";
const SYSTEM_ALERT_CHANNEL_URL = "https://hooks.slack.com/services/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";

export const channels = {
    tradeInfo: TRADING_INFO_CHANNEL_URL,
    systemAlert: SYSTEM_ALERT_CHANNEL_URL
}

/**
 * 슬랙으로 메시지를 보내는 함수
 * @param {channels} channel 
 * @param {String} text 
 * @returns 
 */
export const sendMessage = (channelURL, text) => {
    try {
        axios.post(channelURL, { text });
    } catch (error) {
        console.error(error);
    }
}
