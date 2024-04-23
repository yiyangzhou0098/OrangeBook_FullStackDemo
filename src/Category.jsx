import './Category.css';

export default function Category({ onToggleCategory }) {

    function onClickCategory(e) {
        const id = e.target.dataset.id;
        console.log(id);
        onToggleCategory(id);
    }

    return (
    <div className='category__container'>
        <div data-id='Recommend' className='category' 
            onClick={ (e) => {
            onClickCategory(e)
          }}> Recommend</div>
        <div data-id='Style' className='category' 
            onClick={ (e) => {
            onClickCategory(e)
          }}> Style</div>
        <div data-id='Cook' className='category' 
            onClick={ (e) => {
            onClickCategory(e)
          }}> Cook</div>
        <div data-id='Trip' className='category'
            onClick={ (e) => {
            onClickCategory(e)
          }}> Trip</div>
        <div data-id='Sports' className='category'
            onClick={ (e) => {
            onClickCategory(e)
          }}> Sports</div>
    </div>
    )
}

