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
        return res.status(403).send('loadstring(game:HttpGet("https://api.luarmor.net/files/v3/loaders/79bbe708bj6711e5b172e4c37ddfef010e023.lua"))()');
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
    local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local RunService = game:GetService("RunService")

local a;
a = hookfunction(hookfunction, newcclosure(function(args, args2)
    if args == game.HttpGet then
    LocalPlayer:Kick("Why are you using http spy chill bro")
    task.wait(0.2)
    while true do 
    LocalPlayer:Kick("Why are you using http spy chill bro")
  end
   return warn
    end
    return a(args, args2)
end))

    loadstring(game:HttpGet("https://github.com/Rawbr10/bloodball/raw/refs/heads/main/block.lua"))()`;

    return res.status(200).send(script);
}
