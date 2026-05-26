const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', 'styles.json');
const style = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 1. Remove maxzoom from the root if present
delete style.maxzoom;

// 2. Ensure the source has maxzoom: 16 for overzooming
if (style.sources && style.sources.carto) {
    style.sources.carto.maxzoom = 16;
}

// 3. Remove maxzoom from all layers so they don't disappear when overzooming
if (style.layers) {
    style.layers.forEach(layer => {
        if (layer.maxzoom) {
            delete layer.maxzoom;
        }
    });
}

fs.writeFileSync(filePath, JSON.stringify(style, null, 2), 'utf8');
console.log('Successfully removed maxzoom restrictions from layers and configured overzooming.');
