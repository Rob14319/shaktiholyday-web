
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/RichTextEditor.jsx';
import pb from '@/lib/pocketbaseClient';
import { toast } from 'sonner';

const BlogForm = ({ blogData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    author: '',
    publish_date: ''
  });
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title || '',
        content: blogData.content || '',
        excerpt: blogData.excerpt || '',
        author: blogData.author || '',
        publish_date: blogData.publish_date ? blogData.publish_date.split(' ')[0] : ''
      });
    } else {
      // Set default publish date to today
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, publish_date: today }));
    }
  }, [blogData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFeaturedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('excerpt', formData.excerpt);
      data.append('author', formData.author);
      data.append('publish_date', formData.publish_date);

      if (featuredImage) {
        data.append('featured_image', featuredImage);
      }

      if (blogData) {
        await pb.collection('blogs').update(blogData.id, data, { $autoCancel: false });
        toast.success('Blog post updated successfully');
      } else {
        await pb.collection('blogs').create(data, { $autoCancel: false });
        toast.success('Blog post created successfully');
      }

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.message || 'Failed to save blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {blogData ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">
              Excerpt <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              rows={2}
              placeholder="Brief summary of the blog post"
              required
            />
          </div>

          <RichTextEditor
            label="Content"
            value={formData.content}
            onChange={(value) => handleChange('content', value)}
            placeholder="Write your blog post content here..."
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="author">
                Author <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleChange('author', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publish_date">
                Publish Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="publish_date"
                type="date"
                value={formData.publish_date}
                onChange={(e) => handleChange('publish_date', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featured_image">
              Featured Image {!blogData && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="featured_image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!blogData}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Saving...' : blogData ? 'Update Post' : 'Create Post'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
