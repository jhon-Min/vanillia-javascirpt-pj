
const time = document.getElementById('time');
const date = document.getElementById('date');

let showTime = () => {

    let now = new Date();

//============= Date Section ================ 
    let day = now.getDay();
    let dt = now.getDate();
    let moh = now.getMonth();
    let year = now.getFullYear();
    
     const dateTp =
     `
         <span>${day}</span> ,
         <span id="months">Default</span>
         <span>${dt}</span> ,
         <span>${year}</span>
     `;
    
    date.innerHTML = dateTp;

    const months = document.getElementById('months');
    const dayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    dayArr.map(dy => {
        if (dy === dayArr[day]) {
            date.firstElementChild.textContent = dy;
        }
    });
 
     monthArr.map((month) => {
         if (month === monthArr[moh]) {
             months.textContent = month;
         } 
     });


//============= Time Section ================
    let hour = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();
    let peFormat;

    
    if (hour < 12) {
        peFormat = 'AM'
    } else if ( hour == 12) {
        peFormat = 'PM';
    }else if (hour > 12) {
        hour = hour - 12;
        peFormat = 'PM';
    }

    const timeTp =
    `
        <span>${hour}</span> :
        <span>${min}</span> :
        <span>${sec}</span>
        <span class="period ml-2">${peFormat}</span>
    `;

    time.innerHTML = timeTp;

};

setInterval(showTime, 1000);