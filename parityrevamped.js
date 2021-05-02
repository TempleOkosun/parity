const fs = require("fs");

function fileReader (filePath)  {
    const buffer = new Buffer.alloc(1024);
    console.log("Open existing file");
    fs.open(filePath, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("Reading the file");
        fs.read(fd, buffer, 0, buffer.length,
            0, function (err, bytes) {
                if (err) {
                    console.log(err);
                }
                if (bytes > 0) {
                    console.log(buffer.slice(0, bytes).toString());
                }
                console.log(bytes + " bytes read");

                // Close the opened file.
                fs.close(fd, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("File closed successfully");
                    return buffer;
                });
            });
    });
}

function fileWriter (filePath, data) {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
};


function xor (data1, data2) {
    let inputA = data1;
    let inputB = data2;
    let result = []
    console.log(data1)
    inputA.forEach((element, index) => {
        let xorOperation = (element ^ inputB[index]);
        result.push(xorOperation)
    });
    const result_String = result.toString();
    return result_String;
}


function parityStore (filePath1, filePath2, mode = '') {
    const data1 = fileReader(filePath1, "utf-8")
    console.log(data1)
    const data2 = fileReader(filePath2, "utf-8")

    if (mode === 'concat') {
        const parityBackUp = xor(data1, data2);
        console.log(parityBackUp + "")
        fileWriter("ParityOutput.txt", parityBackUp);

    } else if (mode === 'xor') {
        const parityRestore = xor(data1, data2);
        console.log(parityRestore)
        fileWriter("RestoredBackUp.txt", parityRestore);
    }
}

function checks() {
    const resultBackUp = parityStore("./bitcoin_p1.txt", "./bitcoin_p2.txt", "concat")
    const resultRestore = parityStore("./ParityOutput.txt", "./bitcoin_p1.txt", "xor");
    resultRestore;
    resultBackUp;

    const backedUp = fileReader("./RestoredBackUp.txt")
    console.log("Here is the backup: " + backedUp);
    console.log ("here")
    const part2 = fileReader("./bitcoin_p2.txt")
    console.log(part2)
    console.log(backedUp == part2);
}

checks();
