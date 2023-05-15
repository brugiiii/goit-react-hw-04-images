import { useState } from 'react';
import PropTypes from 'prop-types';

import { Header, Form, Button, Label, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => setQuery(e.currentTarget.value);

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);
    setQuery('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Label>Search</Label>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={query}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
