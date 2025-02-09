import { z } from "zod";

import { WEAPONS } from "@/lib/constants";

export const TableSchema = z.object({
  skin: z.boolean().default(true).describe("Skin for the selected weapon."),
  rr: z.boolean().default(true).default(true).describe("Ranked Rating"),
  leaderboard: z.boolean().default(true).describe("Leaderboard"),
  peakrank: z.boolean().default(true).describe("Peak Rank"),
  previousrank: z.boolean().default(false).describe("Previous Rank"),
  headshot_percent: z
    .boolean()
    .default(true)
    .describe("Headshot % from previous history."),
  winrate: z.boolean().default(true).describe("Winrate"),
  kd: z.boolean().default(false).describe("K/D Ratio"),
  level: z.boolean().default(true).describe("Player Level if not hidden."),
});

export const FlagsSchema = z.object({
  last_played: z
    .boolean()
    .default(true)
    .describe("Display last played date and time."),
  auto_hide_leaderboard: z
    .boolean()
    .default(true)
    .describe("Hide leaderboard column when nobody is on leaderboard."),
  pre_cls: z
    .boolean()
    .default(false)
    .describe("Clear Terminal before each match."),
  game_chat: z.boolean().default(true).describe("Show game chat in terminal."),
  peak_rank_act: z
    .boolean()
    .default(true)
    .describe("Peak rank for the given Act."),
  discord_rpc: z.boolean().default(true).describe("Enable Discord RPC."),
  aggregate_rank_rr: z
    .boolean()
    .default(true)
    .describe("Show aggregate rank for ranked matches."),
});

export const GeneralConfigSchema = z.object({
  weapon: z
    .enum(WEAPONS)
    .default("Vandal")
    .describe("Skins for this weapon will be shown in the table."),
  chat_limit: z
    .number()
    .int()
    .positive()
    .min(1)
    .max(100)
    .default(5)
    .describe("How many chat messages to display at once."),
});

export const ConfigSchema = GeneralConfigSchema.and(
  z.object({
    table: TableSchema.default({}),
    flags: FlagsSchema.default({}),
  }),
);
export type Config = z.infer<typeof ConfigSchema>;

export const DEFAULT_CONFIG = ConfigSchema.parse({});
