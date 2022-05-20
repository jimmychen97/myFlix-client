import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const DirectorView = ({ director }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h5>Director name: {director.Name}</h5>
          <h5>Biography: {director.Bio}</h5>
          <h5>Birth Year: {director.Birth}</h5>
          <Link to="/">
            <Button variant="light">Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
