function stringToBinary(input) {
    var characters = input.split('');

    return characters
        .map(function(char) {
            return char.charCodeAt(0).toString(10).padStart(8, 0)
        })
        .join(' '); // show with space for each byte
                    // watch leading zero, which is missed in the former code
}

console.log(stringToBinary('test'));