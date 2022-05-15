import { Component } from 'react';
import './Register.css';
import { Table, Button, Modal } from 'react-bootstrap';

class Register extends Component{
    state = {
        isOpen: false
      };
      openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  
    render(){
    return (
        <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    )}
}

export default Register;