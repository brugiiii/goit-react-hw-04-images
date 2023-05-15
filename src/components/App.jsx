import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { ThreeDots } from 'react-loader-spinner';

import { Api } from '../api';

import { AppEl } from './App.styled';

const api = new Api();

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showSpinner, setShowSpinner] = useState(false);
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (render) {
      return setRender(false);
    }

    api.query = query;
    api.fetch(page).then(data => {
      if (data.length === 0) {
        return setStatus('rejected');
      }

      setImages(images => (page > 1 ? [...images, ...data] : [...data]));
      setStatus('resolved');
      setShowSpinner(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const loadMore = () => {
    setPage(page => (page += 1));
    setShowSpinner(true);
  };

  const onSubmit = query => {
    setQuery(query);
    setPage(1);
    setStatus('pending');
  };

  return (
    <AppEl>
      <Searchbar onSubmit={onSubmit} />

      {status === 'idle' && (
        <h2 style={{ margin: '0 auto' }}>Введіть що небудь</h2>
      )}

      {status === 'pending' && (
        <ThreeDots
          color={'#3f51b5'}
          wrapperStyle={{ justifyContent: 'center' }}
        />
      )}

      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          {showSpinner ? (
            <ThreeDots
              color={'#3f51b5'}
              wrapperStyle={{ justifyContent: 'center' }}
            />
          ) : (
            <Button onClick={loadMore}>Load more</Button>
          )}
        </>
      )}

      {status === 'rejected' && (
        <h2 style={{ margin: '0 auto' }}>Нічого не знайдено</h2>
      )}
    </AppEl>
  );
};
