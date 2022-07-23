import { Form, Modal, Button } from "react-bootstrap"
import { useState, useEffect } from "react"


export default function AddExpenseButton({ show, handleClose, defaultBudgetId }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [budget_id, setBudget_id] = useState('');
    const [budgets, setBudgets] = useState([]);
    
 
  const submit = (e) =>  {
    e.preventDefault();

    const response = fetch('https://budget-tracker-go-backend.herokuapp.com/addexpense', {

    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    mode: 'cors', accessControlAllowOrigin: '*',
    body: JSON.stringify({
            description,
            amount,
            budget_id,
            
           
            
        }),
    
    
    });
    if (response != null ){
    response.then(res => {
        if (res.status === 200) {
            window.location.reload(false);
            handleClose();
            console.log(response);
            } else {
            alert('Invalid username or password');
        }

    }   ).catch(err => {
        alert('Invalid username or password');
    }
    );}


   

    
    
}

useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const user = await fetch('https://budget-tracker-go-backend.herokuapp.com/getbudgets').mode('cors');
      // convert the data to json
      const json = await user.json();

      
        
     setBudgets(json);
      // set state with the result
  

    }
  
    // call the async function
    fetchData();
      
      
  }, [])



  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={submit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={(e) => setDescription(e.target.value)}  type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              onChange={(e) => setAmount(e.target.value)} 
              type="int"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="budget_id">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} onChange={(e) => setBudget_id(e.target.value)}  required>
           <option value="">Select a budget</option>
            {Array.isArray(budgets)
        ?  budgets.map(budget => (
          <option key={budget.budget_id} value={budget.budget_id} >
          {budget.name}
        </option>
          ))
        : null}
              
            </Form.Select>
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