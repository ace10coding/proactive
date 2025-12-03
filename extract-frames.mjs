#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exercisesDir = './public/images/exercises';
const gifFiles = [
  'arnold-press.gif',
  'back-extension-stability-ball.gif',
  'barbell-shrugs.gif',
  'bench-dips.gif',
  'bench-press.gif',
  'bent-arm-pullover.gif',
  'bent-knee-hip-raise.gif',
  'bicep-curls-barbell.gif',
  'hammer-curl.gif',
  'biceps-curl-dumbbell.gif'
];

async function extractFrames(gifPath) {
  try {
    const filename = path.basename(gifPath, '.gif');
    console.log(`Extracting frames from: ${filename}.gif`);
    
    // Read the GIF
    const gifBuffer = fs.readFileSync(gifPath);
    
    // Get metadata to determine frame count
    const metadata = await sharp(gifBuffer, { animated: true }).metadata();
    const frameCount = metadata.pages || 2;
    
    console.log(`  Total frames: ${frameCount}`);
    
    // Extract each frame
    for (let i = 0; i < frameCount; i++) {
      const frameBuffer = await sharp(gifBuffer, { 
        animated: true,
        page: i
      })
        .png()
        .toBuffer();
      
      const outputPath = path.join(exercisesDir, `${filename}-${i + 1}.png`);
      fs.writeFileSync(outputPath, frameBuffer);
      console.log(`  ✓ Extracted frame ${i + 1}: ${filename}-${i + 1}.png`);
    }
    
    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('Extracting GIF frames to PNG images...');
  console.log('='.repeat(50));
  
  let successCount = 0;
  
  for (const gifFile of gifFiles) {
    const gifPath = path.join(exercisesDir, gifFile);
    if (fs.existsSync(gifPath)) {
      const success = await extractFrames(gifPath);
      if (success) successCount++;
    } else {
      console.log(`File not found: ${gifPath}`);
    }
    console.log('');
  }
  
  console.log('='.repeat(50));
  console.log(`Complete! Successfully extracted ${successCount}/${gifFiles.length} GIF files`);
  console.log('\nFrames extracted as PNG images:');
  console.log('- exercise-name-1.png (starting position)');
  console.log('- exercise-name-2.png (ending position)');
}

main().catch(console.error);
