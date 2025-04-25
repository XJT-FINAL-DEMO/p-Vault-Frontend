import { useState, useEffect } from "react";
import { Clock, Tag, Eye } from "lucide-react";
import Blog1 from '../../assets/images/blog1.jpeg'
import Blog4 from '../../assets/images/blog4.jpeg'
import BLog5 from '../../assets/images/blog5.jpeg'

export default function DoctorBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [loggedInDoctor, setLoggedInDoctor] = useState({
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Endocrinology"
  });
  const blogsPerPage = 6;

  useEffect(() => {
    // Fetch blogs from API (mock data for now)
    const mockBlogs = [
      {
        id: 1,
        title: "Managing Diabetes: Tips for Patients",
        content: "Diabetes management requires consistent monitoring and lifestyle adjustments. Regular blood sugar monitoring, proper diet, exercise, and medication adherence are key components. Patients should aim for balanced meals, regular physical activity, and maintaining a healthy weight.",
        tags: ["Diabetes", "Health Tips", "Chronic Care"],
        author: "Dr. Sarah Johnson",
        authorId: 1,
        specialty: "Endocrinology",
        date: "April 15, 2025",
        views: 543,
        image: Blog1,
      },
      {
        id: 2,
        title: "COVID-19 Variants: What You Need to Know",
        content: "As the virus continues to evolve, understanding the different variants is crucial for public health. New variants may differ in transmissibility, severity, and vaccine effectiveness. Stay informed about local prevalence and follow recommended precautions.",
        tags: ["COVID-19", "Public Health", "Vaccines"],
        author: "Dr. Michael Chen",
        authorId: 2,
        specialty: "Infectious Disease",
        date: "April 10, 2025",
        views: 1205,
        image: Blog4,
      },
      {
        id: 3,
        title: "Heart Health: Prevention Strategies for All Ages",
        content: "Cardiovascular disease remains a leading cause of mortality worldwide. Preventive measures include maintaining healthy blood pressure, cholesterol levels, regular exercise, and avoiding tobacco. Early screening can detect risk factors before symptoms develop.",
        tags: ["Cardiology", "Prevention", "Heart Health"],
        author: "Dr. Patricia Nkrumah",
        authorId: 3,
        specialty: "Cardiology",
        date: "April 5, 2025",
        views: 789,
        image: "/api/placeholder/800/400"
      },
      {
        id: 4,
        title: "Mental Health in the Workplace: Supporting Employee Wellbeing",
        content: "Employers play a crucial role in supporting mental health. Creating psychologically safe environments, offering flexible work arrangements, and providing access to resources can significantly impact employee wellbeing and productivity.",
        tags: ["Mental Health", "Workplace", "Wellbeing"],
        author: "Dr. James Wilson",
        authorId: 4,
        specialty: "Psychiatry",
        date: "March 28, 2025",
        views: 631,
        image: "/api/placeholder/800/400"
      },
      {
        id: 5,
        title: "Childhood Vaccinations: Myths and Facts",
        content: "Immunizations are essential for protecting children from serious diseases. This article addresses common misconceptions about childhood vaccines and provides evidence-based information for parents making decisions about their children's health.",
        tags: ["Pediatrics", "Vaccines", "Child Health"],
        author: "Dr. Akua Mensah",
        authorId: 5,
        specialty: "Pediatrics",
        date: "March 22, 2025",
        views: 942,
        image: "/api/placeholder/800/400"
      },
      {
        id: 6,
        title: "Managing Chronic Pain: Multidisciplinary Approaches",
        content: "Chronic pain affects millions worldwide and requires comprehensive management strategies. Combined approaches including medication, physical therapy, psychological support, and complementary therapies often provide the best outcomes for patients.",
        tags: ["Pain Management", "Chronic Care", "Rehabilitation"],
        author: "Dr. Sarah Johnson",
        authorId: 1,
        specialty: "Pain Medicine",
        date: "March 15, 2025",
        views: 508,
        image: Blog4,
      },
      {
        id: 7,
        title: "The Role of Diet in Diabetes Management",
        content: "Nutrition plays a central role in diabetes control. This article discusses carbohydrate counting, the glycemic index, meal timing, and other dietary considerations for optimal blood sugar management.",
        tags: ["Diabetes", "Nutrition", "Chronic Care"],
        author: "Dr. Sarah Johnson",
        authorId: 1,
        specialty: "Endocrinology",
        date: "March 8, 2025",
        views: 876,
        image: BLog5,
      }
    ];
    
    // Filter to only include blogs by the logged-in doctor
    const doctorBlogs = mockBlogs.filter(blog => blog.authorId === loggedInDoctor.id);
    setBlogs(doctorBlogs);
  }, [loggedInDoctor.id]);

  // Get all unique categories from blog tags
  const getAllCategories = () => {
    const allTags = blogs.flatMap(blog => blog.tags);
    const uniqueTags = ["All", ...new Set(allTags)];
    return uniqueTags;
  };

  // Filter blogs based on category and search term
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === "All" || blog.tags.includes(selectedCategory);
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === "mostViewed") {
      return b.views - a.views;
    }
    return 0;
  });

  // Pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(sortedBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 mb-1">My Blog Posts</h1>
          <p className="text-gray-600">View your published content for patients</p>
        </div>
        
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search your blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="mostViewed">Most Viewed</option>
            </select>
          </div>
        </div>
      </div>
      
      {blogs.length > 0 ? (
        <>
          <div className="mb-6 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              {getAllCategories().map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {currentBlogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {currentBlogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock size={14} className="mr-1" />
                      <span>{blog.date}</span>
                      <span className="mx-2">•</span>
                      <Eye size={14} className="mr-1" />
                      <span>{blog.views} views</span>
                    </div>
                    
                    <h2 className="text-lg font-semibold mb-2 text-blue-600">{blog.title}</h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {blog.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {blog.tags.map((tag, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === number
                        ? 'bg-blue-500 text-white'
                        : 'text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">You haven't created any blog posts yet</h2>
          <p className="text-gray-600 mb-6">Share your medical expertise with patients by creating informative blog posts.</p>
          <a href="/create-blog" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Your First Blog Post
          </a>
        </div>
      )}
    </div>
  );
}