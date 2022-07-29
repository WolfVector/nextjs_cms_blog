import React from 'react';
import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Categories } from '../../components';

const CategoryPost = ({ posts }: any) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
        { posts.map((post: any, index: number) => {
          return <PostCard post={post} key={post.title} />
        }) }
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <Categories />
          </div>
        </div>

      </div>
      
    </div>
  );
}

export default CategoryPost

export async function getStaticProps({ params }: any) {
  const posts: any = await getCategoryPost(params.slug);

  return {
    props: { posts },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const categories: any[] = await getCategories();

  return {
    paths: categories.map(({ slug }: any) => ( { params: { slug } } )),
    fallback: 'blocking'
  };
}

