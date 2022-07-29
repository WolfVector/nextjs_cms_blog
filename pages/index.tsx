import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PostCard, Categories, PostWidget, FeaturedPosts } from '../components';
import { getPosts } from '../services';
/*
The parts that are commented can be use to make a pagination.
The component will load more articles when you reach the bottom

*/

//import { useRef, useEffect } from 'react';

//You must install this library
//import { ThreeDots } from  'react-loader-spinner';

const Home: NextPage = ({ posts }: any) => {
  /*const lastCreatedAt = useRef();
  const [posts, setPosts] = useState([]);
  let [loadingAnim, setLoadingAnim] = useState(null);
  
  const handleLoading = () => { return <ThreeDots color="#8c8b8b" height={80} width={60} /> }
  */

  /*function handleScroll() {
    const bottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    
    if(bottom && loadingAnim === null)  {
      setLoadingAnim(handleLoading);
      getPosts()
      .then((postsArray) => { 
        setPosts([...posts, postArra]) 
        setLoadingAnim(null);
      })
    }
  }

  useEffect(() => {
    getPosts()
    .then((postsArray) => setPosts(postsArray))
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  });*/

  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>CMS Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
        { posts.map((post: any, index: number) => {
          return <PostCard post={post.node} key={index} />
        }) }
        </div>

        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>

      </div>
      
    </div>
  )
}

export async function getStaticProps() {
  const posts: any[] = (await getPosts()) || [];
  return  {
    props: {
      posts
    }
  }
}

export default Home
