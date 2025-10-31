import './NewsModal.css'
import './Modal.css'

const NewsModal = ({show, article, onClose}) => {
    if(!show) return null;
  return <div className='modal-overlay'>
    {article && (
    <div className="modal-content">
        <span className="close-button" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </span>
        <img src={article.image} alt={article.title} className='modal-image' />
        <h2 className="modal-title">{article.title}</h2>
        <p className="modal-source">Source: {article.source.name}</p>
        <p className="modal-date">Jun 24, 2025, 4:15 PM</p>
        <p className="modal-content-text">{article.description}</p>
        <a href={article.url} target='_blank' rel='noopener noreferrer' className="read-more-link">Read More</a>
    </div>
    )}
  </div>;
};

export default NewsModal;
