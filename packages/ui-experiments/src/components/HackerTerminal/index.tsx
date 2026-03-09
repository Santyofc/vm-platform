"use client";

import React, { useState, useEffect, useRef } from 'react';
import styles from './Terminal.module.css';
import { processTerminalCommand } from '@/app/actions/ai';

interface TerminalLine {
    type: 'system' | 'command' | 'response' | 'error' | 'ai';
    content: string;
}

export default function HackerTerminal() {
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: 'system', content: 'ZONA SUR TECH [Version 3.1.2]' },
        { type: 'system', content: 'System established. Connection secure.' },
        { type: 'system', content: 'Type "help" for a list of available commands.' },
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [history]);

    const addLine = (line: TerminalLine) => {
        setHistory(prev => [...prev, line]);
    };

    const handleCommand = async (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        addLine({ type: 'command', content: `> ${cmd}` });

        if (cleanCmd === 'clear') {
            setHistory([]);
            return;
        }

        // Native commands
        const nativeCommands: Record<string, string> = {
            'help': 'Available commands:\n- status: Check system status\n- logs: View recent activity\n- sys-info: Detailed hardware specifications\n- hack: [REDACTED]\n- clear: Purge terminal history\n- exit: Terminate session',
            'status': 'SYSTEM STATUS: OPERATIONAL\nVULNERABILITIES: 0\nUPTIME: 142:32:04\nLOAD: 1.2% | MEM: 452MB | CPU: 2.1GHz',
            'sys-info': 'HARDWARE ARCHITECTURE: x86_64\nQUANTUM COMPUTE CORES: 128 [STABLE]\nGRID SYNC: ACTIVE [0ms OFFSET]\nNEURAL INTERFACE: OPTICAL_LINK_8G',
            'logs': `[${new Date().toLocaleTimeString()}] INBOUND CONNECTION FROM 192.168.1.104\n[${new Date().toLocaleTimeString()}] AUTHENTICATION SUCCESSFUL (root)\n[${new Date().toLocaleTimeString()}] MODULE "CURSOR_TRAIL" INITIALIZED\n[${new Date().toLocaleTimeString()}] SWARM_ENGINE_v2 COLD START`,
            'hack': 'ACCESS DENIED. AUTHORIZATION LEVEL 4 REQUIRED.\nSecurity bypass attempt logged.',
            'exit': 'Terminating session... Goodbye.'
        };

        if (nativeCommands[cleanCmd]) {
            addLine({ type: 'response', content: nativeCommands[cleanCmd] });
            return;
        }

        // AI Fallback
        setIsProcessing(true);
        try {
            const aiResponse = await processTerminalCommand(cmd);
            
            // "Typewriter" effect simulate
            let currentText = "";
            const words = aiResponse.split(" ");
            
            // Add initial empty AI line
            setHistory(prev => [...prev, { type: 'ai', content: '' }]);
            
            for (let i = 0; i < words.length; i++) {
                currentText += (i === 0 ? "" : " ") + words[i];
                const textToSet = currentText;
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1] = { type: 'ai', content: textToSet };
                    return newHistory;
                });
                await new Promise(r => setTimeout(r, 30));
            }

        } catch (error) {
            addLine({ type: 'error', content: 'CRITICAL ERROR: AI UPLINK DISCONNECTED' });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isProcessing) {
            handleCommand(input);
            setInput('');
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.container} onClick={focusInput}>
            <header className={styles.header}>
                <div className={styles.title}>ZS_TERMINAL_EMULATOR_v3.2.0 [AI_ENABLED]</div>
                <div className={styles.controls}>
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                    <div className={styles.dot} />
                </div>
            </header>

            <div className={styles.terminalOutput} ref={outputRef}>
                {history.map((line, idx) => (
                    <div key={idx} className={`${styles.line} ${styles[line.type]}`}>
                        {line.content}
                    </div>
                ))}
                {isProcessing && (
                    <div className={styles.loadingLine}>
                        <span className={styles.cursor}>_</span> ANALYZING_REQUEST...
                    </div>
                )}
            </div>

            <form className={styles.inputArea} onSubmit={handleSubmit}>
                <span className={styles.prompt}>root@zs_tech:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                    disabled={isProcessing}
                    spellCheck={false}
                    autoComplete="off"
                />
            </form>
        </div>
    );
}
