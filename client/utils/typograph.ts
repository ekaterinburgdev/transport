import Typograf from 'typograf';

const tp = new Typograf({
    locale: ['ru', 'en-US'],
});

const tpForAsideMenu = new Typograf({
    locale: ['ru', 'en-US'],
});

tpForAsideMenu.disableRule([
    'common/space/trimRight',
    'common/space/trimLeft',
    'common/space/delBeforePunctuation',
    'common/space/afterPunctuation',
    'common/nbsp/replaceNbsp',
    'ru/optalign/comma',
    'ru/punctuation/ano',
    'ru/punctuation/exclamation',
    'ru/punctuation/exclamationQuestion',
    'ru/punctuation/hellipQuestion',
])

tp.disableRule([
    'common/space/trimRight',
    'common/space/trimLeft',
    'common/space/delBeforePunctuation',
    'common/space/afterPunctuation',
    'common/nbsp/replaceNbsp',
]);

export default function t(text) {
    return tp.execute(text);
};
