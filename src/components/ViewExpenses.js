import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Modal, Button, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import Time from 'react-time-format'


function deleteBudget(budgetId) {
  fetch(`http://localhost:8000/deletebudget?budget_id=${budgetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
      'Access-Control-Allow-Origin': '*'

    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    }
    )
    .catch(err => console.log(err));
}


function deleteExpense(expenseId) {
  fetch(`http://localhost:8000/deleteexpense?expense_id=${expenseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'mode': 'no-cors',
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    }
    )
    .catch(err => console.log(err));
}





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
                  deleteBudget(budgetId);
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
            <Stack direction="horizontal" gap="2" key={expense.expense_id}>
              <div className="me-auto fs-4">{expense.description} - <Time value={expense.created_at} format="DD/MM/YYYY hh:mm" /> </div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense.expense_id)}
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