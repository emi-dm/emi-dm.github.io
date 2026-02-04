import React from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import styles from './styles.module.css';

export default function Home() {
    React.useEffect(() => {
        // Redirect to the downloaded personal page
        window.location.replace('/personal/index.html');
    }, []);

    return (
        <>
            <Head>
                <meta httpEquiv="refresh" content="0; url=/personal/index.html" />
            </Head>
            <main className={clsx('hero')}>
                <div className="container">
                    <h1>Redirecting…</h1>
                    <p>Si no te redirige automáticamente, <a href="/personal/index.html">haz clic aquí para abrir la página personal</a>.</p>
                </div>
            </main>
        </>
    );
}
