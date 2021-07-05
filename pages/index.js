import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import matter from 'gray-matter';
import { POSTS_FOLDER_NAME } from '../constants';
import Post from '../components/Post';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(POSTS_FOLDER_NAME));
  const posts = files.map((f) => {
    const slug = f.replace('md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join(POSTS_FOLDER_NAME, f),
      'utf-8'
    );

    const { data: postContent } = matter(markdownWithMeta);
    return {
      slug,
      postContent,
    };
  });
  return {
    props: {
      posts,
    },
  };
}
