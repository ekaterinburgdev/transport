import { JSDOM } from 'jsdom';
import { isUndefined } from 'lodash';
import fetch from 'node-fetch';

import { ClientUnit, UnitInfo } from 'transport-common/types/masstrans';

export interface GetTransportInfoOptions {
    imageCol: number;
    boardNumberCol: number;
    modelCol: number;
    factoryNumberCol: number;
    yearCol: number;
}

export const FIRST_URL_BY_TYPE = {
    [ClientUnit.Troll]: 'https://transphoto.org/list.php?t=2&serv=0&cid=55',
    [ClientUnit.Tram]: [
        // Gortrans
        'https://transphoto.org/list.php?t=1&cid=55&serv=0',
        // Upper Pyshma
        'https://transphoto.org/list.php?did=6488&serv=0',
    ],
    [ClientUnit.Bus]: [
        // Gortrans
        'https://fotobus.msk.ru/list.php?loid=4348&serv=0',
        // private carriers
        'https://fotobus.msk.ru/list.php?loid=226&serv=0',
        // intercity
        'https://fotobus.msk.ru/list.php?loid=228&serv=0',
        // Upper Pyshma and Sredneuralsk
        'http://fotobus.msk.ru/list.php?loid=246&serv=0',
    ],
};

async function getTransportInfoFromPage(url: string) {
    const { origin, pathname } = new URL(url);
    const transportPageRes = await fetch(url, {
        headers: {
            Cookie: 'thumbs=1; hidechassi=1',
        },
    });
    const html = await transportPageRes.text();

    const { document } = new JSDOM(html).window;

    const mainTable = document.querySelector('table.tmain');

    if (!mainTable) {
        return {
            nextPageUrl: null,
            data: [],
        };
    }

    const firstTable = mainTable.querySelector('table');

    if (!firstTable) {
        return {
            nextPageUrl: null,
            data: [],
        };
    }

    const rows = firstTable.querySelectorAll('tr');

    const result: UnitInfo[] = [];

    let imageCol: number;
    let boardNumberCol: number;
    let modelCol: number;
    let factoryNumberCol: number;
    let yearCol: number;

    rows?.forEach((row) => {
        const headerCells = row.querySelectorAll('th');

        if (headerCells.length) {
            headerCells.forEach((cell, idx) => {
                switch (cell.textContent?.trim()) {
                    case 'Фото':
                        imageCol = idx;
                        break;
                    case '№':
                        if (boardNumberCol === undefined) {
                            boardNumberCol = idx;
                        }

                        break;
                    case 'Гос.№':
                        boardNumberCol = idx;
                        break;
                    case 'Модель':
                        modelCol = idx;
                        break;
                    case 'Зав.№':
                        factoryNumberCol = idx;
                        break;
                    case 'Постр.':
                        yearCol = idx;
                        break;
                    default:
                        break;
                }
            });
        }

        const cells = row.querySelectorAll('td');

        if (!cells.length) {
            return;
        }

        if (
            isUndefined(imageCol) ||
            isUndefined(boardNumberCol) ||
            isUndefined(factoryNumberCol) ||
            isUndefined(modelCol) ||
            isUndefined(yearCol)
        ) {
            throw Error('One of the columns number was not found');
        }

        const item = {} as UnitInfo;
        const image = cells[imageCol]?.querySelector('img')?.src;

        if (image && image !== '/img/spt.gif') {
            const realImagePath = image.replace(/((\d+)(_\w)?).(jpe?g)/, '$2.$4');

            if (realImagePath.startsWith('//')) {
                item.imageUrl = 'https:' + realImagePath;
            } else if (realImagePath.startsWith('/')) {
                item.imageUrl = origin + realImagePath;
            } else {
                if (!/http(s)?:\/\/(\w|\.|-|_)+((\w|\d|\.|-|_|\/)+)?/.test(realImagePath)) {
                    console.error(`Invalid image src format: ${realImagePath}`);

                    return;
                }

                item.imageUrl = realImagePath;
            }
        }

        const boardNumber = cells[boardNumberCol]?.querySelector('a')?.textContent;

        if (boardNumber) {
            if (!/(\d+|б\/н)/i.test(boardNumber)) {
                console.error(`Invalid board number format: ${boardNumber}`);

                return;
            }

            item.boardNumber = boardNumber;
        }

        const model = cells[modelCol]?.textContent;

        if (model) {
            item.model = model;
        }

        const factoryNumber = cells[factoryNumberCol]?.textContent;

        if (factoryNumber) {
            if (!/\d+/.test(factoryNumber)) {
                console.error(`Invalid board number format: ${factoryNumber}`);

                return;
            }

            item.factoryNumber = factoryNumber;
        }

        const year = cells[yearCol]?.textContent;

        if (year) {
            if (!/(\d{2}\.)?\d{4}/.test(year)) {
                console.error(`Invalid year format: ${year}`);

                return;
            }

            item.year = year;
        }

        result.push(item);
    });

    const allTables = mainTable.querySelectorAll('table');

    if (allTables.length > 3) {
        return {
            nextPageUrl: null,
            data: result,
        };
    }

    const nextPagePath = (document.querySelector('.pages span + a') as HTMLAnchorElement)?.href;
    console.log(document.querySelector('.pages span')?.textContent);

    return {
        nextPageUrl: nextPagePath.startsWith('?') ? origin + pathname + nextPagePath : nextPagePath,
        data: result,
    };
}

export async function getTransportInfo() {
    let nextTrollPageUrl: string | null = FIRST_URL_BY_TYPE[ClientUnit.Troll];
    const trollsInfo: UnitInfo[] = [];
    while (nextTrollPageUrl) {
        // @ts-ignore
        const { data, nextPageUrl } = await getTransportInfoFromPage(nextTrollPageUrl);

        trollsInfo.push(...data);
        nextTrollPageUrl = nextPageUrl;
    }

    const tramsInfo: UnitInfo[] = [];

    for (const firstUrl of FIRST_URL_BY_TYPE[ClientUnit.Tram]) {
        let nextTramPageUrl: string | null = firstUrl;

        while (nextTramPageUrl) {
            // @ts-ignore
            const { data, nextPageUrl } = await getTransportInfoFromPage(nextTramPageUrl);

            tramsInfo.push(...data);
            nextTramPageUrl = nextPageUrl;
        }
    }

    const busesInfo: UnitInfo[] = [];

    for (const firstUrl of FIRST_URL_BY_TYPE[ClientUnit.Bus]) {
        let nextBusPageUrl: string | null = firstUrl;

        while (nextBusPageUrl) {
            // @ts-ignore
            const { data, nextPageUrl } = await getTransportInfoFromPage(nextBusPageUrl);

            busesInfo.push(...data);
            nextBusPageUrl = nextPageUrl;
        }
    }

    return {
        trolls: trollsInfo,
        trams: tramsInfo,
        buses: busesInfo,
    };
}

export const MODELS_URLS = {
    [ClientUnit.Troll]: 'https://transphoto.org/models.php?t=2',
    [ClientUnit.Tram]: 'https://transphoto.org/models.php?t=1',
    [ClientUnit.Bus]: 'https://fotobus.msk.ru/models.php',
};

export async function getFactoryNamesByModelsAndType(models: string[], type: ClientUnit) {
    const url = MODELS_URLS[type];

    const modelsPageRes = await fetch(url);
    const html = await modelsPageRes.text();

    const { document } = new JSDOM(html).window;

    const result: Record<string, string> = {};
    const modelsSet = new Set(models);

    const tableRows = document.querySelectorAll('td.main > center > table > tbody > tr');

    let currentFactory: string = '';

    tableRows.forEach((tableRow) => {
        const newFactory = tableRow.querySelector('h4');

        if (newFactory) {
            currentFactory = newFactory.textContent || '';
            return;
        }

        const modelLink = tableRow.querySelector('a');

        if (!modelLink) {
            return;
        }

        const model = modelLink.textContent?.trim() || '';

        const isNeeded = modelsSet.has(model);

        if (!isNeeded) {
            return;
        }

        result[model] = currentFactory;
    });

    return result;
}
