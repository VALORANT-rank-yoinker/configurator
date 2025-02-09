import { deepmerge } from "deepmerge-ts";
import { PartialDeep } from "type-fest";
import { create, ExtractState } from "zustand";
import { combine } from "zustand/middleware";

import { Config, ConfigSchema, DEFAULT_CONFIG } from "./schema";

export type ConfigState = ExtractState<typeof useConfigStore>;

export const useConfigStore = create(
  combine({ config: DEFAULT_CONFIG }, (set) => ({
    update: (value: PartialDeep<Config>) =>
      set((state) => {
        const updated = deepmerge(state.config, value);
        const result = ConfigSchema.safeParse(updated);

        if (result.success) return { config: result.data };
        return state;
      }),
  })),
);
