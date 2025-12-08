export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();

  const isRoblox = ua.includes('roblox') ||
                   ua.includes('robloxmacos') ||
                   ua.includes('robloxios') ||
                   ua.includes('roblox/android') ||
                   ua.includes('roblox/wininet') ||
                   (ua.includes('windowsapp') && ua.includes('roblox'));

  const fakeIndicators = [
    'electron','postman','curl','wget','python','httpclient',
    'krnl','synapse','fluxus','jjsploit','delta','trigon',
    'solara','hydrogen','scriptware','cocospy','wave','celery','vega'
  ];

  const isFake = fakeIndicators.some(t => ua.includes(t));

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (!isRoblox || isFake) {
    const redirects = [
      'https://api.luarmor.net/',
      'https://pandadevelopment.net/virtual/file',
      'https://static.rappler.com/images/ID-100197712.jpg',
      'https://i.ytimg.com/vi/Q0ggEj4x2M0/sddefault.jpg'
    ];
    const target = redirects[Math.floor(Math.random() * redirects.length)];
    return res.redirect(302, target);
  }

  const payload = Buffer.from(`loadstring(game:HttpGet("https://raw.githubusercontent.com/tolqis/TolqisHub/main/Tolqis.lua"))()`).toString('base64');

  const script = `
local b64 = "${payload}"
loadstring(game:GetObjects("rbxassetid://0")[1].Value == "" and loadstring(require(0)) or loadstring(game:HttpGet("data:text/plain;base64,"..b64)))()`;

  res.status(200).send(script);
}
