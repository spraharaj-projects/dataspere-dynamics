import React, { useState } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa6";

type CodeHighlighterProps = {
  codeBlock: string;
};

const CodeHighligher = ({ codeBlock }: CodeHighlighterProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          console.log(children);
          console.log(String(children).replace(/\n$/, ""));
          return match ? (
            <div className="relative">
              <button
                className="absolute right-0 top-0  flex flex-row p-2"
                onClick={() => {
                  handleCopy(String(children).replace(/\n$/, ""));
                }}
              >
                {copied ? (
                  <FaClipboardCheck className="text-green-600" />
                ) : (
                  <FaClipboard />
                )}
              </button>

              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                language={match[1]}
                style={dracula}
                showLineNumbers
                wrapLongLines
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    >
      {codeBlock}
    </Markdown>
  );
};

export default CodeHighligher;
