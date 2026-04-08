import { Router, type IRouter, type Request, type Response } from "express";
import { ElevenLabsClient } from "elevenlabs";
import Anthropic from "@anthropic-ai/sdk";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const KAREN_VOICE_ID = "EXAVITQu4vr4xnSDxMaL";
const MANAGER_VOICE_ID = "TxGEqnHWrfWFTfGW9XjX";

function getElevenLabs(): ElevenLabsClient {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set");
  return new ElevenLabsClient({ apiKey });
}

function getAnthropic(): Anthropic {
  const apiKey =
    process.env.ANTHROPIC_API_KEY ||
    process.env.AI_INTEGRATIONS_ANTHROPIC_API_KEY;
  const baseURL = process.env.AI_INTEGRATIONS_ANTHROPIC_BASE_URL;
  return new Anthropic({ apiKey, ...(baseURL ? { baseURL } : {}) });
}

async function ttsStream(text: string, voiceId: string, isKaren: boolean, res: Response) {
  const client = getElevenLabs();
  const audioStream = await client.textToSpeech.convert(voiceId, {
    text,
    model_id: "eleven_turbo_v2_5",
    voice_settings: {
      stability: isKaren ? 0.3 : 0.75,
      similarity_boost: 0.75,
      style: isKaren ? 0.85 : 0.2,
      use_speaker_boost: true,
    },
  });
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Cache-Control", "no-cache");
  for await (const chunk of audioStream) {
    res.write(chunk);
  }
  res.end();
}

/**
 * POST /api/voice/tts
 * { text: string, voice?: "karen" | "manager" }
 */
router.post("/voice/tts", async (req: Request, res: Response) => {
  const { text, voice = "karen" } = req.body as { text?: string; voice?: string };
  if (!text || typeof text !== "string" || text.trim().length === 0) {
    res.status(400).json({ error: "text is required" });
    return;
  }
  try {
    const voiceId = voice === "manager" ? MANAGER_VOICE_ID : KAREN_VOICE_ID;
    await ttsStream(text.trim(), voiceId, voice !== "manager", res);
  } catch (err) {
    req.log.error({ err }, "TTS error");
    if (!res.headersSent) res.status(502).json({ error: "Voice generation failed" });
  }
});

/**
 * POST /api/voice/ambient
 * { scene: string }
 */
const AMBIENT_TEXT: Record<string, string> = {
  grocery: "checkout beeps and scanner sounds, shopping cart wheels rolling on tile floor, distant store intercom announcement, refrigerator hum",
  "drive-thru": "car engine idling, drive through order intercom static crackle, distant traffic noise, muffled radio music",
  store: "soft background retail music, footsteps on hard floor, distant checkout activity, air conditioning hum",
  coffee: "espresso machine hissing steam, coffee grinder whirring, ceramic cups clinking, soft cafe background murmur",
  office: "keyboard typing clicks, office phone ringing, printer sounds, air conditioning hum, muffled conversation",
};

router.post("/voice/ambient", async (req: Request, res: Response) => {
  const { scene = "grocery" } = req.body as { scene?: string };
  const text = AMBIENT_TEXT[scene] ?? AMBIENT_TEXT["grocery"];
  try {
    const client = getElevenLabs();
    const audioStream = await client.textToSpeech.convert("21m00Tcm4TlvDq8ikWAM", {
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.1, similarity_boost: 0.3, style: 0.0, use_speaker_boost: false },
    });
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    for await (const chunk of audioStream) res.write(chunk);
    res.end();
  } catch (err) {
    req.log.error({ err }, "Ambient error");
    if (!res.headersSent) res.status(502).json({ error: "Ambient generation failed" });
  }
});

type HistoryEntry = { role: "user" | "karen"; text: string };

/**
 * POST /api/voice/respond
 * Real conversational response from the customer.
 * userText can be empty string to simulate silence/no response from user.
 * Returns audio/mpeg with headers:
 *   X-Karen-Text: base64 encoded Karen's response text
 *   X-Rage-Delta: number (-35 to +35)
 *   X-Game-Over: "win" | "lose" | ""
 */
router.post("/voice/respond", async (req: Request, res: Response) => {
  const {
    userText,
    customerName,
    customerTitle,
    complaint,
    location,
    history = [],
    rage = 50,
    silenceCount = 0,
  } = req.body as {
    userText: string;
    scenarioId?: string;
    customerName: string;
    customerTitle: string;
    complaint: string;
    location: string;
    history: HistoryEntry[];
    rage: number;
    silenceCount?: number;
  };

  const isSilent = !userText || userText.trim().length === 0;

  const isResolved = !isSilent && (() => {
    const lower = userText.toLowerCase();
    return (lower.includes("refund") || lower.includes("resolved") || lower.includes("taken care") ||
      lower.includes("fixed") || lower.includes("coupon") || lower.includes("compensation") ||
      lower.includes("applied") || lower.includes("credited")) && rage < 40;
  })();

  const systemPrompt = `You are ${customerName}, a ${customerTitle} at ${location}.
Your complaint: "${complaint}".
Your current rage level is ${Math.round(rage)}/100 — 0 is perfectly calm and satisfied, 100 is storming out furiously.

You are in a REAL customer service interaction. Keep responses SHORT — 1-2 sentences only.
Do NOT use stage directions or asterisk actions like *sighs*. Speak only in dialogue.

${isSilent && silenceCount === 0 ? `The employee hasn't responded yet. Say something to get their attention.` : ""}
${isSilent && silenceCount === 1 ? `The employee is STILL not responding. Get more impatient.` : ""}
${isSilent && silenceCount >= 2 ? `The employee keeps ignoring you. Get very angry.` : ""}
${isResolved ? `The employee has just resolved your complaint — "${userText.trim()}". The issue is FIXED. You are satisfied and grateful. Say a brief thank you and that you're happy it was resolved. This is the END of the interaction.` : ""}
${!isSilent && !isResolved ? `The employee just said: "${userText.trim()}"
React genuinely: calm down if they were helpful, get angrier if they were dismissive or rude.` : ""}

After your response, output EXACTLY this format on its own line:
<rage_delta>{"delta": NUMBER, "reason": "SHORT_REASON"}</rage_delta>

Delta rules:
- Silence: +${silenceCount >= 2 ? "20 to +30" : silenceCount === 1 ? "12 to +20" : "8 to +12"}
- Polite and empathetic: -8 to -20
- Offered real solution or compensation: -20 to -35
- Vague or unhelpful: +3 to +10
- Dismissive or rude: +10 to +25
- CRITICAL: If complaint is now resolved and customer is satisfied, set delta so rage reaches 0 and put GAME_OVER_WIN in the reason
- CRITICAL: If the employee resolved the issue and you just said thank you, output: {"delta": -${Math.round(rage)}, "reason": "GAME_OVER_WIN - complaint resolved and customer is satisfied"}
- If rage exceeds 100, put GAME_OVER_LOSE in the reason`;

  const messages: Anthropic.MessageParam[] = [];

  for (const h of history.slice(-8)) {
    messages.push({
      role: h.role === "user" ? "user" : "assistant",
      content: h.text,
    });
  }

  if (isSilent) {
    messages.push({ role: "user", content: "[silence - employee did not respond]" });
  } else {
    messages.push({ role: "user", content: userText.trim() });
  }

  try {
    const anthropic = getAnthropic();
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      system: systemPrompt,
      messages,
    });

    const fullText = response.content[0].type === "text" ? response.content[0].text : "";

    const deltaMatch = fullText.match(/<rage_delta>(.*?)<\/rage_delta>/s);
    let rageDelta = isSilent ? (silenceCount >= 2 ? 25 : silenceCount === 1 ? 18 : 10) : 5;
    let gameOver = "";

    if (deltaMatch) {
      try {
        const parsed = JSON.parse(deltaMatch[1]);
        rageDelta = Math.max(-35, Math.min(35, Number(parsed.delta) || rageDelta));
        const reason = (parsed.reason || "").toLowerCase();
        req.log.info({ userText, rageBefore: rage, rageDelta, reason }, "rage delta");
        if (reason.includes("game_over_win") || rage + rageDelta <= 0) gameOver = "win";
        if (reason.includes("game_over_lose") || rage + rageDelta >= 100) gameOver = "lose";
      } catch {
        // keep default
      }
    } else {
      req.log.warn({ userText, rageBefore: rage, rageDelta, fullText: fullText.slice(0, 200) }, "no rage_delta tag found, using default");
    }

    const spokenText = fullText
      .replace(/<rage_delta>.*?<\/rage_delta>/s, "")
      .replace(/\*[^*]+\*/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();

    res.setHeader("X-Karen-Text", Buffer.from(spokenText.slice(0, 500)).toString("base64"));
    res.setHeader("X-Rage-Delta", String(rageDelta));
    res.setHeader("X-Game-Over", gameOver);

    await ttsStream(spokenText || "Hello?! Are you even listening to me?!", KAREN_VOICE_ID, true, res);
  } catch (err) {
    req.log.error({ err }, "AI respond error");
    if (!res.headersSent) res.status(502).json({ error: "Response generation failed" });
  }
});

export default router;
