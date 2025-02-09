import { BoltIcon } from "lucide-react";

import { Forms } from "@/components/forms";
import { GeneratedConfig } from "@/components/forms/generated-config";

export default function Home() {
  return (
    <>
      <header className="mt-10 md:mt-16">
        <h1 className="text-3xl text-neutral-100 md:text-4xl">
          VALORANT Rank Yoinker
        </h1>
        <h2 className="flex items-center gap-2 text-xl text-neutral-400 md:text-2xl">
          <BoltIcon /> Configuration Generator
        </h2>
      </header>

      <main>
        <Forms />
        <GeneratedConfig />
      </main>

      <footer className="py-6 text-center text-sm text-neutral-400">
        Made with ❤️ by{" "}
        <a href="https://github.com/tanishqmanuja">@tanishqmanuja</a>
      </footer>
    </>
  );
}
