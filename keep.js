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
    const buff = Buffer.from(str, "utf-8");
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
    const result_Buffer = Buffer.from(result, "utf8");
    return result_Buffer;
}


const parityStore = async (filePath1, filePath2, mode = '') => {
    const data1 = await fileReader(filePath1, "utf-8")
    const data2 = await fileReader(filePath2, "utf-8")

    if (mode === 'concat') {
        const parityBackUp = await xor(data1, data2);
        console.log(parityBackUp + "")
        await fileWriter("ParityOutput.txt", parityBackUp);

    } else if (mode === 'xor') {
        const parityRestore = await xor(data1, data2);
        console.log(parityRestore)
        await fileWriter("RestoredBackUp.txt", parityRestore);
    }
}

const checks = async () => {
    const resultBackUp = parityStore("./bitcoin_p1.txt", "./bitcoin_p2.txt", "concat")
    const resultRestore = parityStore("./ParityOutput.txt", "./bitcoin_p1.txt", "xor");
    await resultBackUp;
    await resultRestore

    const backedUp = await fileReader("./RestoredBackUp.txt")
    console.log("Here is the backup: " + backedUp);
    console.log ("here")
    const part2 = await fileReader("./bitcoin_p2.txt")
    console.log(part2)
    console.log(backedUp == part2);
}

checks();
