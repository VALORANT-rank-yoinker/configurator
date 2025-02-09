"use client";

import { Code } from "../code";
import { useConfigStore } from "./store";

export function GeneratedConfig() {
  const config = useConfigStore((state) => state.config);
  return (
    <>
      <h3 className="pt-10 pb-2 text-xl text-neutral-300">Generated Config</h3>
      <Code filename="config.json" code={JSON.stringify(config, null, 2)} />
    </>
  );
}
