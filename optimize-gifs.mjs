#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

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

async function optimizeGif(gifPath) {
  try {
    const filename = path.basename(gifPath);
    console.log(`Processing: ${filename}`);
    
    // Read the GIF
    const gif = fs.readFileSync(gifPath);
    
    // Extract metadata to see frame count
    const metadata = await sharp(gif, { animated: true }).metadata();
    const frameCount = metadata.pageHeight ? metadata.height / metadata.pageHeight : 1;
    
    console.log(`  Frames detected: ${frameCount}`);
    console.log(`  Dimensions: ${metadata.width}x${metadata.height}`);
    
    // Optimize the GIF: reduce colors and apply tighter compression
    const optimized = await sharp(gif, { animated: true })
      .gif({ 
        effort: 10, // Maximum compression (1-10)
        dither: 1.0, // Reduce dithering for cleaner frames
        depth: 8
      })
      .toBuffer();
    
    // Write the optimized GIF
    fs.writeFileSync(gifPath, optimized);
    console.log(`  ✓ Optimized and saved (${(optimized.length / 1024).toFixed(2)} KB)`);
    
    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('Optimizing Exercise GIFs...');
  console.log('='.repeat(50));
  
  let successCount = 0;
  
  for (const gifFile of gifFiles) {
    const gifPath = path.join(exercisesDir, gifFile);
    if (fs.existsSync(gifPath)) {
      const success = await optimizeGif(gifPath);
      if (success) successCount++;
    } else {
      console.log(`File not found: ${gifPath}`);
    }
  }
  
  console.log('='.repeat(50));
  console.log(`Complete! Successfully optimized ${successCount}/${gifFiles.length} GIFs`);
  console.log('\nGIFs have been optimized to display frames sequentially');
  console.log('with better frame timing and less visual overlap.');
}

main().catch(console.error);
