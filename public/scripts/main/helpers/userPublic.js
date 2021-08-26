var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var count = 0;
function addProductCart(id, name, description, image, price) {
    return __awaiter(this, void 0, void 0, function () {
        var pathBtnEdit, pathBtnAdd, btnAddUser, btnEditUser, inputCount, number, addCart, total, addCartForNow, responseUser, idUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pathBtnEdit = ".btnedituser" + id;
                    pathBtnAdd = ".btnadduser" + id;
                    btnAddUser = document.querySelector(pathBtnAdd);
                    btnEditUser = document.querySelector(pathBtnEdit);
                    btnEditUser.hidden = false;
                    btnAddUser.hidden = true;
                    inputCount = document.getElementById("" + id);
                    number = inputCount.value;
                    addCart = document.querySelector('.addCart');
                    count++;
                    addCart.innerText = "" + count;
                    total = +number * price;
                    addCartForNow = {
                        id: id,
                        name: name,
                        description: description,
                        image: image,
                        price: price,
                        number: number,
                        total: total
                    };
                    return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    idUser = responseUser.data.user.id;
                    return [4 /*yield*/, addCartPromise(addCartForNow, idUser)
                        //validar si ya elijio ese producto
                    ];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function editQuantityCart(id) {
    return __awaiter(this, void 0, void 0, function () {
        var inputCount, newNumber, responseUser, idUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputCount = document.getElementById("" + id);
                    newNumber = {
                        number: inputCount.value
                    };
                    return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    idUser = responseUser.data.user.id;
                    return [4 /*yield*/, editCartPromise(idUser, id, newNumber)];
                case 2:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
//clousures
function addCartPromise(addCartForNow, idUser) {
    return new Promise(function (resolve, reject) {
        fetch("/user/addCartForNow/" + idUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addCartForNow)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (user) { resolve(user); });
            }
            else {
                return res.json().then(function (user) { swal('Oops!', "" + user.error, "error"); });
            }
        });
    });
}
function editCartPromise(idUser, idProduct, newNumber) {
    return new Promise(function (resolve, reject) {
        fetch("/user/editCartNow/" + idUser + "/" + idProduct, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNumber)
        }).then(function (res) {
            if (res.status === 200 && res.ok) {
                return res.json().then(function (user) { resolve(user); });
            }
            else {
                return res.json().then(function (user) { swal('Oops!', "" + user.error, "error"); });
            }
        });
    });
}
