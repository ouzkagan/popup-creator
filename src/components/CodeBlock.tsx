/* eslint-disable react/no-children-prop */
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism.css';
import PrismCode from 'react-prism';

import { useEffect } from 'react';

// require('prismjs/components/prism-javascript');

// require('prismjs/components/prism-css');

// require('prismjs/components/prism-jsx');
type CodeBlockProps = {
  codeString: string;
};

const CodeBlock = ({ codeString }: CodeBlockProps) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, []);

  // return <ReactMarkdown>{codeString}</ReactMarkdown>;
  // return <ReactMarkdown children={codeString} />;
  return <PrismCode className="language-html">{codeString}</PrismCode>;
};

export default CodeBlock;
