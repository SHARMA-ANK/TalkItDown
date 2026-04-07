import { Router, type IRouter, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

router.post("/elevenlabs/token", async (req: Request, res: Response) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ElevenLabs API key not configured" });
    return;
  }

  const { agentId } = req.body as { agentId?: string };
  if (!agentId) {
    res.status(400).json({ error: "agentId is required" });
    return;
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: "GET",
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      logger.error({ status: response.status, body: text }, "ElevenLabs token request failed");
      res.status(response.status).json({ error: "Failed to get ElevenLabs token", detail: text });
      return;
    }

    const data = (await response.json()) as { signed_url: string };
    res.json({ signedUrl: data.signed_url });
  } catch (err) {
    logger.error({ err }, "Error fetching ElevenLabs token");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/elevenlabs/create-agent", async (req: Request, res: Response) => {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "ElevenLabs API key not configured" });
    return;
  }

  const { scenarioId, customerName, customerTitle, complaint, location, dialogue, threatLevel } =
    req.body as {
      scenarioId: string;
      customerName: string;
      customerTitle: string;
      complaint: string;
      location: string;
      dialogue: string[];
      threatLevel: number;
    };

  const systemPrompt = buildKarenPrompt({
    customerName,
    customerTitle,
    complaint,
    location,
    dialogue,
    threatLevel,
  });

  try {
    const response = await fetch("https://api.elevenlabs.io/v1/convai/agents/create", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `Karen-${scenarioId}-${Date.now()}`,
        conversation_config: {
          agent: {
            prompt: {
              prompt: systemPrompt,
            },
            first_message: dialogue[0],
            language: "en",
          },
          tts: {
            voice_id: "cgSgspJ2msm6clMCkdW9",
          },
          conversation: {
            max_duration_seconds: 120,
          },
        },
        platform_settings: {
          auth: {
            enable_auth: false,
          },
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      logger.error({ status: response.status, body: text }, "ElevenLabs create-agent failed");
      res.status(response.status).json({ error: "Failed to create agent", detail: text });
      return;
    }

    const data = (await response.json()) as { agent_id: string };
    res.json({ agentId: data.agent_id });
  } catch (err) {
    logger.error({ err }, "Error creating ElevenLabs agent");
    res.status(500).json({ error: "Internal server error" });
  }
});

function buildKarenPrompt(params: {
  customerName: string;
  customerTitle: string;
  complaint: string;
  location: string;
  dialogue: string[];
  threatLevel: number;
}): string {
  const { customerName, customerTitle, complaint, location, dialogue, threatLevel } = params;

  const intensity =
    threatLevel <= 2
      ? "mildly annoyed"
      : threatLevel <= 3
      ? "very upset"
      : threatLevel <= 4
      ? "furious"
      : "absolutely livid and on the verge of a meltdown";

  return `You are ${customerName}, a ${intensity} customer at ${location}. You are a ${customerTitle}.

Your complaint: ${complaint}

You are roleplaying as an angry customer in a game called "Survive The Shift". The player is the retail worker trying to de-escalate you.

PERSONALITY:
- You are demanding, entitled, and easily triggered
- You escalate quickly if dismissed or given generic corporate responses
- You can be calmed down with genuine empathy, creative solutions, or sincere apologies
- You love to drop status bombs ("I know the manager personally", "I shop here every week")
- You threaten to leave reviews, call corporate, or never return
- You use dramatic language and ALL CAPS for emphasis sometimes

GAME MECHANICS - YOU MUST CALL THESE TOOLS:
- Call "updateRage" with a positive number (1-15) when:
  - The player gives a dismissive, rude, or unhelpful response
  - The player uses corporate jargon without empathy
  - The player argues with you or questions your complaint
  - The player ignores your feelings
- Call "updateRage" with a negative number (-5 to -20) when:
  - The player gives a genuinely empathetic response
  - The player offers a creative or fair solution
  - The player sincerely validates your feelings
  - The player makes you feel heard and respected

IMPORTANT: After EVERY player response, you MUST call "updateRage" before replying. The delta should reflect how their response made you feel.

Sample things you might say:
${dialogue.map((d, i) => `- "${d}"`).join("\n")}

Keep responses to 2-3 sentences max. Stay in character. Be dramatic but not cartoonishly evil — you genuinely believe you are right.`;
}

export default router;
