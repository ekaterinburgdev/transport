import crypto from 'crypto';
import type { JsonRpcMethods } from "../model/ekaterinburg-rf/ekaterinburg-rf.constants";

const EKATERINBURG_TOKEN = 'ekt';

export function getRequestToken(method: JsonRpcMethods, id: number, sid: string) {
    const token = `${method}~${EKATERINBURG_TOKEN}~${id}~${sid}`;
    const tokenEnc = crypto.createHash('sha1').update(token).digest('hex');

    // transorm first and last 16 symbols into GUID
    const guid =
        tokenEnc.substr(0, 8) +
        '-' +
        tokenEnc.substr(8, 4) +
        '-' +
        tokenEnc.substr(12, 4) +
        '-' +
        tokenEnc.substr(24, 4) +
        '-' +
        tokenEnc.substr(28, 12);

    // turn 8 middle symbols into magic string
    const magic = tokenEnc.substr(16, 8);

    return {
        guid,
        magic
    };
}
