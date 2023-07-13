"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.deleteFile = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const constants_1 = require("./constants");
function deleteFile(id, jwt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/upload/files/${id}`, {
                headers: Object.assign({}, (jwt ? { Authorization: `Bearer ${jwt}` } : {})),
                method: 'DELETE',
            });
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.deleteFile = deleteFile;
function uploadFile(data, jwt) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/upload`, {
                headers: Object.assign(Object.assign({}, data.getHeaders()), (jwt ? { Authorization: `Bearer ${jwt}` } : {})),
                method: 'POST',
                body: data,
            });
            const body = (yield resp.json());
            if (body.error) {
                throw new Error(JSON.stringify(body.error));
            }
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return body;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.uploadFile = uploadFile;
//# sourceMappingURL=upload.js.map