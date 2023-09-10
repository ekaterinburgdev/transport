import { Unit } from 'transport-common/types/masstrans';
import { fetchApi } from 'api/utils/fetch';

export const MainPageApi = {
    getCards: async () => {
        return await fetchApi(
            'https://transport-cms.ekaterinburg.city/api/cards/?populate=backgroundImage',
            { dataField: 'data' },
        );
    },

    getTrafficJamsCounter: async () => {
        return await fetchApi(
            'https://ekb-probki.vercel.app/api',
            { dataField: 'score' },
        );
    },

    getA11yTransportCounters: async () => {
        const countA11yUnits = async (type) => {
            const units = <Unit[]>await fetchApi(
                `https://transport.ekaterinburg.city/api/masstrans/${type}`,
                { dataField: 'data' }
            );
            return units
                .filter(({ accessibility }) => accessibility)
                .length;
        }

        return {
            buses: await countA11yUnits('bus'),
            trolls: await countA11yUnits('troll'),
            trams: await countA11yUnits('tram')
        }
    },

    getMarqueeItems: async () => {
        return await fetchApi('https://transport-cms.ekaterinburg.city/api/marquees', {
            dataField: 'data',
        });
    }
};
