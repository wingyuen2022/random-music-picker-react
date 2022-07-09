import Invert from 'invert-color';

export const getBackgroundCSSColor = (rand, lightMode) => {
    let r = Math.round((rand*3)*256);
    let g = Math.round((rand*5)*256);
    let b = Math.round((rand*7)*256);
    if (r > 256) {r = r % 256;}
    if (g > 256) {g = g % 256;}
    if (b > 256) {b = b % 256;}
    if (lightMode) {
        r = r + 100;
        g = g + 100;
        b = b + 100;
        if (r > 256) {r = 256;}
        if (g > 256) {g = 256;}
        if (b > 256) {b = 256;}
    }
    return `rgb(${r}, ${g}, ${b})`;
};

export const getTextCSSColor = (rand) => {
    let r = Math.round((rand*3)*256);
    let g = Math.round((rand*5)*256);
    let b = Math.round((rand*7)*256);
    if (r > 256) {r = r % 256;}
    if (g > 256) {g = g % 256;}
    if (b > 256) {b = b % 256;}
    let hex = Invert([r,g,b]);
    r = parseInt( hex.substring( 1, 3 ), 16 );
    g = parseInt( hex.substring( 3, 5 ), 16 );
    b = parseInt( hex.substring( 5, 7 ), 16 );
    return `rgb(${r}, ${g}, ${b})`;
};