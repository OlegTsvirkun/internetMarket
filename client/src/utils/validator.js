export const Validator = (e) => {
    let value = e?.target?.value || " ";
    switch (e?.target?.type || " ") {
        case "text":
            let reText = /^[a-zA-ZА-Яа-я]+$/;
            if (!reText.test(String(value).toLowerCase().trim())) {
                return "Поле должно содержать только буквы";
            } else {
                return false;
            }
        case "email":
            let reEmail =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!reEmail.test(String(value).toLowerCase().trim())) {
                return "Некорректный e-mail";
            } else {
                return false;
            }
        case "tel":
            let reTel = /^\+?([0-9]{12})$/;
            if (!reTel.test(String(value).trim())) {
                return "Некорректный телефон, должен быть  в формате: +380123456789";
            } else {
                return false;
            }
        case "number":
            let reNum = /[0-9]/;
            if (!reNum.test(String(value).trim())) {
                return "Только цифры";
            } else {
                return false;
            }
        default:
            return false;
    }
};