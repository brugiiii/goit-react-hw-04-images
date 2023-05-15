import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal';

import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, largeImage, alt }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Item onClick={() => setShowModal(showModal => !showModal)}>
        <Image src={image} alt={alt} />
      </Item>
      {showModal && (
        <Modal
          url={largeImage}
          alt={alt}
          onClose={() => setShowModal(showModal => !showModal)}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
};
