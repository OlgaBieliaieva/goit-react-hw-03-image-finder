import shortid from 'shortid';

function ImageGalleryItem({ list }) {
  console.log(list.length);
  return (
    <>
      {list.map(({ webformatURL, largeImageURL, tags }) => {
        const id = shortid.generate();
        return (
          <li key={id}>
            <img src={webformatURL} alt={tags}></img>
          </li>
        );
      })}
    </>
  );
}

export default ImageGalleryItem;
