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


fileReader("./bitcoin_p1.txt")