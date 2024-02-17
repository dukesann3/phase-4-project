
let object = {
    a: "a",
    b: "b",
    c : [
        {d: "d"},
        {e: "e"}
    ]
};

//change letter d to 'hello world'
let value = "hello world";

for(const property in object){
    if(property == "c"){
        for(let i = 0; i < object[property].length; i++){
            const element = object[property][i]
            if(element.d == "d"){ 
                element.d = value
            }
        }
    }
}

console.log(object);