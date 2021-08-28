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
var btnReturn = document.querySelector('.btn-return');
btnReturn.addEventListener('click', returnMainPage);
function getHistorial(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var store, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    store = location.search.substr(1).split("=")[1];
                    return [4 /*yield*/, axios.get("cart/historialCart/" + store)];
                case 1:
                    response = _a.sent();
                    renderAllCartsStore(response.data.allCarts);
                    return [2 /*return*/];
            }
        });
    });
}
function renderAllCartsStore(allCarts) {
    var html = '';
    var historialRoot = document.querySelector('#historialRoot');
    var totalStore = 0;
    html += "<div class=\"historial__table\"><table id=\"historial\">\n        <thead>\n    <tr>\n        <th>Date</th>\n        <th>Buyer</th>\n        <th>Image</th>\n        <th>Name</th>\n        <th>Description</th>\n        <th>SubTotal</th>\n    <tr>\n    </thead>\n    <tbody>";
    allCarts.forEach(function (cart) {
        var date = cart.date, name = cart.name, description = cart.description, image = cart.image, total = cart.total, username = cart.username;
        totalStore += total;
        html += "<tr>\n                    <td>" + date + "</td>\n                    <td>" + username + "</td>\n                      <td> <img src=\"" + image + "\" alt=\"" + name + "\" style = \"width:70px; height:70px\"</td>\n                        <td>" + name + "</td>\n                        <td>" + description + "</td>\n                        <td>\u20AA " + total + "</td>   \n                 </tr> ";
    });
    html += "       </tbody>\n                    <tfoot>\n                            <tr>\n                        <th id=\"total\" colspan=\"5\" style=\"text-align:right;\">Total :</th>\n                             <td> \u20AA " + totalStore + "</td>\n                         </tr>\n                    </tfoot>\n                    </table>\n                 </div>";
    historialRoot.innerHTML = html;
}
function returnMainPage() {
    return __awaiter(this, void 0, void 0, function () {
        var responseUser, data, email, store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.get('/user/readCookie')];
                case 1:
                    responseUser = _a.sent();
                    data = responseUser.data;
                    email = data.user.email;
                    store = data.user.store;
                    window.location.href = "http://localhost:3000/main.html?email=" + email + "?store=" + store;
                    return [2 /*return*/];
            }
        });
    });
}
