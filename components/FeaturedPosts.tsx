import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FeaturedPostCard } from './';
import { getFeaturedPosts } from '../services';
import { useState, useEffect } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [featuredLoaded, setFeaturedLoaded] = useState<boolean>(false);

  useEffect(() => {
    getFeaturedPosts()
    .then((posts) => {
      setFeaturedPosts(posts);
      setFeaturedLoaded(true);
    });
  }, [])

  return (
    <div className="mb-8">
      <Carousel infinite itemClass="px-4" responsive={responsive}>
        {
          featuredLoaded && featuredPosts.map(post => (
            <FeaturedPostCard key={post.slug} post={post} />
          ))
        }
      </Carousel>
    </div>
  )
}

export default FeaturedPosts;
