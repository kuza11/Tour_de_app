
const data = require("../data/data.json");

let obj = data;
let x;
export function getData(){
    return obj;
}
export function start(){
    x = setInterval(() =>{
        obj.a.b++
    },1000)
}