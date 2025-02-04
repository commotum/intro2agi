import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CodeBlock({ filePath }: { filePath: string }) {
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchCode() {
      const response = await fetch(`/api/code?file=${filePath}`);
      const text = await response.text();
      setCode(text);
    }
    fetchCode();
  }, [filePath]);

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!code) return <p>Loading code...</p>;

  return (
    <div className="relative rounded-lg border bg-gray-950 p-4 text-sm shadow-md">
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className={cn("overflow-x-auto language-tsx")}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
