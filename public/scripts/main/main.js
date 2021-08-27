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
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var h1, title, store, capitalizeStore, responseAllProducts, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    h1 = document.querySelector('.h1');
                    title = document.getElementsByTagName('title');
                    store = location.search.substr(1).split("=")[2];
                    capitalizeStore = store.charAt(0).toUpperCase() + store.slice(1);
                    h1.innerText = "Welcome to the " + capitalizeStore + " Store";
                    title[0].innerHTML = capitalizeStore + " Store";
                    return [4 /*yield*/, axios.get("/store/getStore/" + store)];
                case 1:
                    responseAllProducts = _a.sent();
                    data = responseAllProducts.data;
                    if (data.allStores)
                        renderAllProducts(data.allStores.allProducts);
                    return [2 /*return*/];
            }
        });
    });
}
function renderAllProducts(allProducts) {
    return __awaiter(this, void 0, void 0, function () {
        var html, rootProducts, btnAdd, responseUser, role, addCart;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    html = "";
                    rootProducts = document.querySelector('#rootProducts');
                    btnAdd = document.querySelector('.btn-add');
                    return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    role = responseUser.data.user.role;
                    if (role === 'admin') {
                        btnAdd.style.display = 'block';
                    }
                    else {
                        btnAdd.style.display = 'none';
                        html += "<div>\n                <span>Carrito<i class=\"fas fa-shopping-cart\"></i><span>\n                <span class=\"addCart\" style=\"color:brown\">0</span>  \n                <button onclick='toCarrito(event)'>See Cart</button>\n                </div>\n                <div class=\"main__products\">";
                    }
                    allProducts.forEach(function (products) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(products.quantity == 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, axios["delete"]("product/deleteProduct/" + products.id)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    html += "\n                <div class=\"main__products__product\" >\n                     <img src=\"" + products.image + "\" alt=\"" + products.name + "\" style = \"width:200px; height:200px\" onclick='sendProduct(\"" + products.id + "\")'>\n                         <div class = \"main__products__product--name\">\n                             <span>" + products.name + " - " + products.description + "</span>\n                         </div>\n                         <div class=\"main__products__product--numbers\">";
                                    if (role === 'admin') {
                                        html += "<span class=\"stock\">Stock: " + products.quantity + "</span>";
                                    }
                                    else {
                                        html += "<span>Count: <input type=\"number\" id=\"" + products.id + "\" name=\"countproducts\" value=\"1\" min=\"1\" max=\"" + products.quantity + "\">";
                                    }
                                    html += "<span>\u20AA " + products.price + "</span>\n                         </div>\n                         <div class=\"main__products__product--actions\">\n                        \n                         ";
                                    if (role === 'admin') {
                                        html += "  <i class=\"fas fa-user-edit main__products__product--actions--edit\" onclick='findProduct(\"" + products.id + "\")'></i>\n                          <i class=\"fas fa-trash main__products__product--actions--trash\" onclick='deleteProduct(\"" + products.id + "\")'></i> ";
                                    }
                                    else {
                                        html += "<button class=\"btnadduser" + products.id + "\" onclick='addProductCart(\"" + products.id + "\",\"" + products.name + "\",\"" + products.description + "\",\"" + products.image + "\",\"" + products.price + "\")'>Add Cart</button>\n                    <button class= 'btnedituser" + products.id + "' onclick='editQuantityCart(\"" + products.id + "\")' hidden >Edit Quantity</button>";
                                    }
                                    html += "</div></div>";
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    rootProducts.innerHTML = html;
                    if (role === 'public') {
                        addCart = document.querySelector('.addCart');
                        addCart.innerText = "" + responseUser.data.user.cart.length;
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function sendProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            store = location.search.substr(1).split("=")[2];
            window.location.href = "product.html?id=" + id + "?store=" + store;
            return [2 /*return*/];
        });
    });
}
//Read URL
function readURL(input) {
    var image = document.querySelector('#img');
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                image.setAttribute("src", "" + e.target.result);
            }
            catch (error) {
                console.error(error);
            }
            return e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
function toCarrito(event) {
    event.preventDefault();
    window.location.href = 'cart.html';
}
