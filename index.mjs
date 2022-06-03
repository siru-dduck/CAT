/**                                                                                                                                                      
 *
 *                                                                                        
        CCCCCCCCCCCCC               AAA         TTTTTTTTTTTTTTTTTTTTTTT   SSSSSSSSSSSSSSS 
     CCC::::::::::::C              A:::A        T:::::::::::::::::::::T SS:::::::::::::::S
   CC:::::::::::::::C             A:::::A       T:::::::::::::::::::::TS:::::SSSSSS::::::S
  C:::::CCCCCCCC::::C            A:::::::A      T:::::TT:::::::TT:::::TS:::::S     SSSSSSS
 C:::::C       CCCCCC           A:::::::::A     TTTTTT  T:::::T  TTTTTTS:::::S            
C:::::C                        A:::::A:::::A            T:::::T        S:::::S            
C:::::C                       A:::::A A:::::A           T:::::T         S::::SSSS         
C:::::C                      A:::::A   A:::::A          T:::::T          SS::::::SSSSS    
C:::::C                     A:::::A     A:::::A         T:::::T            SSS::::::::SS  
C:::::C                    A:::::AAAAAAAAA:::::A        T:::::T               SSSSSS::::S 
C:::::C                   A:::::::::::::::::::::A       T:::::T                    S:::::S
 C:::::C       CCCCCC    A:::::AAAAAAAAAAAAA:::::A      T:::::T                    S:::::S
  C:::::CCCCCCCC::::C   A:::::A             A:::::A   TT:::::::TT      SSSSSSS     S:::::S
   CC:::::::::::::::C  A:::::A               A:::::A  T:::::::::T      S::::::SSSSSS:::::S
     CCC::::::::::::C A:::::A                 A:::::A T:::::::::T      S:::::::::::::::SS 
        CCCCCCCCCCCCCAAAAAAA                   AAAAAAATTTTTTTTTTT       SSSSSSSSSSSSSSS   
                                                                                          
 * @author {siru dduck}
 * @description 가상화폐 자동매매 시스템 (cryprocurrency automation trading system)
*/

'use strict'
import "./init.mjs";
import { runBreakThroughVloatilityStrategy } from "./service/autoTrading/breakThroughVolatilityStrategy.mjs";
import "./webapp.mjs"; 

/**
 *   _____         _      ___                 
 * |_   _|       | |    / _ \                
 *   | | ___  ___| |_  / /_\ \_ __ ___  __ _ 
 *   | |/ _ \/ __| __| |  _  | '__/ _ \/ _` |
 *   | |  __/\__ \ |_  | | | | | |  __/ (_| |
 *   \_/\___||___/\__| \_| |_/_|  \___|\__,_|
 *                                           
 *  api test를 위한 공간                                                                               
 */

// import { getAccount } from "./upbit/accout/AccountApi.mjs";
// import { getMarket } from "./upbit/quotation/MarketApi.mjs";₩
// import { getCandleForMinutes } from "./upbit/quotation/cadleApi.mjs";
import { runRsiTrade } from "./service/autoTrading/rsiStrategy.mjs";

// getAccount();
// getMarket();
// getCandleForMinutes("KRW-BTC", new Date(Date.now()), 200, 1);
// runRsiTrade();
runBreakThroughVloatilityStrategy();