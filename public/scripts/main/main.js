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
var btnOpenModalToEdit = document.querySelector('.main__products__product--actions--edit');
var btnEdit = document.querySelector('.btn-edit');
var inputSearch = document.querySelector('#search');
form.addEventListener('submit', addProductOnDom);
btnEdit.addEventListener('click', editProduct);
inputSearch.addEventListener('keyup', searchProduct);
//
var idProduct;
function addProductOnDom(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var store, _a, name, description, image, quantity, price, addNewProduct, response, ok, allProducts;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ev.preventDefault();
                    store = location.search.substr(1).split("=")[2];
                    _a = ev.target.elements, name = _a.name, description = _a.description, image = _a.image, quantity = _a.quantity, price = _a.price;
                    name = isNaN(name.value) ? name.value : parseInt(name.value);
                    description = isNaN(description.value) ? description.value : parseInt(description.value);
                    image = "../images/" + store + "/" + image.value.split('\\')[2];
                    quantity = quantity.valueAsNumber;
                    price = price.valueAsNumber;
                    console.log(image);
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
        var h1, title, store, capitalizeStore, response, data;
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
    allProducts.forEach(function (products) {
        html += "\n        <div class=\"main__products\">\n                     <div class=\"main__products__product\" onclick='sendProduct(\"" + products.id + "\")'>\n                     <img src=\"" + products.image + "\" alt=\"" + products.name + "\" style = \"width:200px; height:200px\">\n                         <div class = \"main__products__product--name\">\n                             <span>" + products.name + " - " + products.description + "</span>\n                         </div>\n                         <div class=\"main__products__product--numbers\">\n                             <span>Stock: " + products.quantity + "</span>\n                             <span>\u20AA " + products.price + "</span>\n                         </div>\n                         <div class=\"main__products__product--actions\">\n                        \n                         </div>\n                     </div>\n                     <i class=\"fas fa-user-edit main__products__product--actions--edit\" onclick='findProduct(\"" + products.id + "\")'></i>\n                     <i class=\"fas fa-trash main__products__product--actions--trash\" onclick='deleteProduct(\"" + products.id + "\")'></i> \n        </div>\n                 ";
    });
    rootProducts.innerHTML = html;
}
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!confirm("Do you want to delete this product?")) return [3 /*break*/, 2];
                    return [4 /*yield*/, axios["delete"]("product/deleteProduct/" + id)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    alert(data.ok);
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
function findProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var bgModal, btnModalInput, response, data, image, inputName, inputDescription, inputStock, inputPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bgModal = document.querySelector('.modal-bg');
                    btnModalInput = document.querySelector('.btn-modal');
                    bgModal.classList.add('bg-active');
                    btnEdit.style.display = 'block';
                    btnModalInput.style.display = 'none';
                    return [4 /*yield*/, axios.get("product/getProduct/" + id)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    image = document.querySelector('#img');
                    image.setAttribute("src", "" + data.Product.image);
                    inputName = document.querySelector('#name');
                    inputDescription = document.querySelector('#description');
                    inputStock = document.querySelector('#quantity');
                    inputPrice = document.querySelector('#price');
                    inputName.value = data.Product.name;
                    inputDescription.value = data.Product.description;
                    inputStock.value = data.Product.quantity;
                    inputPrice.value = data.Product.price;
                    idProduct = id;
                    return [2 /*return*/];
            }
        });
    });
}
function editProduct() {
    return __awaiter(this, void 0, void 0, function () {
        var inputName, inputDescription, inputStock, inputPrice, inputImage, editProduct, store, response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputName = document.querySelector('#name');
                    inputDescription = document.querySelector('#description');
                    inputStock = document.querySelector('#quantity');
                    inputPrice = document.querySelector('#price');
                    inputImage = document.querySelector('#image');
                    editProduct = {
                        name: inputName.value,
                        description: inputDescription.value,
                        image: inputImage.value,
                        quantity: inputStock.valueAsNumber,
                        price: inputPrice.valueAsNumber
                    };
                    store = location.search.substr(1).split("=")[2];
                    return [4 /*yield*/, axios.put("product/editProduct/" + idProduct + "/" + store, editProduct)];
                case 1:
                    response = _a.sent();
                    data = response.data;
                    alert(data.ok);
                    getAllProducts();
                    bgModal.classList.remove('bg-active');
                    return [2 /*return*/];
            }
        });
    });
}
function searchProduct(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var store, searchProduct, allProductsOnStore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    store = location.search.substr(1).split("=")[2];
                    searchProduct = inputSearch.value;
                    return [4 /*yield*/, axios.get("product/searchProduct/" + store)
                        //ver si existe algun producto
                        //renderProduct()
                    ];
                case 1:
                    allProductsOnStore = _a.sent();
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
