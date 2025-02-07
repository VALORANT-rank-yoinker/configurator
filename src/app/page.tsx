"use client";

import { Code } from "@/components/code";
import {
  DEFAULT_CONFIG as DEFAULT_FLAGS,
  FlagForm,
} from "@/components/flag-form";
import { DEFAULT_CONFIG, GeneralForm } from "@/components/general-form";
import {
  DEFAULT_CONFIG as TABLE_COLUMNS,
  TableForm,
} from "@/components/table-form";
import { BoltIcon } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [config, setConfig] = useState({
    ...DEFAULT_CONFIG,
    table: TABLE_COLUMNS,
    flags: DEFAULT_FLAGS,
  });

  return (
    <>
      <header className="mt-10 mb-6 md:mt-16 md:mb-8">
        <h1 className="text-3xl md:text-4xl text-neutral-100">
          VALORANT Rank Yoinker
        </h1>
        <h2 className="text-xl md:text-2xl text-neutral-400 flex items-center gap-2">
          <BoltIcon /> Configuration Generator
        </h2>
      </header>

      <main>
        <h3 className="text-xl text-neutral-300 py-4">General Settings</h3>
        <GeneralForm
          onChange={(v) =>
            setConfig((c) => ({ ...c, ...(v as typeof DEFAULT_CONFIG) }))
          }
        />

        <h3 className="text-xl text-neutral-300 pt-10">Table Columns</h3>
        <p className="text-sm text-neutral-400 pb-4">
          Enable or disable table columns
        </p>

        <TableForm onChange={(table) => setConfig((c) => ({ ...c, table }))} />

        <h3 className="text-xl text-neutral-300 pt-10">Feature Flags</h3>
        <p className="text-sm text-neutral-400 pb-4">
          Enable or disable features
        </p>

        <FlagForm onChange={(flags) => setConfig((c) => ({ ...c, flags }))} />

        <h3 className="text-xl text-neutral-300 pt-10 pb-2">
          Generated Config
        </h3>
        <Code filename="config.json" code={JSON.stringify(config, null, 2)} />
      </main>

      <footer className="text-sm text-center text-neutral-400 py-6">
        Made with ❤️ by{" "}
        <a href="https://github.com/tanishqmanuja">@tanishqmanuja</a>
      </footer>
    </>
  );
}
