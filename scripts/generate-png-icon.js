const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function svgToPng() {
  try {
    // Read the SVG file
    const svgContent = fs.readFileSync('frontend/public/icon.svg', 'utf8');

    // Create canvas for 512x512 PNG
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');

    // Set background
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#001122');
    gradient.addColorStop(1, '#1e3a8a');

    // Draw background circle
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw shopping bag body
    ctx.beginPath();
    ctx.moveTo(160, 200);
    ctx.lineTo(160, 380);
    ctx.quadraticCurveTo(160, 420, 200, 420);
    ctx.lineTo(312, 420);
    ctx.quadraticCurveTo(352, 420, 352, 380);
    ctx.lineTo(352, 200);
    ctx.closePath();

    const bagGradient = ctx.createLinearGradient(160, 200, 352, 420);
    bagGradient.addColorStop(0, '#ffffff');
    bagGradient.addColorStop(0.5, '#f1f5f9');
    bagGradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bagGradient;
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw handles
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.quadraticCurveTo(200, 160, 230, 160);
    ctx.quadraticCurveTo(260, 160, 260, 200);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(252, 200);
    ctx.quadraticCurveTo(252, 160, 282, 160);
    ctx.quadraticCurveTo(312, 160, 312, 200);
    ctx.stroke();

    // Draw checkmark circle
    ctx.beginPath();
    ctx.arc(256, 320, 60, 0, 2 * Math.PI);
    const checkGradient = ctx.createLinearGradient(196, 260, 316, 380);
    checkGradient.addColorStop(0, '#22c55e');
    checkGradient.addColorStop(1, '#16a34a');
    ctx.fillStyle = checkGradient;
    ctx.fill();
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw checkmark
    ctx.beginPath();
    ctx.moveTo(230, 320);
    ctx.lineTo(248, 338);
    ctx.lineTo(282, 304);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Save PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('frontend/public/icon.png', buffer);
    console.log('✅ PNG icon generated successfully!');

    // Generate additional sizes
    const sizes = [16, 32, 64, 128, 192, 256];
    for (const size of sizes) {
      const smallCanvas = createCanvas(size, size);
      const smallCtx = smallCanvas.getContext('2d');
      smallCtx.drawImage(canvas, 0, 0, size, size);
      const smallBuffer = smallCanvas.toBuffer('image/png');
      fs.writeFileSync(`frontend/public/icon-${size}.png`, smallBuffer);
    }
    console.log('✅ All PNG sizes generated!');

  } catch (error) {
    console.error('❌ Error generating PNG:', error);
  }
}

svgToPng();