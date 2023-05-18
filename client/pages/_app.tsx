import React from 'react';

import Head from 'next/head';

import 'styles/globals.css';
import 'ekb/style.css';
import { ALL_PROJECTS, PROJECT_TRANSPORT, ProjectsPanel, Theme } from 'ekb';

type AppProps<PropsType extends object> = {
    Component: React.ComponentType<PropsType>;
    pageProps: PropsType;
};

function App({ Component, pageProps }: AppProps<any>) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>

            <Component {...pageProps} />

            <ProjectsPanel projects={ALL_PROJECTS} activeProjectId={PROJECT_TRANSPORT.id} theme={Theme.LIGHT} />
        </>
    );
}

export default App;
