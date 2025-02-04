import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  theme: 'github-dark',
  keepBackground: true,
};

export default function CodeBlock({ filePath }: { filePath?: string }) {
  const [code, setCode] = useState<string | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchCode() {
      if (!filePath) return;
      const response = await fetch(`/api/code?file=${filePath}`);
      const text = await response.text();
      setCode(text);
    }
    fetchCode();
  }, [filePath]);

  useEffect(() => {
    async function highlightCode() {
      if (!code || !filePath) return;
      
      const ext = filePath?.split('.').pop() || 'tsx';
      const markdown = `\`\`\`${ext}\n${code}\n\`\`\``;
      
      const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, options)
        .use(rehypeStringify)
        .process(markdown);

      setHighlightedCode(String(file));
    }
    
    highlightCode();
  }, [code, filePath]);

  const copyToClipboard = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!filePath) return <p>No file specified</p>;
  if (!highlightedCode) return <p>Loading code...</p>;

  return (
    <div className="relative rounded-lg border bg-[#0d1117] p-4 text-sm shadow-md">
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10"
      >
        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
      </Button>
      <div 
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className="overflow-x-auto [&_pre]:!bg-transparent [&_pre]:p-0"
      />
    </div>
  );
}
