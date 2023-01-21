export const typeValidator = (e,onlyText=true) => {
    let value = e?.target?.value || " ";
    switch (e?.target?.type || " ") {
        case "text":
            if(onlyText){
            let reText = /^[a-zA-ZА-Яа-яєЄііЇїГг\s'-]+$/;
            if (!reText.test(String(value).toLowerCase().trim())) {
                return "Поле має містити лише літери";
            } else {
                return false;
            }
        }else return false;
        case "email":
            let reEmail =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!reEmail.test(String(value).toLowerCase().trim())) {
                return "Некоректний e-mail";
            } else {
                return false;
            }
        case "tel":
            let reTel = /^\+?([0-9]{12})$/;
            if (!reTel.test(String(value).trim())) {
                return "Некоректний телефон має бути у форматі: +380123456789";
            } else {
                return false;
            }
        // case "number":
        //     let reNum = /[0-9]/;
            
        //     if (!reNum.test(String(value).trim())) {
        //         return "Тільки цифри";
        //     } else {
        //         return false;
        //     }
        default:
            return false;
    }
};

export const valueValidator=(e,onlyText=true, minValue = 3, maxValue = 40, empty=false) => {
   
    let obj = {}
    if (e.target.value.length < 1 && empty==false) {
       return obj = { ["Поле не може бути порожнім"]: true };
    } else if (e.target.value.length < minValue) {
        return  obj = { [`Поле має бути більше ${minValue} символів`]: true };
    } else if (e.target.value.length > maxValue) {
        return  obj = { [`Поле має бути не більше ${maxValue} символів`]: true };
    } else if (typeValidator(e,onlyText)) {
        return   obj = { [typeValidator(e,onlyText)]: true };
    }else {
        return  obj = {};
    }

}