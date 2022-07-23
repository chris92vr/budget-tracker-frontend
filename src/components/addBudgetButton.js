import { Form, Modal, Button } from "react-bootstrap"
import { useState } from "react"


export default function AddBudgetButton({ show, handleClose }) {
    const [name, setName] = useState('');
    const [max, setMax] = useState('');
    
 
  const submit = (e) =>  {
    e.preventDefault();

    const response = fetch('https://budget-tracker-go-backend.herokuapp.com/addbudget', {
    mode: 'cors', accessControlAllowOrigin: '*',
    headers: {'Content-Type': 'application/json'},
         
    body: JSON.stringify({
            
            name,
            max,
           
            
        }),
    
    
    });
    
    response.then(res => {
        if (res.status === 200) {
            window.location.reload(false);
            handleClose();
        } else {
            alert('Invalid username or password');
        }

    }   ).catch(err => {
        alert('Invalid username or password');
    }
    );
    

    
    
}

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)}  type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              onChange={(e) => setMax(e.target.value)} 
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  )
}