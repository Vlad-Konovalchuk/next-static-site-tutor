import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Post = ({ post }) => {
  return (
    <div className='card'>
      <Image
        layout='fill'
        src={post.postContent.cover_image}
        alt={post.postContent.title}
      />
      <div className='post-date'>Posted on {post.postContent.date}</div>
      <h3>{post.postContent.title}</h3>
      <p>{post.postContent.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className='btn'>Read More</a>
      </Link>
    </div>
  );
};
export default Post;
