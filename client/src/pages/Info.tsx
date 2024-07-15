// Import necessary libraries
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const Info = () => {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    // Fetch the README.md file
    fetch('/path/to/README.md')
      .then((response) => response.text())
      .then((text) => setReadmeContent(text));
  }, []);

  return (
    <div className="markdown-body">
      <ReactMarkdown children={readmeContent} remarkPlugins={[remarkGfm, remarkHtml]} />
    </div>
  );
};

export default Info;
