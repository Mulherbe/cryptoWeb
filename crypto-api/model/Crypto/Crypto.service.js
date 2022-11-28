const db = require('helper/db');
const ccxt = require('ccxt');

function sleep(millis)
{
    return new Promise(resolve => setTimeout(resolve, millis));
}

var apis = {
    "binance": new ccxt.binance(),
    "coinbase": new ccxt.coinbase(),
    "huobi": new ccxt.huobi(),
    "kraken": new ccxt.kraken(),
    "kucoin": new ccxt.kucoin(),
    "okx": new ccxt.okex()
};

var markets = [];

module.exports = {
    getDefaultFavorites,
    setDefaultFavorites,

    getUserFavorites,
    setUserFavorites,

    getPrice,
    getPrices,

    getMarkets,
    setMarkets,
    updateMarkets
};

/// \brief Check if the exchange exists
/// \param exchange The exchange to check
/// \return true if the exchange exists, false otherwise
function checkExchange(exchange = "binance")
{
    try
    {
        // check if apis contains the exchange
        if (apis[exchange] === undefined || apis[exchange] === null)
            apis[exchange] = new ccxt[exchange]();
        if (apis[exchange] === undefined || apis[exchange] === null)
            return "binance";
        return exchange;
    } catch (err)
    {
        console.log(err);
        return "binance";
    }
}

/// \brief Get the default favorites from the database and return them
/// \return The default favorites
async function getDefaultFavorites()
{
    // get default favorites
    const defaultFavorites = await db.Cryptos.findAll({ where: { isDefault: true } });
    return defaultFavorites;
}

/// \brief Set the default favorites in the database and return them
/// \param favorites The favorites to set
/// \return The default favorites
async function setDefaultFavorites(favorites)
{
    if (!isAdmin())
        return await getDefaultFavorites();
    // get default favorites
    const defaultFavorites = await db.Cryptos.findAll({ where: { isDefault: true } });
    // update defaultFavorites isDefault to false and rank to 0
    defaultFavorites.forEach(favorite =>
    {
        favorite.isDefault = false;
        favorite.rank = 0;
    });
    await defaultFavorites.save();

    // update favorites isDefault to true
    await favorites.forEach(async favorite =>
    {
        var crypto = await db.Cryptos.findOne({ where: { pair: favorite.pair } });
        crypto.isDefault = true;
        crypto.rank = favorite.rank;
        await crypto.save();
    });
    return await db.Cryptos.findAll({ where: { isDefault: true } });
}

/// \brief Get the user favorites from the database and return them
/// \param userId The user id
/// \return The user favorites if the user exists, default values set by the admin otherwise
async function getUserFavorites(userId)
{
    // get user with his favorites
    var userFound = await db.Users.findOne({ where: { id: userId }, include: { model: db.Cryptos, as: "favorites" } });
    if (userFound === null || userFound === undefined || userFound.length === 0)
        return await getDefaultFavorites();
    if (!(userFound.favorites === null || userFound.favorites === undefined || userFound.favorites.length === 0))
        return userFound.favorites;

    var defaultFavorites = await getDefaultFavorites();
    var rank = 0;
    var tmpFavs = [];
    for (var defFav in defaultFavorites)
    {
        defFav.rank = rank;
        rank += 1;
    }

    return userFound.favorites;
}

/// \brief Set the favorites of the user in the database and return them
/// \param userId The user id
/// \param favorites The favorites to set
/// \return The favorites set or the default favorites if: the user doesn't exist or the favorites are empty
async function setUserFavorites(userId, favorites)
{
    // get user with his favorites
    var userFound = await db.Users.findOne({ where: { id: userId }, include: { model: db.Cryptos, as: "favorites" } });

    var isUserNull = userFound === null || userFound === undefined || userFound.length === 0;
    if (isUserNull)
        return await getDefaultFavorites();
    userFound.favorites = [];
    var rank = 0;
    for (var fav in favorites)
    {
        var crypto = await db.Cryptos.findOne({ where: { pair: fav.pair } });
        if (crypto === null || crypto === undefined)
            continue;
        crypto.rank = rank;
        await crypto.save();

        userFound.favorites.push(crypto);
        rank += 1;
    }

    await userFound.save();
    return userFound.favorites;
}

/// \brief Get the price of a crypto
/// \param symbol The symbol of the crypto
/// \param exchange The exchange to get the price from
/// \return The price of the crypto
async function getPrice(symbol, exchange = "binance")
{
    const ccxtExchange = checkExchange(exchange);
    console.log(ccxtExchange);
    const price = await apis[ccxtExchange].fetchTicker(symbol)
    return price;
}

/// \brief Get the prices of a list of cryptos
/// \param symbols The symbols of the cryptos
/// \param exchange The exchange to get the prices from
/// \return The prices of the cryptos
async function getPrices(symbols, exchange = "binance")
{
    const ccxtExchange = checkExchange(exchange);
    const prices = await apis[ccxtExchange].fetchTickers(symbols);
    return prices;
}

/// \brief Get the markets of an exchange in the database and return them
/// \return The markets of the exchange
async function getMarkets()
{
    // get markets
    const tmpMarkets = await db.Cryptos.findAll();
    return tmpMarkets;
}

/// \brief Set the markets of an exchange in the database
/// \return None
async function setMarkets()
{
    var tmpMarkets = await apis["binance"].loadMarkets();
    var totalMarkets = [];
    for (var market in tmpMarkets)
    {
        if (!market.endsWith("USDT")) continue;
        var crypto = await db.Cryptos.findOne({ where: { pair: market } });
        if (crypto === null || crypto === undefined)
        {
            crypto = new db.Cryptos();
            crypto.pair = tmpMarkets[market].symbol;
            await crypto.save();
        }
        totalMarkets.push(crypto);
    }
    markets = totalMarkets;
}

/// \brief Update the markets of an exchange in the database
/// \return None
async function updateMarkets()
{
    while (true)
    {
        try
        {
            await setMarkets();
            await sleep(3600000);
        } catch (err)
        {
            console.log(err);
        }
    }
}