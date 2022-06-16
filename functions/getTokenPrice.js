const xrpl = require("xrpl");

const getTokenPrice = async () => {
    const xrplClient = new xrpl.Client("wss://xrplcluster.com/");

    try {
        await xrplClient.connect();
        const token_offers = await xrplClient.request({
            id: 4,
            command: "book_offers",
            taker: "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
            limit: 1,
            taker_gets: {
                currency: "65646974696F6E73000000000000000000000000",
                issuer: "rfXwi3SqywQ2gSsvHgfdVsyZdTVM15BG7Z",
            },
            taker_pays: {
                currency: "XRP",
            },
        });

        const last_offer = token_offers.result.offers[0];
        const price = last_offer.TakerPays / 1000000 / last_offer.TakerGets.value;

        xrplClient.disconnect();
        return price.toFixed(6);
    } catch (err) {
        console.log(err);
        return null;
    }
};

module.exports = getTokenPrice;
