import React from 'react';
import { motion } from 'framer-motion';

// --- Types ---
interface CursorData {
    id: string;
    name: string;
    color: string;
    pathX: number[];
    pathY: number[];
    times: number[];
}

// --- Reusable SVG Cursor shape ---
const CursorIcon = ({ color }: { color: string }) => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill={color} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
        <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    </svg>
);

interface ActiveLines {
    [author: string]: number[];
}

interface CollaborativeLayerProps {
    pause?: boolean;
    activeLinesMap?: ActiveLines;
    codeLength?: number;
}

export const CollaborativeLayer = ({ pause = false, activeLinesMap = {}, codeLength = 20 }: CollaborativeLayerProps) => {

    // Derived states for positions based on real active lines
    const santyLine = activeLinesMap['Santy']?.[0];
    const elenaLine = activeLinesMap['Elena']?.[0];

    // Helper: Line height is approx 24px + 16px top padding
    const getPointForLine = (line: number, xOff: number) => ({
        x: xOff,
        y: 16 + (line - 1) * 24
    });

    // Default resting positions
    const RESTING = {
        santy: { x: 450, y: 100 },
        elena: { x: 450, y: 300 }
    };

    return (
        <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden font-mono text-sm">

            {/* Santy Cursor */}
            <motion.div
                className="absolute flex flex-col items-start transition-opacity duration-300"
                style={{ opacity: pause ? 0 : 1 }}
                initial={RESTING.santy}
                animate={santyLine ? getPointForLine(santyLine, 280) : RESTING.santy}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <CursorIcon color="#3b82f6" />
                <div className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-lg ml-3 mt-1 whitespace-nowrap bg-blue-500">
                    Santy
                </div>
            </motion.div>

            {/* Elena Cursor */}
            <motion.div
                className="absolute flex flex-col items-start transition-opacity duration-300"
                style={{ opacity: pause ? 0 : 1 }}
                initial={RESTING.elena}
                animate={elenaLine ? getPointForLine(elenaLine, 320) : RESTING.elena}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <CursorIcon color="#ec4899" />
                <div className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-lg ml-3 mt-1 whitespace-nowrap bg-pink-500">
                    Elena
                </div>
            </motion.div>

        </div>
    );
};
