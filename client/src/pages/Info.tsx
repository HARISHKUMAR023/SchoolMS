import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const Info = () => {
  const [readmeContent, setReadmeContent] = useState('');

  useEffect(() => {
    // Fetch the README.md file
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => setReadmeContent(text))
      .catch((error) => console.error('Error fetching README.md:', error));
  }, []);

  return (
    <div className="markdown-body p-2 m-2 rounded-md bg-primary">
      <ReactMarkdown children={readmeContent} remarkPlugins={[remarkGfm, remarkHtml]} />
    </div>
  );
};

export default Info;
