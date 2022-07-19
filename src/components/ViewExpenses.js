import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Modal, Button, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"





function ViewExpenses ({ budgetId, handleClose}) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetch(`http://localhost:8000/getexpenses?budget_id=${budgetId}`);
      if (user.status === 200 && user != null) {
        const json = await user.json();
        setExpenses(json);
        setLoading(false);
      }
      
      
    }
    const result = fetchData()
      .catch(console.error);;
  }, [budgetId])

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses </div>
            
              <Button
                onClick={() => {
                  
                  handleClose()
                }}
                variant="outline-danger"
              >
                Delete
              </Button>
            
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
        {Array.isArray(expenses)
           ? expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
         ))
         : null}
        </Stack>
      </Modal.Body>
    </Modal>
    
  )
}
   

export default ViewExpenses;