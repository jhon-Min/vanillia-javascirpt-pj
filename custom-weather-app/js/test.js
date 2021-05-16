// const str = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
// console.log(str);

const timeZone = () => {
    const zone = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
    console.log(zone);   
    let h = new Date().getHours();
    console.log(h);
};

console.log(timeZone());