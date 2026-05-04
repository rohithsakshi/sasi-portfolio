import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const prompts = [
  "Technical line drawing of a compact single-unit extension box with a folding lid and power cord, clean minimal sketch, pure white background, drawn with single thin dark brown lines only, no shading, no color fill, engineering sketch style",
  "Technical line drawing of a modular extensible extension box system with 3 connected socket units and a power cord with 2-pin plug, isometric view, pure white background, thin dark brown lines only, no shading, product design sketch",
  "Technical line drawing of an extension board in side elevation view showing telescoping modules of decreasing size connected by a rail, pure white background, thin dark brown lines, engineering orthographic sketch style",
  "Technical line drawing of a traditional extension board top view with ergonomic handle body, 3 groups of Indian 3-pin sockets, and a power cord, pure white background, thin dark brown lines only, no fill, product ideation sketch"
];

export async function GET() {
  const results = [];
  for (let i = 0; i < prompts.length; i++) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompts[i] }] }],
          generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
        })
      }
    );
    const data = await response.json();
    const base64 = data.candidates?.[0]?.content?.parts?.find(
      (p: any) => p.inlineData
    )?.inlineData?.data;

    if (base64) {
      const buffer = Buffer.from(base64, 'base64');
      const filePath = path.join(process.cwd(), 'public', `${i + 1}.png`);
      fs.writeFileSync(filePath, buffer);
      results.push(`${i + 1}.png saved`);
    } else {
      results.push(`${i + 1}.png failed`);
    }
  }
  return NextResponse.json({ results });
}
