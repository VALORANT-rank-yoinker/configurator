"use client";

import {
  DEFAULT_CONFIG as DEFAULT_FLAGS,
  FlagForm,
} from "@/components/flag-form";
import { GeneralForm } from "@/components/general-form";
import {
  DEFAULT_CONFIG as TABLE_COLUMNS,
  TableForm,
} from "@/components/table-form";
import { useState } from "react";

export default function Home() {
  const [config, setConfig] = useState({
    table: TABLE_COLUMNS,
    flags: DEFAULT_FLAGS,
  });

  return (
    <>
      <header className="mt-10 mb-6 md:mt-16 md:mb-8">
        <h1 className="text-3xl md:text-4xl text-neutral-100">
          VALORANT Rank Yoinker
        </h1>
        <h2 className="text-xl md:text-2xl text-neutral-400">
          Configuration Generator
        </h2>
      </header>
      <main>
        <h3 className="text-xl text-neutral-300 py-4">General Settings</h3>
        <GeneralForm />

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

        <h3 className="text-xl text-neutral-300 pt-10">Generated Config</h3>
        <code>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </code>
      </main>
      <footer className="text-sm text-neutral-400 mt-4">
        Made with ❤️ by{" "}
        <a href="https://github.com/tanishqmanuja">@tanishqmanuja</a>
      </footer>
    </>
  );
}
