import React from 'react';
import PropTypes from 'prop-types';

const ServicioItem = React.memo(({ servicio }) => {
  return <li>{servicio.nombre}</li>;
});

ServicioItem.propTypes = {
  servicio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServicioItem;