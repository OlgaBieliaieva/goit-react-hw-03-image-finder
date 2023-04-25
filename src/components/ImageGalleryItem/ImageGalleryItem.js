import shortid from 'shortid';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ list }) {
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
            ></img>
          </li>
        );
      })}
    </>
  );
}

export default ImageGalleryItem;
