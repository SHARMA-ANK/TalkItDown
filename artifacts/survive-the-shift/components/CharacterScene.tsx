import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

export type SceneType = "grocery" | "drive-thru" | "store" | "coffee" | "office";
export type Gender = "female" | "male";

const SCENE_H = 286;
const HEAD_R = 22;
const HEAD_CY = 112;
const NECK_TOP = HEAD_CY + HEAD_R;
const NECK_BOTTOM = NECK_TOP + 10;
const BODY_TOP = NECK_BOTTOM;
const BODY_BOTTOM = 214;
const COUNTER_Y = 234;

const MOUTH_FRAMES = [
  { ry: 1.5, fill: "#c0706a" },
  { ry: 4.5, fill: "#c0392b" },
  { ry: 7.5, fill: "#962b22" },
  { ry: 5.5, fill: "#c0392b" },
  { ry: 2.5, fill: "#c0706a" },
];

const OUTFIT_COLORS: Record<SceneType, string> = {
  grocery: "#2e7d32",
  "drive-thru": "#c62828",
  store: "#0d47a1",
  coffee: "#4e342e",
  office: "#283593",
};

const OUTFIT_DARK: Record<SceneType, string> = {
  grocery: "#1b5e20",
  "drive-thru": "#8b1a1a",
  store: "#082d6b",
  coffee: "#2d1e1b",
  office: "#1a237e",
};

type Props = {
  scene: SceneType;
  gender: Gender;
  isSpeaking: boolean;
  subtitle: string;
  rage: number;
};

export default function CharacterScene({
  scene,
  gender,
  isSpeaking,
  subtitle,
  rage,
}: Props) {
  const { width } = useWindowDimensions();
  const W = Math.min(width, 520);
  const CX = W / 2;

  const [mouthFrame, setMouthFrame] = useState(0);
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const lastSubRef = useRef("");

  useEffect(() => {
    if (!isSpeaking) {
      setMouthFrame(0);
      return;
    }
    const id = setInterval(
      () => setMouthFrame((f) => (f + 1) % MOUTH_FRAMES.length),
      120
    );
    return () => clearInterval(id);
  }, [isSpeaking]);

  useEffect(() => {
    if (subtitle && subtitle !== lastSubRef.current) {
      lastSubRef.current = subtitle;
      bubbleAnim.setValue(0);
      Animated.spring(bubbleAnim, {
        toValue: 1,
        useNativeDriver: false,
        tension: 120,
        friction: 9,
      }).start();
    } else if (!subtitle) {
      Animated.timing(bubbleAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }
  }, [subtitle]);

  const mouth = MOUTH_FRAMES[mouthFrame];
  const faceColor =
    rage > 70 ? "#f4a380" : rage > 40 ? "#f5b890" : "#f5c5a3";
  const hairColor = gender === "female" ? "#5a2d0c" : "#1a0f05";
  const outfitColor = OUTFIT_COLORS[scene];
  const outfitDark = OUTFIT_DARK[scene];

  return (
    <View style={[styles.wrap, { height: SCENE_H }]}>
      <Svg width={W} height={SCENE_H}>
        {scene === "grocery" && <GroceryBg W={W} H={SCENE_H} />}
        {scene === "drive-thru" && <DriveThruBg W={W} H={SCENE_H} />}
        {scene === "store" && <StoreBg W={W} H={SCENE_H} />}
        {scene === "coffee" && <CoffeeBg W={W} H={SCENE_H} />}
        {scene === "office" && <OfficeBg W={W} H={SCENE_H} />}

        <G>
          {gender === "female" ? (
            <G>
              <Ellipse
                cx={CX}
                cy={HEAD_CY + 20}
                rx={HEAD_R + 12}
                ry={HEAD_R + 52}
                fill={hairColor}
              />
              <Circle cx={CX} cy={HEAD_CY} r={HEAD_R} fill={faceColor} />
              <Path
                d={`M ${CX - HEAD_R - 2} ${HEAD_CY - 8} C ${CX - HEAD_R + 2} ${HEAD_CY - HEAD_R - 14} ${CX + HEAD_R - 2} ${HEAD_CY - HEAD_R - 14} ${CX + HEAD_R + 2} ${HEAD_CY - 8}`}
                fill={hairColor}
              />
            </G>
          ) : (
            <G>
              <Circle cx={CX} cy={HEAD_CY} r={HEAD_R} fill={faceColor} />
              <Path
                d={`M ${CX - HEAD_R + 2} ${HEAD_CY - 12} C ${CX - HEAD_R + 4} ${HEAD_CY - HEAD_R - 9} ${CX + HEAD_R - 4} ${HEAD_CY - HEAD_R - 9} ${CX + HEAD_R - 2} ${HEAD_CY - 12}`}
                fill={hairColor}
              />
            </G>
          )}

          <Path
            d={`M ${CX - 12} ${HEAD_CY - 10} Q ${CX - 7} ${HEAD_CY - 14} ${CX - 2} ${HEAD_CY - 10}`}
            stroke={hairColor}
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d={`M ${CX + 2} ${HEAD_CY - 10} Q ${CX + 7} ${HEAD_CY - 14} ${CX + 12} ${HEAD_CY - 10}`}
            stroke={hairColor}
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
          />

          <Circle cx={CX - 8} cy={HEAD_CY - 3} r={4.5} fill="#1a0f05" />
          <Circle cx={CX + 8} cy={HEAD_CY - 3} r={4.5} fill="#1a0f05" />
          <Circle cx={CX - 6.5} cy={HEAD_CY - 5} r={1.5} fill="#fff" />
          <Circle cx={CX + 9.5} cy={HEAD_CY - 5} r={1.5} fill="#fff" />

          <Path
            d={`M ${CX - 2} ${HEAD_CY + 3} L ${CX - 4} ${HEAD_CY + 8} Q ${CX} ${HEAD_CY + 10} ${CX + 4} ${HEAD_CY + 8}`}
            stroke="#d49070"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          />

          <Ellipse
            cx={CX}
            cy={HEAD_CY + 14}
            rx={8}
            ry={mouth.ry}
            fill={mouth.fill}
          />
          {isSpeaking && mouth.ry > 3 && (
            <Rect
              x={CX - 6}
              y={HEAD_CY + 14 - mouth.ry * 0.4}
              width={12}
              height={mouth.ry * 0.5}
              fill="rgba(255,255,255,0.85)"
              rx={1}
            />
          )}

          <Rect
            x={CX - 5}
            y={NECK_TOP}
            width={10}
            height={10}
            fill="#f0b090"
            rx={2}
          />

          {gender === "female" ? (
            <G>
              <Path
                d={`M ${CX - 15} ${BODY_TOP} L ${CX + 15} ${BODY_TOP} L ${CX + 23} ${BODY_BOTTOM - 18} L ${CX - 23} ${BODY_BOTTOM - 18} Z`}
                fill={outfitColor}
              />
              <Path
                d={`M ${CX - 23} ${BODY_BOTTOM - 18} L ${CX + 23} ${BODY_BOTTOM - 18} L ${CX + 28} ${BODY_BOTTOM} L ${CX - 28} ${BODY_BOTTOM} Z`}
                fill={outfitDark}
              />
              <Path
                d={`M ${CX - 8} ${BODY_TOP} L ${CX} ${BODY_TOP + 12} L ${CX + 8} ${BODY_TOP} Z`}
                fill={outfitDark}
              />
            </G>
          ) : (
            <G>
              <Path
                d={`M ${CX - 17} ${BODY_TOP} L ${CX + 17} ${BODY_TOP} L ${CX + 22} ${BODY_BOTTOM} L ${CX - 22} ${BODY_BOTTOM} Z`}
                fill={outfitColor}
              />
              <Path
                d={`M ${CX - 8} ${BODY_TOP} L ${CX} ${BODY_TOP + 14} L ${CX + 8} ${BODY_TOP} Z`}
                fill={outfitDark}
              />
            </G>
          )}

          <Path
            d={`M ${CX - 14} ${BODY_TOP + 8} Q ${CX - 32} ${BODY_TOP + 28} ${CX - 34} ${BODY_TOP + 52}`}
            stroke={outfitColor}
            strokeWidth={15}
            strokeLinecap="round"
            fill="none"
          />
          <Path
            d={`M ${CX + 14} ${BODY_TOP + 8} Q ${CX + 32} ${BODY_TOP + 28} ${CX + 34} ${BODY_TOP + 52}`}
            stroke={outfitColor}
            strokeWidth={15}
            strokeLinecap="round"
            fill="none"
          />
          <Circle cx={CX - 34} cy={BODY_TOP + 52} r={9} fill={faceColor} />
          <Circle cx={CX + 34} cy={BODY_TOP + 52} r={9} fill={faceColor} />

          <Rect
            x={CX - 14}
            y={BODY_BOTTOM}
            width={12}
            height={COUNTER_Y - BODY_BOTTOM + 4}
            fill="#2c3e6a"
            rx={3}
          />
          <Rect
            x={CX + 2}
            y={BODY_BOTTOM}
            width={12}
            height={COUNTER_Y - BODY_BOTTOM + 4}
            fill="#2c3e6a"
            rx={3}
          />
        </G>

        {scene === "grocery" && (
          <GroceryCounter W={W} H={SCENE_H} CY={COUNTER_Y} />
        )}
        {scene === "drive-thru" && (
          <DriveThruCounter W={W} H={SCENE_H} CY={COUNTER_Y} />
        )}
        {scene === "store" && (
          <StoreCounter W={W} H={SCENE_H} CY={COUNTER_Y} />
        )}
        {scene === "coffee" && (
          <CoffeeCounter W={W} H={SCENE_H} CY={COUNTER_Y} CX={CX} />
        )}
        {scene === "office" && (
          <OfficeCounter W={W} H={SCENE_H} CY={COUNTER_Y} CX={CX} />
        )}
      </Svg>

      {subtitle.length > 0 && (
        <Animated.View
          style={[
            styles.bubble,
            {
              opacity: bubbleAnim,
              transform: [
                {
                  scale: bubbleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.94, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.bubbleText} numberOfLines={5}>
            {subtitle}
          </Text>
          <View style={[styles.bubbleTail, { left: W / 2 - 40 }]} />
        </Animated.View>
      )}
    </View>
  );
}

function GroceryBg({ W, H }: { W: number; H: number }) {
  const sw = W / 7;
  const colors1 = ["#ef5350","#42a5f5","#66bb6a","#ffca28","#ab47bc","#26c6da"];
  const colors2 = ["#26a69a","#ec407a","#8d6e63","#78909c","#ffa726","#5c6bc0"];
  const colors3 = ["#d4e157","#ef9a9a","#80cbc4","#b39ddb","#ffcc02","#a5d6a7"];
  return (
    <G>
      <Rect x={0} y={0} width={W} height={H} fill="#f0f0f0" />
      <Rect x={0} y={0} width={W} height={44} fill="#e6e6e6" />
      <Rect x={W * 0.08} y={8} width={W * 0.28} height={14} fill="#fffff0" rx={3} />
      <Rect x={W * 0.58} y={8} width={W * 0.28} height={14} fill="#fffff0" rx={3} />
      <Rect x={0} y={44} width={W} height={200} fill="#e8f0e8" />
      {[56, 96, 136, 176].map((y) => (
        <Rect key={y} x={0} y={y} width={W} height={5} fill="#b8c8b8" />
      ))}
      <Rect x={W * 0.33} y={44} width={2} height={160} fill="#a8b8a8" />
      <Rect x={W * 0.66} y={44} width={2} height={160} fill="#a8b8a8" />
      {colors1.map((c, i) => (
        <Rect key={`p1-${i}`} x={8 + i * sw} y={61} width={sw - 5} height={28} fill={c} rx={2} />
      ))}
      {colors2.map((c, i) => (
        <Rect key={`p2-${i}`} x={8 + i * sw} y={101} width={sw - 5} height={27} fill={c} rx={2} />
      ))}
      {colors3.map((c, i) => (
        <Rect key={`p3-${i}`} x={8 + i * sw} y={141} width={sw - 5} height={27} fill={c} rx={2} />
      ))}
      <Rect x={0} y={244} width={W} height={H - 244} fill="#d8e0d8" />
    </G>
  );
}

function DriveThruBg({ W, H }: { W: number; H: number }) {
  return (
    <G>
      <Rect x={0} y={0} width={W} height={H} fill="#d32f2f" />
      <Rect x={0} y={0} width={W} height={42} fill="#b71c1c" />
      <Rect x={0} y={42} width={W} height={28} fill="#ffc107" />
      <Rect x={12} y={75} width={92} height={128} fill="#111" rx={5} />
      <Rect x={18} y={81} width={80} height={116} fill="#1a1a1a" rx={3} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Rect key={`mi${i}`} x={24} y={91 + i * 22} width={62} height={9} fill="#333" rx={2} />
      ))}
      <Rect x={W - 122} y={65} width={108} height={152} fill="#87ceeb" rx={5} />
      <Rect x={W - 122} y={65} width={108} height={152} stroke="#8b6914" strokeWidth={8} fill="none" rx={5} />
      <Rect x={W - 115} y={148} width={94} height={50} fill="#1565c0" rx={10} />
      <Rect x={W - 115} y={160} width={94} height={28} fill="#1e88e5" rx={3} />
      <Circle cx={W - 92} cy={202} r={10} fill="#222" />
      <Circle cx={W - 54} cy={202} r={10} fill="#222" />
      <Rect x={0} y={244} width={W} height={H - 244} fill="#b71c1c" />
    </G>
  );
}

function StoreBg({ W, H }: { W: number; H: number }) {
  const cols = ["#29b6f6","#26c6da","#42a5f5","#1e88e5","#64b5f6","#90caf9"];
  return (
    <G>
      <Rect x={0} y={0} width={W} height={H} fill="#1976d2" />
      <Rect x={0} y={0} width={W} height={42} fill="#0d47a1" />
      <Rect x={W * 0.08} y={8} width={W * 0.34} height={16} fill="#e3f2fd" rx={3} />
      <Rect x={W * 0.54} y={8} width={W * 0.34} height={16} fill="#e3f2fd" rx={3} />
      <Rect x={0} y={42} width={W} height={218} fill="#1565c0" />
      <Rect x={W * 0.33} y={42} width={2} height={218} fill="#0d47a1" />
      <Rect x={W * 0.66} y={42} width={2} height={218} fill="#0d47a1" />
      {[78, 124, 170].map((y, row) =>
        cols.map((c, col) => (
          <Rect key={`si-${row}-${col}`} x={8 + col * (W / 7)} y={y} width={W / 8} height={33} fill={c} rx={2} />
        ))
      )}
      <Rect x={18} y={48} width={W - 36} height={26} fill="#e3f2fd" rx={5} />
      <Rect x={24} y={52} width={W - 48} height={18} fill="#1565c0" rx={3} />
      <Rect x={0} y={244} width={W} height={H - 244} fill="#bbdefb" />
    </G>
  );
}

function CoffeeBg({ W, H }: { W: number; H: number }) {
  const winW = (W - 60) / 4;
  return (
    <G>
      <Rect x={0} y={0} width={W} height={H} fill="#d7ccc8" />
      <Rect x={0} y={0} width={W} height={36} fill="#bcaaa4" />
      {[0, 1, 2, 3].map((i) => {
        const wx = 15 + i * (winW + 10);
        return (
          <G key={`cw${i}`}>
            <Rect x={wx} y={36} width={winW} height={195} fill="#87ceeb" rx={4} />
            <Rect x={wx} y={36 + winW * 0.6} width={winW} height={3} fill="#a1887f" />
            <Rect x={wx + winW / 2 - 1.5} y={36} width={3} height={195} fill="#a1887f" />
            <Rect x={wx} y={36} width={winW} height={195} stroke="#8d6e63" strokeWidth={5} fill="none" rx={4} />
          </G>
        );
      })}
      <Rect x={16} y={205} width={30} height={48} fill="#5d4037" rx={3} />
      <Circle cx={31} cy={210} r={10} fill="#4e342e" />
      <Rect x={12} y={235} width={38} height={5} fill="#3e2723" rx={2} />
      <Rect x={0} y={244} width={W} height={H - 244} fill="#bcaaa4" />
    </G>
  );
}

function OfficeBg({ W, H }: { W: number; H: number }) {
  const winW = (W - 50) / 2 - 5;
  return (
    <G>
      <Rect x={0} y={0} width={W} height={H} fill="#283593" />
      <Rect x={0} y={0} width={W} height={40} fill="#1a237e" />
      {[W / 4, W / 2, (W * 3) / 4].map((x, i) => (
        <Rect key={`ct${i}`} x={x} y={0} width={1} height={40} fill="#1a237e" />
      ))}
      <Rect x={0} y={20} width={W} height={1} fill="#1a237e" />
      {[0, 1].map((col) =>
        [0, 1].map((row) => {
          const wx = 20 + col * (winW + 10);
          const wy = 48 + row * 102;
          return (
            <G key={`ow-${col}-${row}`}>
              <Rect x={wx} y={wy} width={winW} height={88} fill={row === 0 ? "#3949ab" : "#455a64"} rx={3} />
              <Rect x={wx + winW / 2} y={wy} width={2} height={88} fill="#1a237e" />
              <Rect x={wx} y={wy + 44} width={winW} height={2} fill="#1a237e" />
              <Rect x={wx} y={wy} width={winW} height={88} stroke="#5c6bc0" strokeWidth={3} fill="none" rx={3} />
            </G>
          );
        })
      )}
      <Rect x={0} y={244} width={W} height={H - 244} fill="#1a237e" />
    </G>
  );
}

function GroceryCounter({ W, H, CY }: { W: number; H: number; CY: number }) {
  return (
    <G>
      <Rect x={0} y={CY} width={W} height={H - CY} fill="#8d9e8d" />
      <Rect x={0} y={CY} width={W} height={5} fill="#6a7a6a" />
      {Array.from({ length: 8 }).map((_, i) => (
        <Rect key={`belt${i}`} x={i * (W / 8)} y={CY + 5} width={W / 8 - 4} height={14} fill="#7a8b7a" rx={2} />
      ))}
    </G>
  );
}

function DriveThruCounter({ W, H, CY }: { W: number; H: number; CY: number }) {
  return (
    <G>
      <Rect x={0} y={CY} width={W} height={H - CY} fill="#8b6914" />
      <Rect x={0} y={CY} width={W} height={7} fill="#6b4f0e" />
    </G>
  );
}

function StoreCounter({ W, H, CY }: { W: number; H: number; CY: number }) {
  return (
    <G>
      <Rect x={0} y={CY} width={W} height={H - CY} fill="#0d47a1" />
      <Rect x={0} y={CY} width={W} height={7} fill="#082d6b" />
      <Rect x={18} y={CY + 14} width={148} height={17} fill="#1565c0" rx={3} />
    </G>
  );
}

function CoffeeCounter({
  W, H, CY, CX,
}: {
  W: number; H: number; CY: number; CX: number;
}) {
  return (
    <G>
      <Rect x={0} y={CY} width={W} height={H - CY} fill="#3e2723" />
      <Rect x={0} y={CY} width={W} height={6} fill="#2b1a17" />
      <Rect x={CX - 55} y={CY - 22} width={14} height={22} fill="#fff9c4" rx={2} />
      <Rect x={CX + 38} y={CY - 18} width={13} height={18} fill="#fff9c4" rx={2} />
    </G>
  );
}

function OfficeCounter({
  W, H, CY, CX,
}: {
  W: number; H: number; CY: number; CX: number;
}) {
  return (
    <G>
      <Rect x={0} y={CY} width={W} height={H - CY} fill="#1a237e" />
      <Rect x={0} y={CY} width={W} height={6} fill="#0d1257" />
      <Rect x={CX - 60} y={CY - 28} width={42} height={32} fill="#283593" rx={3} />
      <Rect x={CX - 56} y={CY - 24} width={34} height={24} fill="#1a237e" rx={2} />
      <Rect x={CX + 18} y={CY - 10} width={54} height={8} fill="#c5cae9" rx={1} />
      <Rect x={CX + 22} y={CY - 20} width={48} height={8} fill="#e8eaf6" rx={1} />
    </G>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    position: "relative",
  },
  bubble: {
    position: "absolute",
    top: 6,
    left: 14,
    right: 14,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#e8e8e8",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 6,
  },
  bubbleText: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    color: "#1a1a1a",
    lineHeight: 19,
  },
  bubbleTail: {
    position: "absolute",
    bottom: -16,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 16,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#ffffff",
  },
});
