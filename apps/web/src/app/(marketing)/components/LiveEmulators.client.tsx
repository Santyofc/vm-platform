"use client";
/**
 * LiveEmulators — Client Component
 *
 * Contains all the heavy client-only logic:
 * - Demo step animation (setTimeout loop)
 * - IDEEmulator + DeviceEmulator (dynamically imported)
 * - Intersection Observer: the loop only starts when this section is in view
 *
 * Key improvements vs the old page.tsx:
 * 1. Three separate useState calls → one useReducer (eliminates triple re-renders)
 * 2. rAF loop replaced by setTimeout (simpler, no need for 60fps here)
 * 3. IO guard: demo doesn't start until the section enters the viewport
 * 4. clearTimeout properly called on cleanup
 */
import { useEffect, useReducer, useRef } from "react";
import dynamic from "next/dynamic";

// ---------------------------------------------------------------------------
// Heavy components — deferred until the section enters the viewport
// ---------------------------------------------------------------------------
const IDEEmulator = dynamic(
  () => import("@repo/ui-experiments").then((m) => ({ default: m.IDEEmulator })),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-zs-bg-secondary/50 rounded-[2rem]" /> }
);

const DeviceEmulator = dynamic(
  () => import("@repo/ui-experiments").then((m) => ({ default: m.DeviceEmulator })),
  { ssr: false, loading: () => <div className="w-full h-full animate-pulse bg-zs-bg-secondary/50 rounded-[2rem]" /> }
);

// ---------------------------------------------------------------------------
// Demo step data (static — defined outside component to avoid recreation)
// ---------------------------------------------------------------------------
const INITIAL_CODE = `import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Lock, Activity, Globe } from "lucide-react";

export const GlobalDashboard = () => {
  const [metrics, setMetrics] = useState(null);

  // 1. Initialize Core State
  usePulseEngineSystem();

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      {/* 2. Global Power Mesh (Background Orbs) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-zs-blue/20 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zs-violet/10 blur-[150px] rounded-full mix-blend-screen" />

      {/* 3. Main Bento Architecture */}
      <div className="relative z-10 grid grid-cols-12 gap-6 p-8 h-screen">
        
        {/* Identity Gateway (Sidebar) */}
        <div className="col-span-3 custom-glass-panel rounded-3xl p-6 border border-white/5">
          <IdentityHub session={activeSession} />
        </div>

        {/* Nucleus Analytics (Main Central View) */}
        <div className="col-span-9 flex flex-col gap-6">
          <div className="h-2/3 custom-glass-panel rounded-3xl p-8 border border-white/5 flex items-center justify-center relative overflow-hidden">
             <GlobeVisualization nodes={64} active={true} />
          </div>

          {/* Real-time Telemetry (Bottom row) */}
          <div className="h-1/3 grid grid-cols-3 gap-6">
             <MetricCard title="E2E Latency" value="12ms" icon={<Activity />} trend="up" />
             <MetricCard title="Active Connections" value="1.2M" icon={<Globe />} />
             <MetricCard title="Threat Blocks" value="0.0%" icon={<Lock />} status="secure" />
          </div>
        </div>
      </div>
    </div>
  );
};`;

const DEMO_STEPS = [
  { author: "Santy", line: 33, target: 'value="12ms"', replacement: 'value="8ms"' },
  { author: "Elena", line: 28, target: "nodes={64}", replacement: "nodes={128}" },
  { author: "Santy", line: 34, target: 'value="1.2M"', replacement: 'value="2.4M"' },
  { author: "Elena", line: 35, target: 'value="0.0%"', replacement: 'value="100%"' },
  { author: "Santy", line: 33, target: 'value="8ms"', replacement: 'value="4ms"' },
  { author: "Elena", line: 28, target: "nodes={128}", replacement: "nodes={256}" },
] as const;

// ---------------------------------------------------------------------------
// State — consolidated into useReducer to avoid triple render per step
// ---------------------------------------------------------------------------
interface DemoState {
  code: string;
  activeLines: Record<string, number[]>;
  stepIndex: number;
}

type DemoAction =
  | { type: "STEP"; author: string; line: number; target: string; replacement: string; stepIndex: number }
  | { type: "RESET" };

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "STEP":
      return {
        code: state.code.replace(action.target, action.replacement),
        activeLines: { ...state.activeLines, [action.author]: [action.line] },
        stepIndex: action.stepIndex,
      };
    case "RESET":
      return { code: INITIAL_CODE, activeLines: {}, stepIndex: 0 };
  }
}

// ---------------------------------------------------------------------------
// Helpers — parse metrics from the current code string
// ---------------------------------------------------------------------------
function parseMetrics(code: string) {
  return {
    latency: code.match(/value="(.*?ms)"/)?.[1] ?? "12ms",
    nodes: parseInt(code.match(/nodes=\{(\d+)\}/)?.[1] ?? "64", 10),
    connections: code.match(/value="([\d.A-Z]+)" icon=\{<Globe/)?.[1] ?? "1.2M",
    threats: code.match(/value="([\d.%]+)" icon=\{<Lock/)?.[1] ?? "0.0%",
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function LiveEmulators() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isVisibleRef = useRef(false);

  const [state, dispatch] = useReducer(demoReducer, {
    code: INITIAL_CODE,
    activeLines: {},
    stepIndex: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function runStep() {
      if (!isVisibleRef.current) return;

      if (stepRef.current < DEMO_STEPS.length) {
        const step = DEMO_STEPS[stepRef.current];
        dispatch({
          type: "STEP",
          author: step.author,
          line: step.line,
          target: step.target,
          replacement: step.replacement,
          stepIndex: stepRef.current,
        });
        stepRef.current++;
        timeoutRef.current = setTimeout(runStep, 2000 + Math.random() * 1500);
      } else {
        // Hold at end, then reset
        timeoutRef.current = setTimeout(() => {
          stepRef.current = 0;
          dispatch({ type: "RESET" });
          timeoutRef.current = setTimeout(runStep, 500);
        }, 8000);
      }
    }

    // IO guard — only start the loop when section enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && stepRef.current === 0) {
          timeoutRef.current = setTimeout(runStep, 3000);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const metrics = parseMetrics(state.code);

  return (
    <section ref={sectionRef} className="py-32 relative z-10 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            Ecosistema{" "}
            <span className="text-zs-blue drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Full-Stack
            </span>
          </h2>
          <p className="text-zs-text-secondary max-w-2xl mx-auto">
            Desde la escritura de código colaborativa en tiempo real hasta la
            previsualización instantánea multi-dispositivo. La herramienta
            definitiva para arquitectos de software.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto items-stretch">
          {/* IDE Emulator */}
          <div className="flex flex-col h-[900px] w-full relative group perspective-[2000px]">
            <div className="absolute -inset-4 bg-gradient-to-r from-zs-cyan/20 to-zs-blue/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-[2rem]" />
            <div className="flex-1 relative z-10 transition-transform duration-700 ease-out group-hover:rotate-y-[1deg] group-hover:scale-[1.01] rounded-[2rem] overflow-hidden border border-zs-border/50 bg-zs-bg-primary">
              <div className="absolute inset-0">
                <IDEEmulator code={state.code} activeLines={state.activeLines} />
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2 shrink-0">
                Entorno Colaborativo
              </h3>
              <p className="text-xs text-zs-text-muted shrink-0">
                Presencia en tiempo real, cursores compartidos y terminal de build sincronizada.
              </p>
            </div>
          </div>

          {/* Device Emulator */}
          <div className="flex flex-col h-[900px] w-full relative group perspective-[2000px]">
            <div className="absolute -inset-4 bg-gradient-to-l from-zs-violet/20 to-zs-blue/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity rounded-[2rem]" />
            <div className="flex-1 relative z-10 transition-transform duration-700 ease-out group-hover:-rotate-y-[1deg] group-hover:scale-[1.01] rounded-[2rem] overflow-hidden border border-zs-border/50 bg-zs-bg-primary">
              <div className="absolute inset-0">
                <DeviceEmulator currentStep={state.stepIndex} metrics={metrics} />
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-2 shrink-0">
                Previsualización Real
              </h3>
              <p className="text-xs text-zs-text-muted shrink-0">
                Hardware shell interactivo en 4K. De Desktop a Mobile con zero latencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
