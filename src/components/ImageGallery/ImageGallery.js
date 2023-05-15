import PropTypes, { shape } from 'prop-types';

import { ImageGalleryItem } from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          largeImage={largeImageURL}
          alt={tags}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
