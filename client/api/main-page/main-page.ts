import { Unit } from 'transport-common/types/masstrans';
import { fetchApi } from 'api/utils/fetch';
import { STRAPI_URL, TRAFFIC_JAMS_URL, TRANSPORT_API_URL } from 'transport-common/strapi/constants';

export const MainPageApi = {
    getCards: async () => {
        return await fetchApi(
            `${STRAPI_URL}/api/cards/?populate=backgroundImage,backgroundImageHover`,
            { dataField: 'data' },
        );
    },

    getTrafficJamsCounter: async () => {
        return await fetchApi(
            TRAFFIC_JAMS_URL,
            { dataField: 'score' },
        );
    },

    getA11yTransportCounters: async () => {
        const countA11yUnits = async (type) => {
            let units = []

            try {
                units = <Unit[]>await fetchApi(
                    `${TRANSPORT_API_URL}/api/masstrans/${type}`,
                    { dataField: 'data' }
                )

                return units
                    .filter(({ accessibility }) => accessibility)
                    .length;
            } catch (e) {
                return 0
            }
        }

        return {
            buses: await countA11yUnits('bus'),
            trolls: await countA11yUnits('troll'),
            trams: await countA11yUnits('tram')
        }
    },

    getMarqueeItems: async () => {
        return await fetchApi(`${STRAPI_URL}/api/marquees`, {
            dataField: 'data',
        });
    }
};
