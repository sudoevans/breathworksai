import { ElevenLabsClient } from "elevenlabs";

const initializeElevenLabs = () => {
  return new ElevenLabsClient({
    apiKey: "cbb45823b2c4ddce4ffe0eeef3f5dd99"
  });
};
export async function POST(req: Request) {
  const { message, voice } = await req.json();

  const elevenlabs = initializeElevenLabs();

  try {
    const audio = await elevenlabs.generate({
      voice: "FGY2WhTYpPnrIDTdsKH5",
      model_id: "eleven_turbo_v2",
      voice_settings: { similarity_boost: 0.5, stability: 0.5 },
      text: message,
    },{timeoutInSeconds: 50});

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (error: any) {
    console.error('Error generating audio:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
