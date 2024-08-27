import { renderToString } from 'react-dom/server';
import markdownIt from 'markdown-it';
import markdownItCsc from 'markdown-it-custom-short-codes';
import t from 'utils/typograph';

import { Card } from 'components/MainPage/Card/Card';

export default function parseMarkdown(html) {
    const md = markdownIt({ html: true }).use(markdownItCsc);

    const defaultCscBodyRender = md.renderer.rules.csc || function render(tokens, index, options, env, self) {
        return self.renderToken(tokens, index, options);
    }

    md.renderer.rules.csc = (tokens, index) => {
        if (tokens[index].tag === 'card') {
            const props = parseToObject(tokens[index].markup);
            tokens[index].content = renderToString(<Card size="small" {...props} />);
        }

        return defaultCscBodyRender(tokens, index);
    };

    return t(md.render(html));
}

function parseToObject(keyValueString): any {
    const obj = {};
    keyValueString.match(/(\w+)="(.*?)"/g).forEach(keyVal => {
        const [key, val] = keyVal.split('=');
        obj[key] = val.replace(/"/g, '');
    });
    return obj;
}
