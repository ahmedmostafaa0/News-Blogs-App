import "./Bookmarks.css";
import "./Modal.css";

const Bookmarks = ({show, onClose, bookmarks, onDelete, onSelectArticle}) => {
    if(!show) return null;
  return <div className="modal-overlay">
    <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        <h2 className="bookmarks-heading">Bookmarked News</h2>
        <div className="bookmarks-list">
            {bookmarks.map((article) => (
                <div className="bookmark-item" key={article.id} onClick={() => {
                    onSelectArticle(article)
                }}>
                    <img src={article.image} alt={article.title} className="bookmark-img" />
                    <h3 className="bookmark-title">{article.title}</h3>
                    <span className="delete-button" onClick={(e) => {
                        e.stopPropagation()
                        onDelete(article)
                    }}>
                        <i className="fa-regular fa-circle-xmark"></i>
                    </span>
                </div>
            ))}
        </div>
    </div>
  </div>;
};

export default Bookmarks;
