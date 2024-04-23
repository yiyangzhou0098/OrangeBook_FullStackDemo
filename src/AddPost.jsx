import './AddPost.css';
import { useState } from 'react';

export default function AddPost({onAddPost, onToggleCategory}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');


    function onSubmit(e) {
        e.preventDefault(); 
        const newPost = {
            title: title,
            content: content,
            category: category
        };
        onAddPost(newPost);
        if(title && content && category) {
            onToggleCategory('Recommend')
        }
      }

    return (
        <div className="add--post__container">
            <form className="add--post__form" onSubmit={onSubmit}>
                <div className="add--image__container">
                    <img className="add--image__preview" src="https://via.placeholder.com/200" alt="Placeholder image" />
                    <p> #TODO Upload API not implemented</p>
                </div>
                <div className="add--form__content">
                    <input type="text" className="title-input" placeholder="Title" 
                    onInput={(e) => setTitle(e.target.value)}/>
                    <textarea className="content-input" rows="8" placeholder="Content"
                    onInput={(e) => setContent(e.target.value)}/>
                    <select value={category} className="category-select" onChange={e=> setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Trip">Trip</option>
                        <option value="Sports">Sports</option>
                        <option value="Cook">Cook</option>
                        <option value="Style">Style</option>
                    </select>
                    <button type="submit" className="add--submit__button">Confirm Publish</button>
                </div>
            </form>
        </div>
    )
}