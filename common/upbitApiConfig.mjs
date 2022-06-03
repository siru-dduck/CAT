import { v4 } from "uuid";
import jsonwebtoken from "jsonwebtoken";

const { ACCESS_KEY, SECRET_KEY } = process.env;

const payload = {
    access_key: ACCESS_KEY,
    nonce: v4()
}

/**
 * upbit API 인증에 사용되는 암호화된 jwt 토큰 
 * @type {String}
 */
const token = jsonwebtoken.sign(payload, SECRET_KEY);

/**
 * upbit 거래(매수,매도) 수수료
 * @type {Number}
 */
const FEE = 0.0005;

const config = {
    token,
    FEE
};

export default config;