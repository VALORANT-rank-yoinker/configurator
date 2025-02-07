import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";

export function Code({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-neutral-900 text-sm text-neutral-300 rounded-lg overflow-hidden">
      {filename && <div className="bg-neutral-800 p-4">{filename}</div>}

      <pre className="px-6 py-4">
        <code className="font-mono">{code}</code>
      </pre>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={copyToClipboard}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy to clipboard</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* 
      <Button className="absolute top-2 right-2" variant="ghost">
        <CopyIcon />
      </Button> */}
    </div>
  );
}
