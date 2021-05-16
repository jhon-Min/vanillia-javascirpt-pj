// let input = document.getElementById("input")
// let from = document.getElementById("from");
// let to = document.getElementById("to");

// function toNum(x) {
//     return Number(x.replace(",", ""));
// }

// function createOption(a,b,c) {
//     let list = document.createElement("option");
//     let item = document.createTextNode(b);
//     list.setAttribute("value", toNum(c));
//     list.appendChild(item);
//     a.appendChild(list);

// }

// for (x in data.rates) {
//     createOption(from, x, data.rates[x]);
//     createOption(to, x, data.rates[x]);
// }

// document.getElementById("run").addEventListener("submit", function (e) {
//     e.preventDefault();

//     let a = input.value;
//     let b = from.value;
//     let c = to.value;
//     console.log(a, b, c);

// })


let result = document.getElementById("result");
let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let hisList = document.getElementById("history-list");



function createOption(x, y, z){
    let list = document.createElement("option");
    let txt = document.createTextNode(y);
    list.appendChild(txt);
    list.setAttribute("value", z);
    x.appendChild(list);
};

function toNum(x) {
    return Number(x.replace(",", ""));
}

for (x in data.rates) {
    createOption(from, x, toNum(data.rates[x]));
    createOption(to, x, toNum(data.rates[x]))
    // console.log(x, data.rates[x]);
};

  //Create Table List
  function createList(x) {
      let tr = document.createElement("tr");
      x.map(function (el) {
          let td = document.createElement("td");
          let text = document.createTextNode(el);
          td.appendChild(text);
          tr.appendChild(td);
          tr.classList.add("tr-list");
      });
      hisList.appendChild(tr);
  }

document.getElementById("calc").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Input
    let x = input.value;
    let y = from.value;
    let z = to.value;
    
    // process 
    let fromCur = `${x} ${from.options[from.selectedIndex].innerText}`;
    let toCur = to.options[to.selectedIndex].innerText;
    let first = x * y;
    let second = first / z;
    let secResult = second.toFixed(2);
    let date = new Date().toLocaleString();
    let tableList = [date, fromCur, toCur, secResult];
    createList(tableList);
    
    //Output
    result.innerText = secResult; 

    input.value = "";
    input.focus();
    from.value = "";
    to.value = 1;

});


