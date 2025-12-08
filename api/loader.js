export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';

    const bypassHeaders = [
        'x-vercel-bypass-secret',
        'x-vercel-set-bypass-cookie',
    ];
    const bypassCookies = req.cookies || {};
    const bypassQuery = req.query || {};

    for (const hdr of bypassHeaders) {
        if (req.headers[hdr]) {
            return res.status(403).send('Bypass mechanism blocked');
        }
        if (bypassQuery[hdr]) {
            return res.status(403).send('Bypass mechanism blocked');
        }
    }
    
    if (bypassCookies['vercel-bypass-auth']) {
        return res.status(403).send('Bypass mechanism blocked');
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');

    if (!userAgent.toLowerCase().includes('roblox')) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    const script = `loadstring(game:HttpGet("https://github.com/Rawbr10/loader/raw/refs/heads/main/ProjectX-Steal-A-Brainrot-Anti-Loader.lua"))()
`;

    return res.status(200).send(script);
}        t[#t+1]=string.char(bit32.rshift(n,16),bit32.band(bit32.rshift(n,8),255),bit32.band(n,255))
    end
    return table.concat(t):gsub("%z+$","")
end)(url)))()
`;

    res.status(200).send(script);
}
