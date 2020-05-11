import React, { useState } from 'react';
import marked from 'marked';

const newsmd = require('./News.md');

export const NewsMD: React.FC = () => {
    const [markdown, setMarkdown] = useState('Loading...');

    fetch(newsmd)
        .then(response => {
            return response.text()
        })
        .then(text => setMarkdown(marked(text)))
        .catch(console.log);

    return (
        <article className="flex1" dangerouslySetInnerHTML={{ __html: marked(markdown) }}></article>
    );
}
