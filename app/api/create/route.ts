import { ElevenLabsClient } from "elevenlabs";

const initializeElevenLabs = () => {
  return new ElevenLabsClient({
    apiKey: "cbb45823b2c4ddce4ffe0eeef3f5dd99"
  });
};

let abortController: AbortController | undefined;

const fetchWithRetry = async (fetchFn: () => Promise<any>, retries: number): Promise<any> => {
  try {
    return await fetchFn();
  } catch (error: any) {
    if (retries > 0 && error.name !== 'AbortError') {
      return fetchWithRetry(fetchFn, retries - 1);
    }
    throw error;
  }
};

export async function POST(req: Request) {

  if (abortController) {
    abortController.abort();
  }

  // Initialize a new AbortController for the new request
  abortController = new AbortController();

  const { message, voice } = await req.json();
  const elevenlabs = initializeElevenLabs();

  try {
    const requestFn = () => elevenlabs.generate({
      voice: voice,
      model_id: "eleven_turbo_v2",
      voice_settings: { similarity_boost: 0.5, stability: 0.0,  use_speaker_boost: true, },
      text: message,
    },{
      timeoutInSeconds: 100,
      abortSignal: abortController?.signal
    });

    const audio = await fetchWithRetry(requestFn, 3);

    return new Response(audio as any, {
      headers: { "Content-Type": "audio/mpeg" }
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return new Response(JSON.stringify({ error: 'Request aborted' }), {
        status: 499,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.statusCode || 500,
      headers: { "Content-Type": "application/json" }
    });
  } finally {
    // Reset the AbortController when the request is finished or aborted
    abortController = undefined;
  }
}
