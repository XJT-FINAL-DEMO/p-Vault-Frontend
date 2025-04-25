import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Frown, X } from 'lucide-react';
import bG1 from '../../assets/images/bp1.jpeg'
import Blog3 from '../../assets/images/blog3.jpeg'
import BLog5 from '../../assets/images/blog5.jpeg'
import Blog6 from '../../assets/images/blog6.jpeg'
import Blog7 from '../../assets/images/blog7.jpeg'
import Blog8 from '../../assets/images/blog8.jpeg'


// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Managing Diabetes: Tips for Patients',
    content: 'Diabetes management requires consistent monitoring and lifestyle adjustments. Regular blood sugar monitoring, proper diet, exercise, and medication adherence are key components. Patients should aim for balanced meals with consistent carbohydrate intake, regular physical activity tailored to their abilities, and consistent medication schedules. Regular check-ups with healthcare providers help track progress and adjust treatment plans as needed. Understanding potential complications and warning signs is also essential for long-term health management. Support groups can provide emotional assistance and practical advice for daily challenges.',
    image: bG1,
    author: 'Dr. Lisa Tetteh',
    date: 'April 15, 2025',
    views: 543,
    categories: ['Diabetes', 'Health Tips', 'Chronic Care']
  },
  {
    id: 2,
    title: 'Managing Chronic Pain: Multidisciplinary Approaches',
    content: 'Chronic pain affects millions worldwide and requires comprehensive management strategies. Combined approaches including physical therapy, medication, psychological support, and lifestyle modifications show best results. Physical therapy can improve mobility and strength while reducing pain levels. Medications should be used judiciously and with proper medical supervision. Cognitive behavioral therapy helps patients develop coping mechanisms and change negative thought patterns associated with pain. Stress management techniques including meditation, deep breathing exercises, and progressive muscle relaxation can significantly reduce pain perception. A proper balance of rest and activity prevents both deconditioning and overexertion, which can worsen pain symptoms.',
    image: Blog3,
    author: 'Dr. Michael',
    date: 'March 15, 2025',
    views: 508,
    categories: ['Pain Management', 'Chronic Care', 'Rehabilitation']
  },
  {
    id: 3,
    title: 'The Role of Diet in Diabetes Management',
    content: 'Nutrition plays a central role in diabetes control. This article discusses carbohydrate counting, the glycemic index, meal timing, and other dietary considerations for optimal glucose management. Understanding carbohydrates is essential as they have the most significant impact on blood sugar levels. Patients should learn to identify different types of carbohydrates and their effects on glucose levels. Consistent meal timing helps maintain stable blood sugar throughout the day. Portion control using measuring tools or visual guides ensures appropriate caloric intake. Increasing fiber intake through vegetables, fruits, legumes, and whole grains can improve glucose control and digestive health. Hydration is also crucial; water is the best choice, while sugary beverages should be limited or avoided.',
    image: BLog5,
    author: 'Dr. Amara Okafor',
    date: 'March 8, 2025',
    views: 876,
    categories: ['Diabetes', 'Nutrition', 'Chronic Care']
  },
  {
    id: 4,
    title: 'Exercise Therapy for Joint Health',
    content: 'Regular appropriate exercise can significantly improve joint health and mobility. This post covers safe exercises for different conditions and how to integrate them into your daily routine. Low-impact activities like swimming, cycling, and elliptical training provide cardiovascular benefits without stressing sensitive joints. Range-of-motion exercises help maintain flexibility and reduce stiffness. Strengthening the muscles surrounding affected joints can provide better support and stability. Proper warm-up and cool-down routines prevent injury and reduce post-exercise soreness. For those with severe joint pain, water therapy offers resistance with minimal joint stress. Working with physical therapists to develop personalized exercise programs ensures safety and effectiveness for your specific condition.',
    image: Blog6,
    author: 'Dr. James Wilson',
    date: 'February 28, 2025',
    views: 422,
    categories: ['Rehabilitation', 'Health Tips']
  },
  {
    id: 5,
    title: 'Understanding Blood Pressure Readings',
    content: 'Blood pressure readings can be confusing for many patients. This guide explains what the numbers mean, when to be concerned, and practical tips for monitoring at home. Blood pressure is recorded as two numbers: systolic (upper) pressure, which measures the force when the heart beats, and diastolic (lower) pressure, which measures force between beats. Ideal blood pressure is generally considered to be around 120/80 mm Hg, though normal ranges can vary by individual. Regular home monitoring provides valuable data for healthcare providers to assess treatment effectiveness. Proper measuring technique is crucial for accurate readings; patients should sit quietly for 5 minutes before measurement, position their arm correctly, and avoid caffeine or exercise for 30 minutes prior to taking readings.',
    image: Blog7,
    author: 'Dr. Lisa Kwame',
    date: 'February 15, 2025',
    views: 712,
    categories: ['Health Tips', 'Chronic Care']
  },
  {
    id: 6,
    title: 'Nutrition Myths Debunked',
    content: 'There\'s a lot of conflicting nutrition information online. This article addresses common myths and provides evidence-based recommendations for healthy eating patterns. Contrary to popular belief, carbohydrates are not inherently unhealthy; whole grains provide essential nutrients and fiber. The notion that eating fat makes you fat has been disproven; healthy fats are essential for brain function and hormone production. Cleanses and detox diets have little scientific support; the body has its own detoxification systems through the liver and kidneys. Not all calories are equal; the source matters significantly for how your body processes and utilizes energy. Nutrition needs are highly individualized based on age, sex, activity level, and medical conditions. Working with registered dietitians provides personalized guidance beyond general recommendations.',
    image: Blog8,
    author: 'Dr. Priya Patel',
    date: 'February 1, 2025',
    views: 634,
    categories: ['Nutrition', 'Health Tips']
  }
];

// Modal Component for displaying full article
function ArticleModal({ isOpen, onClose, article }) {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Modal Header */}
        <div className="relative">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.views} views</span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{article.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categories.map(category => (
              <span key={category} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {category}
              </span>
            ))}
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{article.content}</p>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// Available categories
const categories = ['All', 'Diabetes', 'Health Tips', 'Chronic Care', 'Pain Management', 'Rehabilitation', 'Nutrition'];

function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    let filtered = blogPosts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => 
        post.categories.includes(selectedCategory)
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPosts(filtered);
  }, [selectedCategory, searchTerm]);

  const openArticle = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    // Restore scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16">
      {/* Header */}
      <header className="bg-blue-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">pVault Health Blog</h1>
          <p className="mt-2">Expert health insights from our medical professionals</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="relative w-full md:w-64 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex overflow-x-auto space-x-2 pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={filteredPosts[0].image} 
                  alt={filteredPosts[0].title} 
                  className="h-64 w-full object-cover"
                />
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>{filteredPosts[0].author}</span>
                  <span className="mx-2">•</span>
                  <span>{filteredPosts[0].date}</span>
                  <span className="mx-2">•</span>
                  <span>{filteredPosts[0].views} views</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{filteredPosts[0].title}</h2>
                <p className="text-gray-600 mb-4">{filteredPosts[0].content.substring(0, 180)}...</p>
                <div className="flex flex-wrap gap-2">
                  {filteredPosts[0].categories.map(category => (
                    <span key={category} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {category}
                    </span>
                  ))}
                </div>
                <button 
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => openArticle(filteredPosts[0])}
                >
                  Read More
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img 
                src={post.image} 
                alt={post.title} 
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.views} views</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map(category => (
                    <span key={category} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {category}
                    </span>
                  ))}
                </div>
                <button 
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => openArticle(post)}
                >
                  Read Article
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Frown className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-4 text-xl font-medium text-gray-700">No articles found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <button 
              onClick={() => {setSelectedCategory('All'); setSearchTerm('');}}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* Article Modal */}
        <ArticleModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          article={selectedArticle}
        />
      </main>
    </div>
  );
}

export default BlogPage;