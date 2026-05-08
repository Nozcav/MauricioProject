const fs = require('fs');
const file = 'src/app/services/product.service.ts';
let content = fs.readFileSync(file, 'utf8');

// Pattern to match emojis
const emojiPattern = /([\u2600-\u27BF]|[\uD83C][\uDF00-\uDFFF]|[\uD83D][\uDC00-\uDE4F]|[\uD83D][\uDE80-\uDEF6]|[\u2300-\u23FF]|[\u2B50]|[\u200D]|[\uFE0F])/g;

// Strip emojis
content = content.replace(emojiPattern, '');
// Clean up spaces left behind
content = content.replace(/badge: '\s+/g, "badge: '");

fs.writeFileSync(file, content);
console.log('Fixed badges in product.service.ts');
