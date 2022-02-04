

import React, { useEffect, useState } from 'react';
import './styles.css';

import {
  Card,
  Button,
} from 'react-bootstrap';

export default function CardMovie({ 
  movie,
  onClick,
  favoriteMovie,
  favoritesMovie
}) {
  const { descricao, titulo, urlImg } = movie;

  return (
    <Card className="custom-card">
      <span 
        className="material-icons-outlined custom-icon" 
        style={{ color: favoritesMovie?.some(x => x.id === movie.id) ? 'yellow' : '#A3A3A3'}}
        onClick={() => favoriteMovie(movie)}
      >
        star
      </span>
      <Card.Img variant="top" src={urlImg} className="custom-image"/>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          {descricao}
        </Card.Text>
        <Button variant="primary" onClick={() => onClick(movie)}>Editar</Button>
      </Card.Body>
    </Card>
  );
}

