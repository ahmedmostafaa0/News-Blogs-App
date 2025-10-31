import { useEffect, useState } from "react";
import Blogs from "./Components/Blogs";
import News from "./Components/News";

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedBlogs = localStorage.getItem("blogs");
    setBlogs(JSON.parse(savedBlogs));
  }, []);

  const handleShowBlogs = () => {
    setShowBlogs(true);
    setShowNews(false);
  };

  const handleBackToNews = () => {
    setShowBlogs(false);
    setShowNews(true);
  };

  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit
        ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog))
        : [...prevBlogs, newBlog];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      return updatedBlogs;
    });
    setIsEditing(false)
    setSelectedPost(null)
  };

  const handleEditingPost = (blog) => {
    setIsEditing(true)
    setSelectedPost(blog)
    setShowBlogs(true)
    setShowNews(false)
  }

  const handleDeletingPost = (blogToDelete) => {
    setBlogs(prevBlogs => {
      const updatedBlogs = prevBlogs.filter(blog => blog !== blogToDelete)
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs
    })
  }

  return (
    <div className="container">
      <div className="news-blogs-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} onEditBlog={handleEditingPost} onDeleteBlog={handleDeletingPost} />}
        {showBlogs && (
          <Blogs onBack={handleBackToNews} onCreateBlog={handleCreateBlog} editPost={selectedPost} isEditing={isEditing} />
        )}
      </div>
    </div>
  );
};

export default App;
