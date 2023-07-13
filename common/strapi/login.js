"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginStrapi = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const constants_1 = require("./constants");
function loginStrapi() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const response = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier: constants_1.EMAIL,
                password: constants_1.PASSWORD,
            }),
        });
        const body = (yield response.json());
        const { jwt } = body;
        return jwt;
    });
}
exports.loginStrapi = loginStrapi;
//# sourceMappingURL=login.js.map