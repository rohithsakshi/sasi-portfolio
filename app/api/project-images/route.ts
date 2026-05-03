import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
        })
      }
    );

    const data = await response.json();
    const base64 = data.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;

    if (base64) {
      return NextResponse.json({ image: `data:image/png;base64,${base64}` });
    }

    return NextResponse.json({ error: 'No image generated' }, { status: 500 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
