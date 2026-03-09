"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebounce } from "@repo/ui/src/hooks/use-debounce";

export function AdminSearch({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [value, setValue] = useState(searchParams.get("q")?.toString() || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedValue) {
      params.set("q", debouncedValue);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  }, [debouncedValue, pathname, router, searchParams]);

  return (
    <div className="relative flex-1 w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zs-text-muted" />
      <input 
          type="text" 
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-zs-bg-primary/50 border border-zs-border rounded-xl pl-12 pr-4 py-3 text-sm focus:border-zs-blue focus:ring-1 focus:ring-zs-blue/20 transition-all outline-none"
      />
    </div>
  );
}
