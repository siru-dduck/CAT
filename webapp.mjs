import express from "express";
import { getCandleForMinutes } from "./upbit/quotation/cadleApi.mjs";
import { getMarket } from "./upbit/quotation/MarketApi.mjs";
import { getTicker } from "./upbit/quotation/tickerApi.mjs";

const PORT = process.env.SERVER_PORT;
const app = express();

app.get('/upbit/market/all', async (_, res) => {
    const marketResponse = await getMarket();
    res.json(marketResponse);
});

app.get('/upbit/ticker', async (req, res) => {
    const marketResponse = await getTicker(req.query.markets);
    res.json(marketResponse);
});

app.get('/upbit/candles/minutes/:unit', async (req, res) => {
    const  { market, count } = req.query;
    const { unit } = req.params;
    let { to } = req.query;

    if(!to || to.length <= 0) {
        to = new Date(Date.now()).toISOString();
    }
    const candleResponse = await getCandleForMinutes(market, to, count, unit);
    res.json(candleResponse);
});

app.listen(PORT, () => {
    console.log(`✅ Server Listen on port:${PORT}`);
});