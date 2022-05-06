import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/containers/App';
import Helmet from 'react-helmet';

const PORT = 8080;
const app = express();

app.use(express.static('./build'));

app.get('/*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>,
    );

    const helmet = Helmet.renderStatic();

    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if ( err ) {
            console.error('Something went wrong: ', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
        data = data.replace('<meta name="helmet" />', `${helmet.title.toString()}${helmet.meta.toString()}`);

        return res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server-Side Rendered appliction running on port ${PORT}`);
})