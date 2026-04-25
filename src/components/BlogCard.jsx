
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import pb from '@/lib/pocketbaseClient';
import { format } from 'date-fns';

const getFeaturedImage = (post) => {
  if (post.featured_image) {
    return pb.files.getUrl(post, post.featured_image, { thumb: '400x300' });
  }
  
  // Custom fallbacks for the pre-generated blog posts that may be missing images
  if (post.title.includes('Kedarnath')) {
    return 'https://images.unsplash.com/photo-1613446897934-041e360c19ce?w=600&q=80';
  }
  if (post.title.includes('Varanasi')) {
    return 'https://images.unsplash.com/photo-1698224086206-4434bd4a5359?w=600&q=80';
  }
  if (post.title.includes('Mathura') || post.title.includes('Vrindavan')) {
    return 'https://images.unsplash.com/photo-1696223094612-c237206ec9f4?w=600&q=80';
  }
  if (post.title.includes('Path of Pilgrimage')) {
    return 'https://images.unsplash.com/photo-1693717779604-0210f0c6ea54?w=600&q=80';
  }

  // Default fallback
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80';
};

const BlogCard = ({ post }) => {
  const imageUrl = getFeaturedImage(post);
  const formattedDate = format(new Date(post.publish_date), 'MMM dd, yyyy');

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border-border/50">
      <div className="relative h-56 overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-primary" />
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-primary" />
            <span className="font-medium">{post.author}</span>
          </div>
        </div>
        <h3 className="text-xl font-serif font-bold mb-3 leading-snug text-foreground">
          {post.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
        <Link to={`/blog/${post.id}`} className="w-full">
          <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
