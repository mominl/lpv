const fs = require('fs');
const path = require('path');

// Dynamic file download handler. Access as /api/ass1 or /ass1 (with rewrite).
module.exports = (req, res) => {
  // try to get the name from query (Vercel sets req.query for dynamic routes)
  let name = (req.query && req.query.name) || '';

  // fallback: parse from url (handles direct invocation and local tests)
  if (!name) {
    // req.url may be '/ass1' or '/ass1?x=1'
    const u = (req.url || '').split('?')[0];
    name = u.replace(/^\//, '');
  }

  // validate simple slug: allow letters, numbers, hyphen, underscore
  if (!/^[A-Za-z0-9_-]+$/.test(name)) {
    res.statusCode = 400;
    res.end('Invalid filename');
    return;
  }

  const fileName = `${name}.txt`;
  const filePath = path.join(__dirname, '..', 'files', fileName);

  if (!fs.existsSync(filePath)) {
    res.statusCode = 404;
    res.end('File not found');
    return;
  }

  try {
    const stat = fs.statSync(filePath);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Content-Length', String(stat.size));
    // stream file
    const stream = fs.createReadStream(filePath);
    stream.on('error', (err) => {
      res.statusCode = 500;
      res.end('Server error');
    });
    stream.pipe(res);
  } catch (err) {
    res.statusCode = 500;
    res.end('Server error');
  }
};