import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';

const PostWidget = ({ categories, slug }: any) => {
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    //If we are seeing a particular article at the moment
    //then show realted posts
    if(slug) {
      getSimilarPosts(categories, slug)
      .then(result => setRelatedPosts(result))
    }
    else { //If we are at the home page, then show recent posts
     getRecentPosts()
      .then(result => setRelatedPosts(result)) 
    }
  }, [slug])

  return (
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          { slug ? 'Related posts' : 'Recent posts' }
        </h3>
        { relatedPosts.map((post, index) => (
          <div key={index} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <img
                alt={post.title}
                height="60px"
                width="60px"
                className="align-middle rounded-full"
                src={post.featuredImage.url}
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format('MMM DD. YYYY')}
              </p>
              <Link href={`/post/${post.slug}`} key={index} className="text-md">
                { post.title }
              </Link>
            </div>
          </div>
            
        )) }
      </div>
  )
}

export default PostWidget
