const a = 72;        //
const b = 87;        //
const c = a ^ b

console.log(c); //
// expected output: 6

console.log(a ^ c);
// Expected b = 30

console.log (b ^ c);
// Expected a = 5

const textToBuffer = (str = '') => {
    const buff = Buffer.from(str, "utf-8");
    return buff
};
console.log(textToBuffer("Hello"))
console.log(typeof (textToBuffer("Hello")));
console.log(textToBuffer("Hello").length)


function xorParityStore(a, b){
    let inputA = textToBuffer(a);
    let inputB = textToBuffer(b);
    let result = []

    inputA.forEach((element, index) => {
        let xorOperation = (element ^ inputB[index]);
        result.push(xorOperation)
        console.log(element, inputB[index], xorOperation);
    });
    const result_Buffer = Buffer.from(result, "utf-8");
    return result_Buffer;

}

const concat = (xorParityStore("Hello", "World"))
console.log(concat)

function xorParityRestore(parityFile, availableFile){
    let inputF = textToBuffer(availableFile);
    let result = []

    inputF.forEach((element, index) => {
        let xorOperation = (element ^ parityFile[index]);
        result.push(xorOperation)
    });
    const result_Buffer = Buffer.from(result, "utf-8");
    return result_Buffer;
}

const restored = xorParityRestore(concat, "World").toString()
console.log(restored)

console.log(restored === "Hello");
