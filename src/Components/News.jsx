import "./News.css";
import Weather from "./Weather";
import Calendar from "./Calendar";
import NewsModal from "./NewsModal";
import BlogsModal from "./BlogsModal";

import userImg from "../assets/images/profile.jpg";
import noImg from "../assets/images/noImg.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import Bookmarks from "./Bookmarks";

const categories = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

const News = ({ onShowBlogs, blogs, onEditBlog, onDeleteBlog }) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null)
  const [showBlogModal, setShowBlogModal] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      let url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${
        import.meta.env.VITE_API_KEY
      }`;

      if (searchQuery) {
        url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=${
          import.meta.env.VITE_API_KEY
        }`;
      }
      try {
        const response = await axios.get(url);
        const fetchedNews = response.data.articles;
        if (!fetchedNews || fetchedNews.length === 0) {
          setHeadline(null);
          setNews([]);
          return;
        }
        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg;
          }
        });
        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7));
        const saveBookmarks =
          JSON.parse(localStorage.getItem("bookmarks")) || [];
        setBookmarks(saveBookmarks);
      } catch (error) {
        console.error("Error fetching news: ", error);
        setHeadline(null);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setSearchInput("");
  };

  const shortenTitle = (title) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length > 6) {
      return words.slice(0, 6).join(" ") + "...";
    }
    return title;
  };

  const handleArticleClick = (article) => {
    setShowModal(true);
    setSelectedArticle(article);
    setShowBookmarks(false);
  };

  const handleBookmarkClick = (article) => {
    setBookmarks((prevBookmark) => {
      const updatedBookmarks = prevBookmark.find(
        (bookmark) => bookmark.id === article.id
      )
        ? prevBookmark.filter((bookmark) => bookmark.id !== article.id)
        : [...prevBookmark, article];
      localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
      return updatedBookmarks;
    });
  };

  const handleBlogClick = (blog) => {
    setShowBlogModal(true)
    setSelectedPost(blog)
  }

  const closeBlogModal = () => {
    setShowBlogModal(false)
    setSelectedPost(null)
  }

  return (
    <div className="news">
      <header className="news-header">
        <h1 className="logo">news & blogs</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search News..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user">
            <img src={userImg} alt="Profile" onClick={onShowBlogs} />
            <p>Ahmed's Blog</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  key={category}
                  href="#"
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a
                href="#"
                className="nav-link"
                onClick={() => setShowBookmarks(true)}
              >
                bookmarks <i className="fa-solid fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {loading ? (
            <p className="loading">Loading news...</p>
          ) : !headline && news.length === 0 ? (
            <p className="no-results">No results found 😕</p>
          ) : (
            <>
              <div
                className="headline"
                onClick={() => handleArticleClick(headline)}
              >
                <img
                  src={headline.image || noImg}
                  alt={headline.title}
                  loading="lazy"
                />
                <h2 className="headline-title">
                  {headline.title}{" "}
                  <i
                    className={`${
                      bookmarks.some(
                        (bookmark) => bookmark.title === headline.title
                      )
                        ? "fa-solid"
                        : "fa-regular"
                    } fa-bookmark bookmark`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkClick(headline);
                    }}
                  ></i>
                </h2>
              </div>
              <div className="news-grid">
                {news.map((article, index) => (
                  <div
                    key={index}
                    className="news-grid-item"
                    onClick={() => handleArticleClick(article)}
                  >
                    <img src={article.image || noImg} alt={article.title} />
                    <h3>
                      {shortenTitle(article.title)}{" "}
                      <i
                        className={`${
                          bookmarks.some(
                            (bookmark) => bookmark.title === article.title
                          )
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-bookmark bookmark`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmarkClick(article);
                        }}
                      ></i>
                    </h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <NewsModal
          show={showModal}
          onClose={() => setShowModal(false)}
          article={selectedArticle}
        />
        <Bookmarks
          show={showBookmarks}
          onClose={() => setShowBookmarks(false)}
          bookmarks={bookmarks}
          onSelectArticle={handleArticleClick}
          onDelete={handleBookmarkClick}
        />
        <div className="my-blogs">
          <div className="my-blogs-heading">My Blogs</div>
          <div className="blog-posts">
            {blogs.map((blog, index) => (
              <div className="blog-post" key={index} onClick={() => handleBlogClick(blog)}>
                <img src={blog.image || noImg} alt="Blog Image" className="blog-image" />
                <h3>{blog.title}</h3>
                <div className="post-buttons">
                  <button className="edit-post" onClick={() => onEditBlog(blog)}>
                    <i className="bx bx-edit"></i>
                  </button>
                  <button className="delete-post" onClick={(e) => {
                    e.stopPropagation()
                    onDeleteBlog(blog)
                  }}>
                    <i className="bx bx-x-circle"></i>
                  </button>
                </div>
                
              </div>
            ))}
            {selectedPost && showBlogModal && <BlogsModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal} /> }
          </div>
        </div>
        <div className="weather-calendar">
          <Weather />
          <Calendar />
        </div>
      </div>
      <footer className="footer">
        <p className="footer-brand">news & blogs app</p>
        <p className="footer-copy">©all rights reserved. by code and create</p>
      </footer>
    </div>
  );
};

export default News;
