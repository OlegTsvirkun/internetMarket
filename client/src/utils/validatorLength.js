export const validatorLength= (e, maxValue = 40, minValue = 3) => {
    let obj = {};
    if (e.target.value.length < 1) {
        obj = { ["Поле не может быть пустым"]: true };
    } else if (e.target.value.length < minValue) {
        obj = { [`Поле должно быть больше ${minValue} символов`]: true };
    } else if (e.target.value.length > maxValue) {
        obj = { [`Поле должно быть не больше ${maxValue} символов`]: true };
    } else if (Validator(e)) {
        obj = { [Validator(e)]: true };
    } else {
        obj = {};
    }


    return obj;
};