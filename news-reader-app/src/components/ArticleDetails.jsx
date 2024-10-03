import React from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((art) => art.uuid === id);

  if (!article) {
    return <p>Article not found!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <img src={article.image_url} alt={article.title} className="w-full h-auto mb-4" />
      <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
      <p><strong>Source:</strong> {article.source}</p>
      <p><strong>Published:</strong> {new Date(article.published_at).toLocaleString()}</p>
      <p className="mt-4">{article.content || 'Full content not available'}</p>
      <a href={article.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Read full article</a>
    </div>
  );
};

export default ArticleDetails;
