import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const GenreView = ({ genre }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h5 className="label">Genre name: {genre.Name}</h5>
          <h5 className="label">Description: {genre.Description}</h5>
          <Link to="/">
            <Button variant="light">Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
