const fs = require('fs').promises;

const fileReader = async  (filePath) =>  {
    fs.open(filePath, 'r', (err, fd) => {
        fs.read(fd, (err, bytes, buffer) => {
            console.log(buffer.toString());
                })
    });
};


const checkContent = async () => {
    const data = await fileReader("./bitcoin_p1.txt", "utf-8")
    console.log(data);
}

checkContent()


const fileWriter = (filePath, data) => {
    fs.writeFile(filePath, data, (err) => {
        if (err) throw err;
    })
}
