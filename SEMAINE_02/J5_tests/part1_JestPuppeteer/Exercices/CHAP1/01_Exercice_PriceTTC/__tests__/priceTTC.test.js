const { priceHT_TTC, priceTTC } = require('../priceTTC');

describe("test du module priceTTC", () => {

    const priceHT = [
        100,
        120,
        78,
        80,
        11.7,
        20.9
    ];

    let resultHT_TTC = [];

    // avant chaque test
    beforeEach(() => {
        for (let p of priceHT) {
            resultHT_TTC.push({ ht: p, ttc: p * 1.2 });
        }

    });

    // après chaque test
    afterEach(() => {
        resultHT_TTC = [];

        console.log("after each");
    });

    // Isolation du test pour éviter les effets bords
    test("price HT to TTC", () => {

        expect(priceTTC(100)).toBe(120);

    });

    test("price HT to TTC with array", () => {

        for (let { ht, ttc } of resultHT_TTC)
            expect(priceTTC(ht)).toBe(ttc);

    });

    test("test de la fonction priceHT_TTC", () => {

        for (let p of priceHT)
            expect(priceHT_TTC(p)).toEqual({
                ht: p,
                ttc: priceTTC(p)
            });
    });

    // tester les exceptions
    test("priceTTC is not a number Exception", () => {
        expect( () => priceTTC("Bonjour") ).toThrow("Price is not a number");
    });

    test("priceHT_TTC is not a number Exception", () => {
        expect( () => priceHT_TTC("Bonjour") ).toThrow("Price is not a number");
    });

    test("Price is not a number Exception tva", () => {
        expect( () => priceHT_TTC(100, "Bonjour tout le monde") ).toThrow("Price is not a number");
    });



    test("test with before/after 1/2", () => {

        resultHT_TTC['total'] = 0;
        let total = 0; 
        for (let res of resultHT_TTC) {
            expect(priceTTC(res.ht)).toEqual(res.ttc);
            resultHT_TTC.total += priceTTC(res.ht);
            total += res.ht * 1.2;
        }

       expect(resultHT_TTC.total).toEqual(total);

       console.log(resultHT_TTC); // muté

    });


    test("before/after", () => {
        console.log(resultHT_TTC);

        expect(true).toEqual(true);
    })
});