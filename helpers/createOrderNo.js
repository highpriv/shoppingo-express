const Orders = require("../model/Orders");

function createRandomOrderNo() {

let passedCode;
let isPassed = false;

const generateNo = () => {

    let orderNo = "";


    while (orderNo.length < 6) {

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomChar = characters.charAt(Math.random() * 36)
        orderNo = orderNo + randomChar;
    }

    return orderNo;
}


while (!isPassed) {
  const generatedOrderNo = generateNo();
  const findOrder = Orders.findOne({orderCode: generatedOrderNo})
  const isExistsOrder = findOrder.count() > 0
  if(isExistsOrder) isPassed = false
  else isPassed = true, passedCode = generatedOrderNo;
}

return passedCode;


}

module.exports = {createRandomOrderNo};
