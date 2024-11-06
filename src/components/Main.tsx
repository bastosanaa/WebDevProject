import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import Task from './Task';

function Layout() {
	return (
		<Container>
		      <Row xs='auto'>
		        <Col className='side-bar' xs={6} md={4}>
		          <Image className='user-icon' src='img/213325.png' roundedCircle />
		          <h3> nome_usuario </h3>
		        </Col>
		        <Col className='main' xs={12} md={8}>
		          <Task />
		          <Task />
		        </Col>
		      </Row>
    	</Container>
		);
}

export default Layout;