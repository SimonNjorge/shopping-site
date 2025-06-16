import dayjs from ' https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function deliveryDateCalculator (deliveryOption) {
    const today = dayjs();
    let dateString;
   // let daysToAdd = deliveryOption.deliveryDays;
   
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    /*
    for(let i = daysToAdd; i > 0; i--){
        if(isWeekend(deliveryDate)) continue;
        deliveryDate =  today.add(1, 'days');
    }
    */
    dateString = deliveryDate.format('dddd, MMMM D');
    return dateString; 
}

function isWeekend(deliveryDate){
    let date = deliveryDate.format('dddd');
    if(date == 'Saturday' || date == 'Sunday') {
        return true;
    }
    return false;
}


