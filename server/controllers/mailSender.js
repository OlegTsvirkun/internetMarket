const nodemailer = require('nodemailer');

const mailSender = async (countOfOrder,status,totalPrice, userInfo, orderedGoods, deliveryInfo,contacts) => {
    try{
        let res = `
        <h2>Дякуємо Вам за те що скористувались нашим інтернет-магазином "AppStore" ${userInfo.name}</h>
        <p>Ваше замовлення номер: ${countOfOrder + 1} від ${new Date().toLocaleString()}</p>
        <p>Статус замовлення: ${status}</p>
        `;
        let text = `Дякуємо Вам за те що скористувались нашим інтернет-магазином "AppStore" ${userInfo.name}. Ваше замовлення номер: ${countOfOrder + 1} від ${new Date().toLocaleString()}.Статус замовлення: ${status}`
        for (let i = 0; i < orderedGoods.length; i++) {
            res += `<p>${orderedGoods[i].name} </p>
            <h4>Кількість: ${orderedGoods[i].count}</h4>
            <h4>Ціна: ${orderedGoods[i].price} грн.</h4>
            <h2>Разом: ${orderedGoods[i].count * orderedGoods[i].price} грн.</h2>`
            text += `Товар: ${orderedGoods[i].name}, кількість: ${orderedGoods[i].count}, ціна: ${orderedGoods[i].price}  грн.,  разом: ${orderedGoods[i].count * orderedGoods[i].price} грн.`
        }
    
        res += `<p><h2>Загальна вартість: ${totalPrice} грн.<h2/></p>`
        text += `Загальна вартість: ${totalPrice} грн.`
        res += `<p>${deliveryInfo.delivery}</p>
                <p>${deliveryInfo?.city || ''} ${deliveryInfo?.street || ''} ${deliveryInfo?.house || ''} ${deliveryInfo?.litHouse || ''}  ${deliveryInfo?.appartment || ''}</p>
                <p>${deliveryInfo?.postNP || ''}</p>
                <br>
                `
        text += `${deliveryInfo.delivery}
            ${deliveryInfo?.city || ''} ${deliveryInfo?.street || ''} ${deliveryInfo?.house || ''} ${deliveryInfo?.litHouse || ''}  ${deliveryInfo?.appartment || ''}
            ${deliveryInfo?.postNP || ''}
                `
        res += `<p><h3>Наш менеджер зв'яжеться з Вами у найближчий час</h3></p>`
        text += `Наш менеджер зв'яжеться з Вами у найближчий час`
        res += `<h5>Наші контакти: ${contacts.tel.map(t => `<p>${t}<p/>`)} </h5>`
        text += `Наші контакти: ${contacts.tel.map(t => `<p>${t}<p/>`)}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        })
        let mailOptions = {
            from: `<${process.env.EMAIL_USERNAME}>`,
            to: `${process.env.EMAIL_USERNAME}, ${userInfo.email}`,
            subject: 'MyApple Store, замовлення №:' + (countOfOrder + 1),
            text: text,
            html: res,
        }
    
        let info = await transporter.sendMail(mailOptions)
        console.log('MessageSent: %s', info.messageId)
        console.log('MessagePreview: %s', nodemailer.getTestMessageUrl(info))
        return true
    }catch(err){
console.log(err.message)
    }
    
}
module.exports={
    mailSender
}