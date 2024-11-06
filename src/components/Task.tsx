import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


function Task() {
	return (
		<Accordion defaultActiveKey='0'>
		    <Accordion.Item eventKey='0'>
		        <Accordion.Header>Atividade #1</Accordion.Header>
		        <Accordion.Body>
		        	<Button variant='outline-danger rounded-circle' id='timer'>
		        		Iniciar
		        	</Button>
		        	<br />
		          	Integrantes
		          	<br />
		          	Timer
		          	<br />
		          	XPs
		        </Accordion.Body>
		    </Accordion.Item>
		</Accordion>
	);
}

export default Task;