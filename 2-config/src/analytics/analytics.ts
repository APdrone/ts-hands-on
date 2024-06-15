//error not for variables of type any
let logged;

//but error for parameter of type any
// function sendAnalytics(data){
function sendAnalytics(data:string){
    console.log(data);
    logged:true;
}

sendAnalytics('The data!');