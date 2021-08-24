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
var form = document.querySelector('#main');
var btnTrash = document.querySelector('.main__products__product--actions--trash');
form.addEventListener('submit', addProductOnDom);
function addProductOnDom(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, description, image, quantity, price, store, addNewProduct, response, ok, allProducts;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ev.preventDefault();
                    _a = ev.target.elements, name = _a.name, description = _a.description, image = _a.image, quantity = _a.quantity, price = _a.price;
                    name = isNaN(name.value) ? name.value : parseInt(name.value);
                    description = isNaN(description.value) ? description.value : parseInt(description.value);
                    image = image.value;
                    quantity = quantity.valueAsNumber;
                    price = price.valueAsNumber;
                    store = location.search.substr(1).split("=")[2];
                    addNewProduct = {
                        name: name,
                        description: description,
                        image: image,
                        quantity: quantity,
                        price: price,
                        store: store
                    };
                    return [4 /*yield*/, addProductPromise(addNewProduct, store)];
                case 1:
                    response = _b.sent();
                    ok = response.ok, allProducts = response.allProducts;
                    alert(ok);
                    renderAllProducts(allProducts);
                    bgModal.classList.remove('bg-active');
                    return [2 /*return*/];
            }
        });
    });
}
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var store, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = location.search.substr(1).split("=")[2];
                    return [4 /*yield*/, axios.get("/store/getStore/" + store)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    if (data.allStores)
                        renderAllProducts(data.allStores.allProducts);
                    return [2 /*return*/];
            }
        });
    });
}
function renderAllProducts(allProducts) {
    var html = "";
    var rootProducts = document.querySelector('#rootProducts');
    console.log(allProducts);
    allProducts.forEach(function (products) {
        html += "\n        <div class=\"main__products\">\n                     <div class=\"main__products__product\">\n                     <img src=\"" + products.image + "\" alt=\"" + products.name + "\"  style = \"width:200px; height:200px\">\n                         <div class = \"main__products__product--name\">\n                             <span>" + products.name + " - " + products.description + "</span>\n                         </div>\n                         <div class=\"main__products__product--numbers\">\n                             <span>Stock: " + products.quantity + "</span>\n                             <span>\u20AA " + products.price + "</span>\n                         </div>\n                         <div class=\"main__products__product--actions\">\n                         <i class=\"fas fa-user-edit main__products__product--actions--edit\" onclick='editProduct(\"" + products.id + "\")'></i>\n                         <i class=\"fas fa-trash main__products__product--actions--trash\" onclick='deleteProduct(\"" + products.id + "\")'></i> \n                         </div>\n                     </div>\n        </div>\n                 ";
    });
    rootProducts.innerHTML = html;
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!confirm("Do you want to delete this product?")) return [3 /*break*/, 2];
                    alert('Delete product');
                    return [4 /*yield*/, axios["delete"]("product/deleteProduct/" + id)];
                case 1:
                    _a.sent();
                    getAllProducts();
                    return [3 /*break*/, 3];
                case 2:
                    alert('Delete Cancelled!');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    alert(e_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function editProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
