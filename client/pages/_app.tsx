import React from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { PRODUCTION_PROJECTS, PROJECT_TRANSPORT, ProjectsPanel, Theme } from 'ekb';

import { store } from 'state';

import 'styles/globals.css';
import 'styles/tally-widget.css';
import 'ekb/style.css';

type AppProps<PropsType extends object> = {
    Component: React.ComponentType<PropsType>;
    pageProps: PropsType;
};

function App({ Component, pageProps }: AppProps<any>) {
    const { pathname } = useRouter();

    return (
        <>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>

            <div data-pathname={pathname}>
                <ProjectsPanel
                    projects={[...PRODUCTION_PROJECTS, PROJECT_TRANSPORT]}
                    activeProjectId={PROJECT_TRANSPORT.id}
                    theme={Theme.LIGHT}
                />
            </div>
        </>
    );
}

export default App;
