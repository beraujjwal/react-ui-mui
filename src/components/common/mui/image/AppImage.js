import React from 'react';
import PropTypes from 'prop-types';

function AppImage(props) {
  return <img className={props.className} src={props.src} alt={props.alt} />;
}

// We require the use of src and alt, only enforced by react in dev mode
AppImage.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AppImage;