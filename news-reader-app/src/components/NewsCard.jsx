import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{article.title}</h2>
        <p className="text-gray-700">{article.description || 'No description available'}</p>
        <p className="text-gray-500 text-sm mt-2">{new Date(article.publishedAt).toLocaleDateString()}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-4 block">
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
