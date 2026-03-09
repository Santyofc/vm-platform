"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { KernelLoader } from "../../components/ui/KernelLoader.client";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <KernelLoader path={pathname} />
      {children}
    </motion.div>
  );
}
