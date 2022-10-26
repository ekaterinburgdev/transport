import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Head>
                <title>Ekaterinburg transport</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Транспорт</h1>

            <ul>
                <li><Link href={'/map'}>Карта</Link></li>
            </ul>
        </>
    );
}
