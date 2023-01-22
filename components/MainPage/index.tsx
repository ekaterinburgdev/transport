import React from 'react';
import Image from 'next/image';
import { MainPageTypes } from './index.types';

export function MainPage({ cards, marqueeItems, notifications }: MainPageTypes) {
    return (
        <div style={{ padding: '20px 40px', maxWidth: 1400, margin: '0 auto' }}>
            <h1>Транспорт Екатеринбурга</h1>

            <div style={{ display: 'flex', gap: 15, marginBottom: 50 }}>
                <div>Местный</div>
                <div>Турист</div>
            </div>

            <div style={{ display: 'flex', marginBottom: 75 }}>
                {notifications.map(({ id, attributes }) => (
                    <div key={id}>
                        {attributes.text}
                        <br />
                        {attributes.title}
                        <Image src={attributes.image} alt="" />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', marginBottom: 100, gap: 16 }}>
                {marqueeItems.map(({ id, attributes }) => (
                    <span key={id}>
                        {attributes.message}
                    </span>
                ))}
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 75,
            }}
            >
                {cards.map(({ id, attributes }) => (
                    <a
                        href={attributes.url}
                        key={id}
                        style={{
                            display: 'inline-block',
                            width: 'calc((100% - 30px) / 3)',
                            height: 400,
                            padding: 50,
                            border: 'backgroundImage' in attributes ? '1px solid rgba(0,0,0,.25)' : '',
                            borderRadius: 64,
                            textDecoration: 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: '100% 50%',
                            backgroundColor: attributes.backgroundColor || 'rgba(0,0,0,.15)',
                            backgroundImage: `url(https://transport-cms.ekaterinburg.io${attributes?.backgroundImage?.data?.attributes?.url})`,
                        }}
                    >
                        <span style={{
                            color: attributes.titleColor,
                            fontSize: 24,
                            backgroundColor: attributes.titleBackground,
                        }}
                        >
                            {attributes.title}
                        </span>
                        <br />
                        <br />

                        <pre style={{ color: attributes.subtitleColor, fontSize: 20 }}>
                            {attributes.subtitle}
                        </pre>

                        <span style={{ color: attributes.buttonColor }}>
                            {attributes.button}
                        </span>

                        {/* {attributes.cardId} */}

                        <br />
                        <br />
                        settings:
                        {attributes.type}
                        ,
                        {attributes.priority}
                    </a>
                ))}
            </div>

            Транспортная экосистема Екатеринбурга &copy; 2023
        </div>
    );
}
