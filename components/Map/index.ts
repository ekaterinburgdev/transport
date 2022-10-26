import dynamic from 'next/dynamic';

export const Map = dynamic(() => import('./Map'), {
    ssr: false,
});
