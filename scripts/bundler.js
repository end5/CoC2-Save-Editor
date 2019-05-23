const fs = require('fs');

const head = `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
`;

const mid = `
</style>
<script>
`;

const tail = `
</script>
</head>

<body></body>

</html>`;

const css = fs.readFileSync('main.css', 'utf-8');
const script = fs.readFileSync('bundled.js', 'utf-8');
fs.writeFileSync('CoC2SaveEditor.html', head + css + mid + script + tail, 'utf-8');
