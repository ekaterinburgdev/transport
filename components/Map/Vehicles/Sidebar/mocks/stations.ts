import { getHHMMFormat } from 'utils/dateFormatter';

export type Station = {
    id: number;
    name: string;
    arrivalTime: string;
};
// TODO: надо получать по отдельному запросу GET /api/route/:boardId
export const stations: Station[] = [
    {
        id: 1,
        name: 'мкр. Мичуринский (Сады)',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 9 * 60000)),
    },
    {
        id: 2,
        name: 'Каждый',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 7 * 60000)),
    },
    {
        id: 3,
        name: 'Охотник',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 7 * 60000)),
    },
    {
        id: 4,
        name: 'Желает',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 3 * 60000)),
    },
    {
        id: 5,
        name: 'Знать',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 2 * 60000)),
    },
    {
        id: 6,
        name: 'Сидит',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 1 * 60000)),
    },
    {
        id: 7,
        name: 'Фазан',
        arrivalTime: getHHMMFormat(new Date(Date.now() - 1 * 60000)),
    },
    { id: 8, name: 'Институт связи', arrivalTime: getHHMMFormat(new Date()) },
    {
        id: 9,
        name: 'Центральный стадион',
        arrivalTime: getHHMMFormat(new Date(Date.now() + 1 * 60000)),
    },
    { id: 10, name: 'ТРЦ Алатырь', arrivalTime: getHHMMFormat(new Date(Date.now() + 3 * 60000)) },
    {
        id: 11,
        name: 'Театр Волхонка',
        arrivalTime: getHHMMFormat(new Date(Date.now() + 5 * 60000)),
    },
    {
        id: 12,
        name: 'мкр. Мичуринский (Сады)',
        arrivalTime: getHHMMFormat(new Date(Date.now() + 10 * 60000)),
    },
    {
        id: 13,
        name: 'мкр. Мичуринский (Сады)',
        arrivalTime: getHHMMFormat(new Date(Date.now() + 13 * 60000)),
    },
    {
        id: 14,
        name: 'мкр. Мичуринский (Сады)',
        arrivalTime: getHHMMFormat(new Date(Date.now() + 33 * 60000)),
    },
    { id: 15, name: 'Восточная', arrivalTime: getHHMMFormat(new Date(Date.now() + 40 * 60000)) },
];
