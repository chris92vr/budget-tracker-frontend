import { Form, Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function AddExpenseButton({ handleClose, budgetId }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  console.log('budfsaf', budgetId);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const user = await fetch(
        'https://budgeet-tracker-api.herokuapp.com/getBudget?budget_id=' +
          budgetId,
        {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          AccessControlAllowOrigin:
            'https://budget-tracker-frontend-delta.vercel.app',
        }
      );
      // convert the data to json
      const userJson = await user.json();
      // set the data to the state
      setBudgets(userJson);
    };
    // call the async function
    fetchData();
  }, [budgetId]);

  const submit = (e) => {
    e.preventDefault();
    console.log('budasddfsaf', budgetId);

    const response = fetch(
      'https://budgeet-tracker-api.herokuapp.com/expense',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        AccessControlAllowOrigin:
          'https://budget-tracker-frontend-delta.vercel.app',
        AccessControlAllowCredentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          description,
          amount,
          budget_id: budgetId,
        }),
      }
    );
    if (response != null) {
      console.log('budasddadsadfsaf', budgetId);

      response
        .then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              console.log('budasddaddsadsadfsaf', budgetId);
              console.log(data);
            });
            //window.location.reload(false);
            handleClose();
            console.log(response);
          } else {
            alert('Invalid username or password');
          }
        })
        .catch((err) => {
          alert('Invalid username or password');
        });
    }
  };

  return (
    <Modal show={budgetId} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expense</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Budget</Form.Label>
            <Form.Control as="select">
              <option value={budgetId}>{budgets.name}</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
