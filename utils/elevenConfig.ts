// import { ElevenLabsClient, play } from "elevenlabs";

// // Initialize ElevenLabsClient
// export const initializeElevenLabs = () => {
//   return new ElevenLabsClient({
//     apiKey: "cbb45823b2c4ddce4ffe0eeef3f5dd99"
//   });
// };

// // Create an async function to handle the generation and playback
// export const generateAndPlayAudio = async ({name, text}: {name:string, text: string}) => {

//   try {
//     const elevenlabs = initializeElevenLabs();

//     const audio = await elevenlabs.generate({
//       voice: "Sarah",
//       text: `Hello from here`,
//       model_id: "eleven_multilingual_v2",
//     });

//     // Play the generated audio
//     await play(audio);
//   } catch (error) {
//     console.error("Error generating or playing audio:", error);
//   }
// };


// export const getVoices = async () => {
// try {
//   const elevenlabs = initializeElevenLabs();
//     const allVoices = await elevenlabs.voices.getAll();
//     return allVoices.voices;
//   } catch (error) {
//     console.error(error);
//   }
// };

