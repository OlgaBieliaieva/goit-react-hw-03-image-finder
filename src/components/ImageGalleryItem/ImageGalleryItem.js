import shortid from 'shortid';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ list, showModal }) {
  console.log(list.length);
  return (
    <>
      {list.map(({ webformatURL, largeImageURL, tags }) => {
        const id = shortid.generate();
        return (
          <li className={css.ImageGalleryItem} key={id}>
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt={tags}
              srcSet={largeImageURL}
              onClick={showModal}
            ></img>
          </li>
        );
      })}
    </>
  );
}

export default ImageGalleryItem;
