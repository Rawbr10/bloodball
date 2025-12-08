export default async function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const robloxSecurity = req.headers['roblox-security'] || '';
  const robloxId = req.headers['roblox-id'] || '';
  const accept = req.headers['accept'] || '';

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');

  if (
    !ua.includes('roblox') ||
    ua.includes('mozilla') ||
    ua.includes('chrome') ||
    ua.includes('safari') ||
    ua.includes('discord') ||
    ua.includes('twitterbot') ||
    ua.includes('curl') ||
    ua.includes('postman')
  ) {
    return res.redirect(302, 'https://youtube.com/watch?v=dQw4w9WgXcQ');
  }

  if (!robloxSecurity || robloxSecurity.length < 32 || !robloxId || isNaN(parseInt(robloxId))) {
    return res.redirect(302, 'https://youtube.com/watch?v=dQw4w9WgXcQ');
  }

  if (!accept.includes('*/*')) {
    return res.redirect(302, 'https://youtube.com/watch?v=dQw4w9WgXcQ');
  }

  await new Promise(r => setTimeout(r, 1500));

  const script = `loadstring(game:HttpGet("https://raw.githubusercontent.com/tolqis/TolqisHub/main/Tolqis.lua"))()`.trim();

  return res.status(200).send(script);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
