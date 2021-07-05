import React from 'react';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';
import Link from 'next/link';
import { POSTS_FOLDER_NAME } from '../../constants';

const PostPage = ({
  content,
  frontContentMatter: { title, date, cover_image },
}) => {
  return (
    <>
      <Link href='/'>Go Back</Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <Image
          layout='fill'
          objectFit='cover'
          src={cover_image}
          alt='Post cover image'
        />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};
export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(POSTS_FOLDER_NAME));
  const paths = files.map((f) => ({
    params: {
      slug: f.replace('md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join(POSTS_FOLDER_NAME, `${slug}md`),
    'utf-8'
  );

  const { data: frontContentMatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontContentMatter,
      content,
      slug,
    },
  };
}
