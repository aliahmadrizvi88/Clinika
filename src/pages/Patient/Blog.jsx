import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: '10 Essential Tips for Maintaining Heart Health',
    excerpt:
      'Discover the most effective ways to keep your heart healthy and prevent cardiovascular diseases through lifestyle changes and regular check-ups.',
    author: 'Dr. Sarah Johnson',
    date: '2026-01-15',
    readTime: '5 min read',
    category: 'Cardiology',
    image: 'heart-health',
  },
  {
    id: 2,
    title: 'Understanding Diabetes: Prevention and Management',
    excerpt:
      'Learn about different types of diabetes, risk factors, and how to manage blood sugar levels through diet, exercise, and medication.',
    author: 'Dr. Michael Chen',
    date: '2026-01-12',
    readTime: '7 min read',
    category: 'Endocrinology',
    image: 'diabetes',
  },
  {
    id: 3,
    title: 'Mental Health Matters: Breaking the Stigma',
    excerpt:
      'Explore the importance of mental health awareness and discover resources for seeking help when dealing with anxiety and depression.',
    author: 'Dr. Emily Roberts',
    date: '2026-01-10',
    readTime: '6 min read',
    category: 'Psychiatry',
    image: 'mental-health',
  },
  {
    id: 4,
    title: 'Nutrition Guide for a Healthy Lifestyle',
    excerpt:
      'A comprehensive guide to balanced nutrition, understanding macronutrients, and making healthier food choices for optimal wellness.',
    author: 'Dr. James Wilson',
    date: '2026-01-08',
    readTime: '8 min read',
    category: 'Nutrition',
    image: 'nutrition',
  },
  {
    id: 5,
    title: 'The Importance of Regular Health Screenings',
    excerpt:
      'Why preventive care matters and which health screenings you should prioritize based on your age, gender, and medical history.',
    author: 'Dr. Lisa Martinez',
    date: '2026-01-05',
    readTime: '5 min read',
    category: 'Preventive Care',
    image: 'screening',
  },
  {
    id: 6,
    title: 'Sleep Hygiene: Getting Quality Rest',
    excerpt:
      'Understand the science of sleep and learn practical tips to improve your sleep quality for better physical and mental health.',
    author: 'Dr. David Thompson',
    date: '2026-01-03',
    readTime: '6 min read',
    category: 'General Health',
    image: 'sleep',
  },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImageGradient = (image) => {
    const gradients = {
      'heart-health': 'from-red-400 to-pink-500',
      diabetes: 'from-blue-400 to-cyan-500',
      'mental-health': 'from-purple-400 to-indigo-500',
      nutrition: 'from-green-400 to-emerald-500',
      screening: 'from-orange-400 to-amber-500',
      sleep: 'from-indigo-400 to-blue-500',
    };
    return gradients[image] || 'from-gray-400 to-gray-500';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#2a89b9] via-[#37a2ad] to-[#3bbb9c] text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4">
            Health Blog
          </h1>
          <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
            Stay informed with the latest health tips, medical insights, and
            wellness advice from our expert team
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{' '}
            <span className="font-semibold text-blue-600">
              {filteredPosts.length}
            </span>{' '}
            {filteredPosts.length === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <Search size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No articles found
            </h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Post Image */}
                <div
                  className={`bg-linear-to-br ${getImageGradient(post.image)} h-48 flex items-center justify-center`}
                >
                  <div className="text-white text-6xl opacity-50">📰</div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium mb-3">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar size={14} />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition">
                      Read More
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
