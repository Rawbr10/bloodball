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
        return res.status(403).send('Access denied.');
    }

    const robloxId = req.headers['roblox-id'];
    if (robloxId && !/^\d+$/.test(robloxId)) {
        return res.status(403).send('Invalid Roblox ID.');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    const script = `loadstring(game:HttpGet("https://github.com/Rawbr10/loader/raw/refs/heads/main/ProjectX-Steal-A-Brainrot-Anti-Loader.lua"))()`;

    return res.status(200).send(script);
}
