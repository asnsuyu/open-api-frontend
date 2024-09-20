import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import "highlight.js/styles/github.css";

interface CodeBlockProps {
  language?: string;
  code?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'json', code = '{}' }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  return (
    <code ref={codeRef} className={language}>
      {code}
    </code>
  );
};

export default CodeBlock;
