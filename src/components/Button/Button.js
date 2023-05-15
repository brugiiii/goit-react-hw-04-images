import PropTypes from 'prop-types';

import { ButtonEl } from './Button.styled';

export const Button = ({ onClick, children }) => {
  return (
    <ButtonEl type="button" onClick={onClick}>
      {children}
    </ButtonEl>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
