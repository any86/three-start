const threeOBJ = require("three-obj")();
const fs = require('fs');
threeOBJ.load(
    'female02.obj',
    function (object) {
        fs.writeFileSync('3.obj', JSON.stringify(object));
    }
);
