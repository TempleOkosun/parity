const fs = require('fs').promises;

const fileReader = async (filePath, fileFormat) => {
    try {
        const result = await fs.readFile(filePath, fileFormat);
        return result;
    } catch (e) {
        console.error(e);
    }
};


const fileWriter = async (filePath, data, encoding) => {
    await fs.writeFile(filePath, data, encoding, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};


const textToBuffer = (str = '') => {
    const buff = Buffer.from(str, "utf8");
    return buff
};

const xor = async (data1, data2) => {
    let inputA = textToBuffer(data1);
    let inputB = textToBuffer(data2);
    let result = []

    inputA.forEach((element, index) => {
        let xorOperation = (element ^ inputB[index]);
        result.push(xorOperation)
    });
    return result;
}


const parityStore = async (filePath1, filePath2, mode = '') => {
    let fileFormat = "utf8"

    if (mode === 'concat') {
        const data1 = await fileReader(filePath1, fileFormat);
        const data2 = await fileReader(filePath2, fileFormat);
        const twoFiles = [textToBuffer(data1), textToBuffer(data2)];

        const parityBackUp = Buffer.concat(twoFiles);
        await fileWriter("ParityOutput.txt", Buffer.from(parityBackUp, "utf-8"), "utf-8");

    } else if (mode === 'xor') {
        const data1 = await fileReader(filePath1, "binary");
        const data2 = await fileReader(filePath2, fileFormat);

        const parityRestore = await xor(data1, data2);
        const twoFiles = [textToBuffer(data1), textToBuffer(parityRestore)];
        await fileWriter("RestoredBackUp.txt", Buffer.from(parityRestore, "utf-8"), "utf-8");
    }
}

const checks = async () => {

    const resultBackUp = parityStore("./bitcoin_p1.txt", "./bitcoin_p2.txt","concat")
    await resultBackUp;

    const resultRestore = parityStore("./bitcoin_p1.txt", "./ParityOutput.txt", "xor");
    await resultRestore
    
    /*
    const backedUp = await fileReader("./RestoredBackUp.txt")
    console.log("Here is the backup: " + backedUp);
    console.log ("here")
    const part2 = await fileReader("./bitcoin_p2.txt")
    console.log(part2)
    console.log(backedUp == part2);
    */
}

checks();
