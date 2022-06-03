import config from "../../common/upbitApiConfig.mjs";
import { getCandleForDays, getCandleForMinutes } from "../../upbit/quotation/cadleApi.mjs";

/**
 * 디폴트 K 값
 * @type {Number}
 */
const DEFAULT_FIXED_K = 0.35;

/**
 * 변동성 돌파전략 목표가를 계산하는 함수
 * @param {Candle} candle  
 * @param {Number} k 변동성 돌파전략 계산에 사용될 k값                  
 * @returns 
 */
const getTargetPrice = (currentCandle, previousCandle, k) => {
    return currentCandle.opening_price + ((previousCandle.high_price - previousCandle.low_price) * k);
}

const backTesting = (candles) => {
    const ascCandles = candles.reverse();
    const earningRateList = [];
    
    for(let k = 0.4; k <= 0.6; k = +(k + 0.01).toFixed(12)) {
        let equity = 10000;
        for(let i = 1; i < ascCandles.length; i++) {
            const currentCandle = ascCandles[i];
            const previousCandle = ascCandles[i-1];
            const targetPrice = getTargetPrice(currentCandle, previousCandle, k);
    
            if(targetPrice >= currentCandle.high_price ) {
                continue;
            }
        
            // console.log("=============================");
            // console.log(ascCandles[i], ascCandles[i-1]);
            // console.log(`${targetPrice}원에 구매 `); 
            const margin = (currentCandle.trade_price * (1 - config.FEE)) - (targetPrice * (1 + config.FEE));
            const earningRate = 1 + (margin / (targetPrice * (1 + config.FEE)));
            // console.log(1 + ( (currentCandle.trade_price - targetPrice) / targetPrice) );    
            // console.log(earningRate);
            equity *= earningRate;
            // console.log("=============================");
        }
        earningRateList.push({ k,  earningRate: equity/10000 });
    }
    earningRateList.sort((a,b) => a.earningRate - b.earningRate);
    console.log(earningRateList);
}

/**
 * 변동성 돌파 전략 거래 함수
 */
export const runBreakThroughVloatilityStrategy = async () => {
    const candles = await getCandleForDays("KRW-FCT2", new Date(), 30); // 시간순으로 내림차순으로 데이터가 내려온다. 주의하고 ordering 할것
    backTesting(candles);
    console.log(candles.length, candles[0], candles[candles.length-1]);
}