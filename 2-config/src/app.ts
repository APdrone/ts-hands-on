let appdId = "abc";
const button = document.querySelector("button")!;

//add will give error "Not all code paths return a value."
function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
  return;
}

function clickHandler(message: string) {
  let username = "Max";
  console.log("Clicked!" + message);
}

button.addEventListener("click", clickHandler.bind(null, "adsd"));
