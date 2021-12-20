export function replacePolishAccents(value) {
    const tempVal = Array.from(value);
    const accents = {
        ą: '%C4%85',
        ć: '%C4%87',
        ę: '%C4%99',
        ń: '%C5%84',
        ł: '%C5%82',
        ó: '%C3%B3',
        ś: '%C5%9B',
        ź: '%C5%BA',
        ż: '%C5%BC',
        Ą: '%C4%84',
        Ć: '%C4%86',
        Ę: '%C4%98',
        Ł: '%C5%81',
        Ń: '%C5%83',
        Ó: '%C3%93',
        Ś: '%C5%9A',
        Ź: '%C5%B9',
        Ż: '%C5%BB',
    };

    for (const [k, v] of Object.entries(accents)) {
        if (tempVal.includes(k)) {
            console.log('el ', k);
            console.log(Object.values(k));
            return value.replace(k, v);
        }
    }
    return value;
}

// console.log(replacePolishAccents('ósmoklasisty'));
// console.log(replacePolishAccents('ŻÓŁTY'));
