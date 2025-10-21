import { operator } from './db_operator.js';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { Config } from './config.js';

const config: Config = new Config();
const app = express();
if (config.reverse_proxy_enabled) {
    app.set('trust proxy', 1);
}
const port: number = config.port;
const api_limiter = rateLimit({
    windowMs: 1.5 * 60 * 1000,
    max: 3,
    message: {
        code: 429,
        message: 'Too many requests from this IP, please try again later!'
    },
    standardHeaders: true,
    legacyHeaders: false,
})

function check_url(url_string: string): Boolean {
    if (!url_string || url_string.length <= 5) {
        return false;
    }

    if (!url_string.startsWith('http://') && !url_string.startsWith('https://')) {
        return false;
    }

    const url: URL = new URL(url_string);

    if (!url.hostname) {
        return false;
    }

    const server_domain: URL = new URL(`http://${config.server_domain}`);
    if (server_domain.hostname === url.hostname) {
        return false;
    }

    return true;
}

app.use(express.json());

app.post('/api/shorten', api_limiter, async (req, res) => {
    const url: string = req.body.long_url;
    if (check_url(url)) {
        const existed: string | void = await operator.find_by_url(url);
        
        if (existed) {
            return res.json({ shortCode: existed });
        } else {
            const short: string = await operator.create_link(
                { long_url: url, expire_at: undefined /* req.body.expire_at */ });
            return res.json({ shortCode: short });
        }
    } else {
        return res.json({ error: "Format invalid." });
    }
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: config.page_dir });
});

app.get('/:shortCode', async (req, res) => {
    const short_code: string = req.params.shortCode;
    const url: string | void = await operator.find_link(short_code);
    if (url) {
        res.redirect(301, url);
    } else {
        return res.status(404).json({ error: "This link doesn't exist!" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port} !`);
});