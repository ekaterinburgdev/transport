"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parallelRequests = void 0;
const tslib_1 = require("tslib");
function parallelRequests(jobs, concatenator) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const rawResults = yield Promise.all(jobs);
        const result = [];
        for (const rawResult of rawResults) {
            const dataToConcat = yield concatenator(rawResult);
            result.push(...dataToConcat);
        }
        return result;
    });
}
exports.parallelRequests = parallelRequests;
//# sourceMappingURL=parallelRequests.js.map