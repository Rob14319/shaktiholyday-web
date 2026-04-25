
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';
import { format } from 'date-fns';

const getFeaturedImage = (post) => {
  if (post.featured_image) {
    return pb.files.getUrl(post, post.featured_image);
  }
  
  if (post.title.includes('Kedarnath')) {
    return 'https://images.unsplash.com/photo-1613446897934-041e360c19ce?w=1200&q=80';
  }
  if (post.title.includes('Varanasi')) {
    return 'https://images.unsplash.com/photo-1698224086206-4434bd4a5359?w=1200&q=80';
  }
  if (post.title.includes('Mathura') || post.title.includes('Vrindavan')) {
    return 'https://images.unsplash.com/photo-1696223094612-c237206ec9f4?w=1200&q=80';
  }
  if (post.title.includes('Path of Pilgrimage')) {
    return 'https://images.unsplash.com/photo-1693717779604-0210f0c6ea54?w=1200&q=80';
  }

  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';
};

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const record = await pb.collection('blogs').getOne(id, { $autoCancel: false });
        setPost(record);

        // Fetch related posts (excluding current post)
        const related = await pb.collection('blogs').getList(1, 3, {
          filter: `id != "${id}"`,
          sort: '-publish_date',
          $autoCancel: false
        });
        setRelatedPosts(related.items);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        toast.error('Blog post not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-serif italic">Loading spiritual insights...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Blog post not found</p>
            <Link to="/blog">
              <Button className="rounded-full">Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const imageUrl = getFeaturedImage(post);
  const formattedDate = format(new Date(post.publish_date), 'MMMM dd, yyyy');
  const contentParagraphs = post.content.split('\n').filter(p => p.trim());

  return (
    <>
      <Helmet>
        <title>{`${post.title} - ShaktiHolyday Blog`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow">
          <article>
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
              <img 
                src={imageUrl} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <Link to="/blog" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Blog
                  </Link>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                      {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/50 backdrop-blur-sm">
                        <Calendar size={16} className="text-primary" />
                        <span className="text-sm font-medium">{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full border border-primary/50 backdrop-blur-sm">
                        <User size={16} className="text-primary" />
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary hover:prose-a:text-primary/80"
              >
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-10 border-l-4 border-primary pl-6">
                  {post.excerpt}
                </p>
                <div className="space-y-6">
                  {contentParagraphs.map((paragraph, index) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </div>
          </article>

          {relatedPosts.length > 0 && (
            <section className="bg-muted/50 py-20 border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-foreground">Discover More Spiritual Insights</h2>
                    <p className="text-muted-foreground mt-2 text-lg">Continue your journey with our other sacred readings.</p>
                  </div>
                  <Link to="/blog">
                    <Button variant="outline" className="rounded-full">
                      View All Posts
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
