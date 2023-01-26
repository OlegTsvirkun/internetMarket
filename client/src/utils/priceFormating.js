export const priceFormating = (number) => {
    if (number && !number.isNaN) {
        return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ') + ' '
    };
}