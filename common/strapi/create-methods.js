"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStrapiMethods = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const parallelRequests_1 = require("../utils/parallelRequests");
const constants_1 = require("./constants");
function createStrapiMethods(contentType, jwt) {
    const requestToStrapiOptions = {
        headers: Object.assign({ 'Content-Type': 'application/json' }, (jwt ? { Authorization: `Bearer ${jwt}` } : {})),
    };
    function publish(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/${contentType}s`, Object.assign(Object.assign({}, requestToStrapiOptions), { method: 'POST', body: JSON.stringify({
                        data,
                    }) }));
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                const body = (yield resp.json());
                if (body.error) {
                    throw new Error(JSON.stringify(body.error));
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    function update(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = data, attributes = tslib_1.__rest(data, ["id"]);
                const resp = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/${contentType}s/${id}`, Object.assign(Object.assign({ method: 'PUT' }, requestToStrapiOptions), { body: JSON.stringify({
                        data: attributes,
                    }) }));
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                const body = (yield resp.json());
                if (body.error) {
                    throw new Error(JSON.stringify(body.error));
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    function deleteById(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/${contentType}s/${id}`, Object.assign({ method: 'DELETE' }, requestToStrapiOptions));
                if (resp.status !== 200) {
                    throw new Error(resp.statusText);
                }
                const body = (yield resp.json());
                if (body.error) {
                    throw new Error(JSON.stringify(body.error));
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    function getAll(filter, withImage = false) {
        var _a, _b;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const sizeRequest = yield (0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/${contentType}s?pagination[pageSize]=1${filter ? '&' + filter : ''}`, requestToStrapiOptions);
                if (sizeRequest.status !== 200) {
                    throw new Error(sizeRequest.statusText);
                }
                const sizeRequestBody = (yield sizeRequest.json());
                if (sizeRequestBody.error) {
                    throw new Error(JSON.stringify(sizeRequestBody.error));
                }
                const pageCount = Math.ceil(((_b = (_a = sizeRequestBody === null || sizeRequestBody === void 0 ? void 0 : sizeRequestBody.meta) === null || _a === void 0 ? void 0 : _a.pagination) === null || _b === void 0 ? void 0 : _b.total) / constants_1.REQUEST_PAGINATION_SIZE);
                const requests = [];
                for (let i = 1; i <= pageCount; i++) {
                    requests.push((0, node_fetch_1.default)(`${constants_1.STRAPI_URL}/api/${contentType}s?pagination[page]=${i}&pagination[pageSize]=${constants_1.REQUEST_PAGINATION_SIZE}${withImage ? '&populate=image' : ''}${filter ? '&' + filter : ''}`, requestToStrapiOptions));
                }
                const response = yield (0, parallelRequests_1.parallelRequests)(requests, (rawResult) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (rawResult.status !== 200) {
                        throw new Error(rawResult.statusText);
                    }
                    const result = yield rawResult.json();
                    if (result.error) {
                        throw new Error(JSON.stringify(result.error));
                    }
                    return result.data;
                }));
                return response;
            }
            catch (e) {
                console.log(e);
                return [];
            }
        });
    }
    return {
        publish,
        update,
        deleteById,
        getAll,
    };
}
exports.createStrapiMethods = createStrapiMethods;
//# sourceMappingURL=create-methods.js.map