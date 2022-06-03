import { getCandleForMinutes } from "../../upbit/quotation/cadleApi.mjs";
import ti from "technicalindicators";
import { getTicker } from "../../upbit/quotation/tickerApi.mjs";
import { channels, sendMessage } from "../../alert/slackAlert.mjs";
import { StopWatch } from "stopwatch-node";
import e from "express";

/**
 * RSI 상태
 * @type {String} "low", "middle", "high"
 */
let rsiStatus = null;

/**
 * rsi 계산 함수
 * @param {String} market 
 * @returns 
 */
const calcRsiForMinutes = (candles) => {
    const tradePriceList = candles.map(candle => candle.trade_price).reverse();
    const rsiResult = ti.RSI.calculate({
        values : tradePriceList,
        period : 14
    });

    return rsiResult[rsiResult.length-1];
};

const getRsiStatus = (rsi) => rsi < 30? "low" : rsi >= 70? "high": "middle";

export const runRsiTrade = async () => {
    const candles = await getCandleForMinutes("KRW-BTC", new Date(Date.now()), 50, 1); // 시간순으로 내림차순으로 데이터가 내려온다. 주의하고 ordering 할것
    const rsi = calcRsiForMinutes(candles);    
    rsiStatus = getRsiStatus(rsi); 
    sendMessage(channels.tradeInfo, 
        `👀 KRW-BRC(원화-비트코인) RSI tracker 시작\n📈 현재 RSI Status: ${rsiStatus}\n⏰ 시작시간: ${new Date(Date.now()).toISOString()}`);

    const t = setInterval(async ()=> {
        try {
            const candles = await getCandleForMinutes("KRW-BTC", new Date(Date.now()), 50, 1); // 시간순으로 내림차순으로 데이터가 내려온다. 주의하고 ordering 할것
            const rsi = calcRsiForMinutes(candles);
            console.log(rsi);
            if(rsi < 30) {
                rsiStatus = "low";
            } else if(rsi >= 70) {
                rsiStatus = "high";
            } else {
                if(rsiStatus === "low") {
                    sendMessage(channels.tradeInfo, `👀 KRW-BRC(원화-비트코인) 상향돌파\n
                        📈 현재 RSI Status: ${rsiStatus}\n
                        💰 현재 가격: ${candles[0].trade_price}\n
                        ⏰ 현재 시각: ${new Date(Date.now()).toISOString()}`);
                }
                if(rsiStatus === "high") {
                    sendMessage(channels.tradeInfo, `👀 KRW-BRC(원화-비트코인) 하향돌파\n
                        📈 현재 RSI Status: ${rsiStatus}\n
                        💰 현재 가격: ${candles[0].trade_price}\n
                        ⏰ 현재 시각: ${new Date(Date.now()).toISOString()}`);
                }
                rsiStatus = "middle";
            }
        } catch(error) { }
    }, 500);
    console.log("run task ", t);
};
