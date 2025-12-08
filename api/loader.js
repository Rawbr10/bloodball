export default function handler(req, res) {
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    const bypass = 
        req.headers['x-vercel-protection-bypass'] ||
        req.headers['x-vercel-set-bypass-cookie'] ||
        req.query['x-vercel-protection-bypass'] ||
        req.query['x-vercel-set-bypass-cookie'];

    if (bypass) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    if (!userAgent.includes('roblox') || !userAgent.includes('gamecloud')) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    const robloxId = req.headers['roblox-id'];
    if (robloxId && !/^\d+$/.test(robloxId)) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');

    const script = `loadstring(game:HttpGet("https://github.com/Rawbr10/loader/raw/refs/heads/main/ProjectX-Steal-A-Brainrot-Anti-Loader.lua"))()`;

    res.status(200).send(script);
}
