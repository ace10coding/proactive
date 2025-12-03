#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import gifFrames from 'gif-frames';
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

async function analyzeGif(gifPath) {
  try {
    console.log(`\nAnalyzing: ${path.basename(gifPath)}`);
    const frames = await gifFrames({ url: gifPath, all: true });
    console.log(`  Total frames: ${frames.length}`);
    
    // Get file size
    const stats = fs.statSync(gifPath);
    console.log(`  File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    if (frames.length > 0) {
      console.log(`  First frame dimensions: ${frames[0].frameInfo.width}x${frames[0].frameInfo.height}`);
    }
    
    return frames;
  } catch (error) {
    console.error(`  Error analyzing ${gifPath}: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Analyzing exercise GIFs for optimization...');
  console.log('='.repeat(50));
  
  for (const gifFile of gifFiles) {
    const gifPath = path.join(exercisesDir, gifFile);
    if (fs.existsSync(gifPath)) {
      await analyzeGif(gifPath);
    } else {
      console.log(`\nFile not found: ${gifPath}`);
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('Analysis complete!');
  console.log('\nNote: The GIFs appear to have multiple frames displayed simultaneously.');
  console.log('To fix this properly, the GIFs should be recreated with proper frame delays');
  console.log('and timing. Consider using an online GIF optimizer or video-to-GIF converter');
  console.log('that can properly sequence the animation frames.');
}

main().catch(console.error);
