import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Scenario = {
  id: string;
  location: string;
  customerName: string;
  customerAge: number;
  customerTitle: string;
  complaint: string;
  threatLevel: number;
  timeEstimate: string;
  dialogue: string[];
};

export type GameResult = {
  scenarioId: string;
  customerName: string;
  location: string;
  complaint: string;
  timeSecs: number;
  ragePeak: number;
  managerUsed: boolean;
  scoreEarned: number;
  won: boolean;
  timestamp: number;
};

export type PlayerStats = {
  username: string;
  totalScore: number;
  streak: number;
  totalShifts: number;
  avgRage: number;
  personalBest: number;
  totalKarens: number;
};

type GameContextType = {
  playerStats: PlayerStats;
  history: GameResult[];
  currentScenario: Scenario | null;
  setCurrentScenario: (s: Scenario) => void;
  recordResult: (result: GameResult) => void;
  haptics: boolean;
  setHaptics: (v: boolean) => void;
  soundVolume: number;
  setSoundVolume: (v: number) => void;
  karenVolume: number;
  setKarenVolume: (v: number) => void;
  dailyBossAlerts: boolean;
  setDailyBossAlerts: (v: boolean) => void;
  isGuest: boolean;
  setIsGuest: (v: boolean) => void;
  authed: boolean;
  setAuthed: (v: boolean) => void;
};

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    location: "Register 4 — Mega Mart, Aisle 9",
    customerName: "Brenda K.",
    customerAge: 52,
    customerTitle: "HOA President",
    complaint: "Demanding refund on half-eaten rotisserie chicken",
    threatLevel: 3,
    timeEstimate: "8-12 minutes",
    dialogue: [
      "I HAVE SHOPPED HERE FOR THIRTY YEARS AND I WILL NOT BE SPOKEN TO LIKE THIS!!",
      "GET ME YOUR MANAGER. NOW. I KNOW HER PERSONALLY.",
      "This is UNACCEPTABLE. I'm disputing this with my bank.",
    ],
  },
  {
    id: "s2",
    location: "Drive-Thru — McDonald's",
    customerName: "Karen M.",
    customerAge: 45,
    customerTitle: "Facebook Group Admin",
    complaint: "Wrong sauce on burger, demands free meal",
    threatLevel: 2,
    timeEstimate: "5-8 minutes",
    dialogue: [
      "I specifically said NO pickles. Does no one listen anymore?!",
      "I'm going to leave a one-star review on EVERY platform!",
      "I want my money back AND a gift card for my trouble.",
    ],
  },
  {
    id: "s3",
    location: "Customer Service — Big Box Store",
    customerName: "Linda T.",
    customerAge: 61,
    customerTitle: "Couponing Influencer",
    complaint: "Coupon expired last year, insists it should still work",
    threatLevel: 4,
    timeEstimate: "12-20 minutes",
    dialogue: [
      "It says NEVER expires right here! Are you BLIND?",
      "I drove forty-five minutes for this. FORTY-FIVE MINUTES.",
      "I'm calling corporate. Do you have their direct number?",
    ],
  },
  {
    id: "s4",
    location: "Coffee Bar — Airport Terminal B",
    customerName: "Deborah S.",
    customerAge: 38,
    customerTitle: "Regional Manager's Wife",
    complaint: "Latte is 'the wrong temperature' — wants it remade 3 times",
    threatLevel: 5,
    timeEstimate: "15-25 minutes",
    dialogue: [
      "This is LUKEWARM. I said 140 degrees. Not 139, not 141.",
      "I have a flight in two hours so you better hurry up.",
      "My husband runs twelve of these locations, just so you know.",
    ],
  },
];

const BOSS_SCENARIO: Scenario = {
  id: "boss",
  location: "Customer Service — Corporate HQ",
  customerName: "Deborah M.",
  customerAge: 56,
  customerTitle: "Regional Manager's Wife",
  complaint: "Armed with a coupon from 2019 and absolutely nothing to lose",
  threatLevel: 5,
  timeEstimate: "20-30 minutes",
  dialogue: [
    "I have been a loyal customer since BEFORE this building existed.",
    "I spoke to the CEO at a charity gala and he said I could use this.",
    "Are you even old enough to work here? LET ME SPEAK TO SOMEONE COMPETENT.",
  ],
};

const DEFAULT_STATS: PlayerStats = {
  username: "@new_hire",
  totalScore: 0,
  streak: 0,
  totalShifts: 0,
  avgRage: 0,
  personalBest: 0,
  totalKarens: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [playerStats, setPlayerStats] = useState<PlayerStats>(DEFAULT_STATS);
  const [history, setHistory] = useState<GameResult[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [haptics, setHapticsState] = useState(true);
  const [soundVolume, setSoundVolumeState] = useState(80);
  const [karenVolume, setKarenVolumeState] = useState(100);
  const [dailyBossAlerts, setDailyBossAlertsState] = useState(true);
  const [isGuest, setIsGuestState] = useState(false);
  const [authed, setAuthedState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("game_state");
        if (stored) {
          const data = JSON.parse(stored);
          if (data.playerStats) setPlayerStats(data.playerStats);
          if (data.history) setHistory(data.history);
          if (typeof data.haptics === "boolean") setHapticsState(data.haptics);
          if (typeof data.soundVolume === "number") setSoundVolumeState(data.soundVolume);
          if (typeof data.karenVolume === "number") setKarenVolumeState(data.karenVolume);
          if (typeof data.dailyBossAlerts === "boolean") setDailyBossAlertsState(data.dailyBossAlerts);
          if (typeof data.isGuest === "boolean") setIsGuestState(data.isGuest);
          if (typeof data.authed === "boolean") setAuthedState(data.authed);
        }
      } catch (_) {}
    })();
  }, []);

  const persist = useCallback(
    async (
      stats: PlayerStats,
      hist: GameResult[],
      prefs: {
        haptics: boolean;
        soundVolume: number;
        karenVolume: number;
        dailyBossAlerts: boolean;
        isGuest: boolean;
        authed: boolean;
      }
    ) => {
      try {
        await AsyncStorage.setItem(
          "game_state",
          JSON.stringify({ playerStats: stats, history: hist, ...prefs })
        );
      } catch (_) {}
    },
    []
  );

  const recordResult = useCallback(
    (result: GameResult) => {
      setHistory((prev) => {
        const next = [result, ...prev].slice(0, 50);
        setPlayerStats((prevStats) => {
          const wins = next.filter((r) => r.won);
          const avgRage =
            next.length > 0
              ? Math.round(next.reduce((a, r) => a + r.ragePeak, 0) / next.length)
              : 0;
          const bestSecs =
            wins.length > 0
              ? Math.min(...wins.map((r) => r.timeSecs))
              : prevStats.personalBest;
          const newStats: PlayerStats = {
            ...prevStats,
            totalScore: prevStats.totalScore + result.scoreEarned,
            totalShifts: prevStats.totalShifts + 1,
            totalKarens: prevStats.totalKarens + 1,
            avgRage,
            personalBest: bestSecs,
            streak: result.won ? prevStats.streak + 1 : 0,
          };
          persist(newStats, next, {
            haptics,
            soundVolume,
            karenVolume,
            dailyBossAlerts,
            isGuest,
            authed,
          });
          return newStats;
        });
        return next;
      });
    },
    [haptics, soundVolume, karenVolume, dailyBossAlerts, isGuest, authed, persist]
  );

  const setHaptics = (v: boolean) => {
    setHapticsState(v);
    persist(playerStats, history, { haptics: v, soundVolume, karenVolume, dailyBossAlerts, isGuest, authed });
  };
  const setSoundVolume = (v: number) => {
    setSoundVolumeState(v);
    persist(playerStats, history, { haptics, soundVolume: v, karenVolume, dailyBossAlerts, isGuest, authed });
  };
  const setKarenVolume = (v: number) => {
    setKarenVolumeState(v);
    persist(playerStats, history, { haptics, soundVolume, karenVolume: v, dailyBossAlerts, isGuest, authed });
  };
  const setDailyBossAlerts = (v: boolean) => {
    setDailyBossAlertsState(v);
    persist(playerStats, history, { haptics, soundVolume, karenVolume, dailyBossAlerts: v, isGuest, authed });
  };
  const setIsGuest = (v: boolean) => {
    setIsGuestState(v);
    persist(playerStats, history, { haptics, soundVolume, karenVolume, dailyBossAlerts, isGuest: v, authed });
  };
  const setAuthed = (v: boolean) => {
    setAuthedState(v);
    persist(playerStats, history, { haptics, soundVolume, karenVolume, dailyBossAlerts, isGuest, authed: v });
  };

  return (
    <GameContext.Provider
      value={{
        playerStats,
        history,
        currentScenario,
        setCurrentScenario,
        recordResult,
        haptics,
        setHaptics,
        soundVolume,
        setSoundVolume,
        karenVolume,
        setKarenVolume,
        dailyBossAlerts,
        setDailyBossAlerts,
        isGuest,
        setIsGuest,
        authed,
        setAuthed,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}

export { SCENARIOS, BOSS_SCENARIO };
