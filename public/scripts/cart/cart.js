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
function getCart(event) {
    return __awaiter(this, void 0, void 0, function () {
        var responseUser, idUser, getProduct, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    idUser = responseUser.data.user.id;
                    return [4 /*yield*/, axios.get("/user/getAllProducts/" + idUser)];
                case 2:
                    getProduct = _a.sent();
                    data = getProduct.data;
                    renderCart(data.cart);
                    return [2 /*return*/];
            }
        });
    });
}
function renderCart(data) {
    var cartRoot = document.querySelector('#cartRoot');
    var html = '';
    if (data.length > 0) {
        html += "<table id=\"cart\">\n        <thead>\n    <tr>\n        <th>Image</th>\n        <th>Name</th>\n        <th>Description</th>\n        <th>Quantity</th>\n        <th>Price</th>\n        <th>Total</th>\n        <th><th>\n    <tr>\n    </thead>\n    <tbody>";
        data.forEach(function (cart) {
            var id = cart.id, name = cart.name, description = cart.description, image = cart.image, number = cart.number, price = cart.price, total = cart.total;
            html += "<tr>\n                      <td> <img src=\"" + image + "\" alt=\"" + name + "\" style = \"width:70px; height:70px\"</td>\n                        <td>" + name + "</td>\n                        <td>" + description + "</td>\n                        <td>" + number + "</td>\n                        <td>" + price + "</td>\n                        <td>" + total + "</td>\n                        <td><i class=\"fa fa-edit\" onclick='editProduct(\"" + id + "\")' title=\"Edit Item\" style=\"cursor:pointer\"></i></td>   \n                        <td><i class=\"fa fa-trash\" onclick='deleteProductOnCart(\"" + id + "\")' title=\"Delete Item\" style=\"cursor:pointer\"></i></td>   \n                 </tr> ";
        });
        html += "</tbody></table>";
    }
    else {
        var html_1 = '';
    }
    cartRoot.innerHTML = html;
}
function deleteProductOnCart(id) {
    return __awaiter(this, void 0, void 0, function () {
        var responseUser, idUser;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    idUser = responseUser.data.user.id;
                    swal({
                        title: "Do you want to delete this product?",
                        text: "Once deleted, you will not be able to recover this imaginary file!",
                        icon: "warning",
                        buttons: {
                            cancel: true,
                            confirm: "Confirm"
                        },
                        dangerMode: true
                    })
                        .then(function (isConfirm) { return __awaiter(_this, void 0, void 0, function () {
                        var response, data, ok, cart;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!isConfirm) return [3 /*break*/, 2];
                                    return [4 /*yield*/, axios["delete"]("/user/deleteProductOnCart/" + id + "/" + idUser)];
                                case 1:
                                    response = _a.sent();
                                    data = response.data;
                                    ok = data.ok, cart = data.cart;
                                    swal("" + ok, "", "success");
                                    renderCart(cart);
                                    return [3 /*break*/, 3];
                                case 2:
                                    swal("Delete Cancelled!", "", "success");
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
