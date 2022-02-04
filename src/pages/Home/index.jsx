import {
  Container,
  Col,
  Row,
  Modal,
  Button,
  Form,
  Tabs,
  Tab
} from 'react-bootstrap';

import './styles.css';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const [movieObjPost, setMovieObjPost] = useState({
    urlImg: '',
    titulo: '',
    descricao: '',
    id: 0
  })
  const [favoritesMovie, setFavoritesMovie] = useState([])

  const axios = require('axios');

  const getFilms = () => {
    axios
      .get('http://ctdsummerweek.nerdasaservice.com.br/filme')
      .then(({ data }) => {
        setMovies(data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const postFilms = (movieObjPost) => {
    if (isAdd) {
      axios
        .post('http://ctdsummerweek.nerdasaservice.com.br/filme', movieObjPost)
        .then((response) => {
          console.log(response)
        })
        .finally(() => {
          getFilms()
          handleModalState()
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      axios
        .put('http://ctdsummerweek.nerdasaservice.com.br/filme', movieObjPost)
        .then((response) => {
          console.log(response)
        })
        .finally(() => {
          getFilms()
          handleModalState()
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const deleteMovie = () => {
    axios
      .delete(`http://ctdsummerweek.nerdasaservice.com.br/filme/${movieObjPost.id}`)
      .then((response) => {
        console.log(response)
      })
      .finally(() => {
        getFilms()
        handleModalState()
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    getFilms();
  }, []);

  useEffect(() => {
    console.log(movieObjPost)
  }, [movieObjPost]);

  const handleModalState = () => {
    setShowModal(!showModal);
  }

  const setFormValue = (movie) => {
    setMovieObjPost({
      urlImg: movie.urlImg,
      titulo: movie.titulo,
      descricao: movie.descricao,
      id: movie.id
    })
  }

  return (
    <>
      <header className="main-header">
        <img
          src="https://www.digitalhouse.com/logo-DH.png"
          alt="logo"
        />
      </header>

      <main className="main-content">

        <Tabs defaultActiveKey="all" id="listTabs" className="mb-3 tabs">
          <Tab eventKey="all" title="Todos">

            <Container>
              <Row>
                {movies.map(movie => (
                  <Col 
                    lg="4" md="6" sm="12" 
                    key={movie.id}
                  >
                    <Card 
                      movie={movie}
                      onClick={(movie) => {
                        handleModalState()
                        setFormValue(movie)
                        setIsAdd(false)
                      }}
                      favoriteMovie={(movie) => {
                        if (favoritesMovie.some(x => x.id === movie.id)){
                          setFavoritesMovie([...favoritesMovie].filter(x => x.id !== movie.id))
                        } else {
                          setFavoritesMovie([...favoritesMovie, movie])
                        }
                      }}
                      favoritesMovie={favoritesMovie}
                    />
                  </Col>
                ))}
              </Row>
            </Container>

          </Tab>
          <Tab eventKey="favoritesMovie" title="Favoritos">

            <Container>
              <Row>
                {favoritesMovie.map(movie => (
                  <Col 
                    lg="4" md="6" sm="12" 
                    key={movie.id}
                  >
                    <Card 
                      movie={movie}
                      onClick={(movie) => {
                        handleModalState()
                        setFormValue(movie)
                        setIsAdd(false)
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Container>

          </Tab>
        </Tabs>

      </main>

      <span className="material-icons-outlined fab"
        onClick={() => {
          handleModalState();
          setIsAdd(true);
        }}>
        add_circle
      </span>

      <Modal 
        show={showModal} 
        onHide={handleModalState}
      >
        <Modal.Header closeButton>
          <Modal.Title>{isAdd ? 'Adicionar Filme' : 'Editar Filme'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagem</Form.Label>
              <Form.Control type="text" 
                value={movieObjPost.urlImg}
                onChange={(e) => {
                  setMovieObjPost({
                    urlImg: e.target.value,
                    titulo: movieObjPost.titulo,
                    descricao: movieObjPost.descricao
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Titulo</Form.Label>
              <Form.Control type="text"
                value={movieObjPost.titulo}
                onChange={(e) => {
                  setMovieObjPost({
                    urlImg: movieObjPost.urlImg,
                    titulo: e.target.value,
                    descricao: movieObjPost.descricao
                  })
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descrição</Form.Label>
              <Form.Control 
                as="textarea" 
                type="text"
                value={movieObjPost.descricao}
                onChange={(e) => {
                  setMovieObjPost({
                    urlImg: movieObjPost.urlImg,
                    titulo: movieObjPost.titulo,
                    descricao: e.target.value
                  })
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {
            !isAdd && (
              <Button variant="danger" 
                onClick={() => {
                  deleteMovie()
                }}
              >
                Deletar
              </Button>
            )
          }
          <Button variant="success" onClick={() => postFilms(movieObjPost)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

