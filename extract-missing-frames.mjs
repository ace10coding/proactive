#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const exercisesDir = './public/images/exercises';
const gifs = ['barbell-front-raises.gif','barbell-upright-rows.gif'];

async function extract(gifFile){
  const gifPath = path.join('./public/images', gifFile);
  if(!fs.existsSync(gifPath)){
    console.log('Not found', gifPath); return;
  }
  const baseName = path.basename(gifFile, '.gif');
  const buffer = fs.readFileSync(gifPath);
  const meta = await sharp(buffer, {animated:true}).metadata();
  const frames = meta.pages || 2;
  console.log(`Processing ${gifFile}, frames: ${frames}`);
  for(let i=0;i<frames;i++){
    const out = await sharp(buffer, {animated:true, page:i}).png().toBuffer();
    const outPath = path.join(exercisesDir, `${baseName}-${i+1}.png`);
    fs.writeFileSync(outPath,out);
    console.log('Wrote', outPath);
  }
}

async function main(){
  for(const g of gifs){
    await extract(g);
  }
  console.log('Done');
}

main().catch(console.error);
