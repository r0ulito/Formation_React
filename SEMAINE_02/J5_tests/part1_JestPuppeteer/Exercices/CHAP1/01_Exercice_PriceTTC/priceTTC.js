

const priceTTC = (price, tva = .2) => {

    if ( isNaN(price) === true ||  isNaN(tva) === true ) throw "Price is not a number";

    return price * (1 + tva);
}

const priceHT_TTC = (price, tva = .2) => {

    if ( isNaN(price) === true ||  isNaN(tva) === true ) throw "Price is not a number";

    return { 
        ht: price, 
        ttc: priceTTC(price) 
    };
}

module.exports = {
    priceTTC: priceTTC,
    priceHT_TTC : priceHT_TTC
}