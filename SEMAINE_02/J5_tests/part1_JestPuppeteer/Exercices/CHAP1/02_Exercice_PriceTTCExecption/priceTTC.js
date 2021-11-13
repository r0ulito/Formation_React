

const priceTTC = (price, tva = .2) => {

    if ( isNaN(price) === true || isNaN(tva) === true ) { 
        throw new Error( "Price is not a number" );
    }

    return price * (1 + tva);
}

const priceHT_TTC = (price, tva = .2) => {

    return { 
        ht: price, 
        ttc: priceTTC(price, tva) 
    };
}

module.exports = {
    priceTTC: priceTTC,
    priceHT_TTC : priceHT_TTC
}