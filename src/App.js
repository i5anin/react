import React, { createElement, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

// декларативный стиль
export function CurrentYear() {
    const year = new Date().getFullYear();
    return createElement('span', null, year);
}

// декларативный стиль
function App() {
    const [count, setCount] = useState(0);

    // императивный стиль
    return createElement(
        React.Fragment,
        null,

        createElement(
            'div',
            null,
            createElement(
                'a',
                { href: 'https://vite.dev', target: '_blank' },
                createElement('img', {
                    src: viteLogo,
                    className: 'logo',
                    alt: 'Vite logo',
                })
            ),
            createElement(
                'a',
                { href: 'https://react.dev', target: '_blank' },
                createElement('img', {
                    src: reactLogo,
                    className: 'logo react',
                    alt: 'React logo',
                })
            )
        ),

        createElement('h1', null, 'Vite + React'),

        createElement(
            'div',
            { className: 'card' },
            createElement(
                'button',
                { onClick: () => setCount((count) => count + 1) },
                `count is ${count}`
            ),
            createElement(
                'p',
                null,
                'Edit ',
                createElement('code', null, 'src/App.js'),
                ' and save to test HMR'
            )
        ),

        createElement(
            'p',
            { className: 'read-the-docs' },
            'Click on the Vite and React logos to learn more'
        ),

        createElement(
            'footer',
            null,
            createElement(
                'p',
                null,
                '© ',
                createElement(CurrentYear, null),
                ' Все права защищены'
            )
        )
    );
}

export default App;
