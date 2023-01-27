import { VehicleType } from 'common/types/masstrans';

type VehicleAwait = {
    route: string;
    type: VehicleType;
    boardId: number;
    time: number;
    to: string;
    through: string[];
};

export const vehicleAwait: VehicleAwait[] = [
    {
        route: '016',
        type: VehicleType.Bus,
        boardId: 1,
        time: 1,
        to: 'Южная подстанция',
        through: ['Площадь 1905 года', 'Цирк'],
    },
    {
        route: '016',
        type: VehicleType.Bus,
        boardId: 2,
        time: 1,
        to: 'Елизавет',
        through: ['Площадь 1905 года', 'Цирк'],
    },
    {
        route: '25',
        type: VehicleType.Bus,
        boardId: 3,
        time: 2,
        to: 'Высоцкого',
        through: ['улица Малышева'],
    },
    {
        route: '3',
        type: VehicleType.Troll,
        boardId: 4,
        time: 2,
        to: 'Коммунистическая',
        through: ['Вокзал', 'проспект Космонавтов'],
    },
    {
        route: '48',
        type: VehicleType.Bus,
        boardId: 5,
        time: 2,
        to: 'Горбольница №7',
        through: ['Площадь 1905 года', 'Вокзал'],
    },
    {
        route: '27',
        type: VehicleType.Bus,
        boardId: 6,
        time: 3,
        to: 'ЖБИ',
        through: ['Площадь 1905 года', 'УрФУ'],
    },
    {
        route: '7',
        type: VehicleType.Troll,
        boardId: 7,
        time: 10,
        to: 'Академическая',
        through: ['улица Малышева'],
    },
    {
        route: '24',
        type: VehicleType.Bus,
        boardId: 8,
        time: 15,
        to: 'микрорайон Компрессорный',
        through: ['Малышева', 'Восточная'],
    },
    {
        route: '45',
        type: VehicleType.Bus,
        boardId: 9,
        time: 20,
        to: 'Ж/д вокзал',
        through: ['Площадь 1905 года'],
    },
    {
        route: '77',
        type: VehicleType.Troll,
        boardId: 10,
        time: 33,
        to: 'Южная подстанция',
        through: ['Площадь 1905 года', 'Цирк'],
    },
];
