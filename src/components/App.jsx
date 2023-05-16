import { useState, useEffect } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { ThreeDots } from 'react-loader-spinner';

import { Api } from '../api';

import { AppEl } from './App.styled';
import 'react-notifications/lib/notifications.css';

const api = new Api();

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
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
  }, [page, query]);

  const loadMore = () => {
    setPage(page => (page += 1));
    setShowSpinner(true);
  };

  const onSubmit = newQuery => {
    const sameQuery = query === newQuery;

    if (sameQuery || !newQuery) {
      return sameQuery
        ? NotificationManager.error('Enter a new query!', 'Invalid query', 3000)
        : NotificationManager.error('Enter something!', 'Invalid query', 3000);
    }

    setQuery(newQuery);
    setPage(1);
    setStatus('pending');
  };

  return (
    <AppEl>
      <Searchbar onSubmit={onSubmit} />

      {status === 'idle' && (
        <h2 style={{ margin: '0 auto' }}>Please, enter something :)</h2>
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
            <Button onClick={loadMore} >
              Load more
            </Button>
          )}
        </>
      )}

      {status === 'rejected' && (
        <h2 style={{ margin: '0 auto' }}>
          Nothing was found for your request :(
        </h2>
      )}

      <NotificationContainer />
    </AppEl>
  );
};
