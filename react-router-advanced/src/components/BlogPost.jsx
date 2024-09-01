import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams();
  return <h2>Blog Post {id}</h2>;
}

export default BlogPost;
