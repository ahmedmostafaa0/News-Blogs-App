import "./BlogsModal.css";
import "./Modal.css";

const BlogsModal = ({ show, blog, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={blog.image} alt={blog.title} className="blogs-modal-image" />
        <h2 className="blogs-modal-title">{blog.title}</h2>
        <p className="blogs-modal-content">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogsModal;
