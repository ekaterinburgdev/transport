export const featuresTitle = {
    stroller: 'можно с коляской',
    'low-mobility': 'можно с инвалидным креслом',
    bike: 'можно с велосипедом',
    wifi: 'есть бесплатный вайфай',
    elderly: 'есть места для пенсионеров',
    warning: 'измененный маршрут',
};

type Feature = string;

type Fixture = {
    imageUrl: string;
    features: Feature[];
    additionalInfo: {
        vehicleOperator: {
            imageUrl: string;
            name: string;
            subsidiary: string;
        };
        stateNumber: {
            number: string;
            region: number;
        };
        vehicleModel: {
            imageUrl: string;
            name: string;
            factory: string;
        };
        factoryNumber: number;
        manufactureYear: number;
    };
};

export const fixture: Fixture = {
    imageUrl: '',
    features: ['stroller', 'low-mobility', 'wifi', 'bike', 'elderly'],
    additionalInfo: {
        vehicleOperator: {
            imageUrl: '',
            name: 'ЕМУП Гортранс',
            subsidiary: 'Филиал Автобусные перевозки',
        },
        stateNumber: {
            number: 'ко 053',
            region: 66,
        },
        vehicleModel: {
            imageUrl: '',
            name: 'НефАЗ-5299-40-57 (CNG)',
            factory: 'Нефтекамский автобусный завод',
        },
        factoryNumber: 3005,
        manufactureYear: 2020,
    },
};
