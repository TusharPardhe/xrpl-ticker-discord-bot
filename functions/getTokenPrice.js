const xrpl = require("xrpl");

const getTokenPrice =async ()=> {
    const xrplClient = new xrpl.Client("wss://xrplcluster.com/");

    try {
        await xrplClient.connect();
        const current_ledger = await xrplClient.request({ command: "ledger_current" });
        const last_ledger = current_ledger.result.ledger_current_index - 1;

        const token_offers = await xrplClient.request({
            id: 4,
            command: "book_offers",
            taker: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
            taker_gets: {
                currency: "XRP",
            },
            ledger_index: last_ledger,
            taker_pays: {
                currency: "65646974696F6E73000000000000000000000000",
                issuer: "rfXwi3SqywQ2gSsvHgfdVsyZdTVM15BG7Z",
            },
            limit: 1,
        });

        const last_offer = token_offers.result.offers[0];
        const price = last_offer.TakerGets / 1000000 / last_offer.TakerPays.value;

        xrplClient.disconnect();
        return price.toFixed(6);
        
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = getTokenPrice;
