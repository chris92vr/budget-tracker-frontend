import React, { useEffect, useState } from 'react';

import { Modal, Button, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"




function deleteBudget(budgetId) {
  fetch(`https://budget-tracker-go-backend.herokuapp.com/deletebudget?budget_id=${budgetId}`, {
    method: 'DELETE',
    mode: 'cors', accessControlAllowOrigin: '*',
    headers: {
      'Content-Type': 'application/json',
      

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
  fetch(`https://budget-tracker-go-backend.herokuapp.com/deleteexpense?expense_id=${expenseId}`, {
    method: 'DELETE',
    mode: 'cors', accessControlAllowOrigin: '*',
    headers: {
      'Content-Type': 'application/json',
      
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
  
  useEffect(() => {
    const fetchData = async () => {
      const user = await fetch(`https://budget-tracker-go-backend.herokuapp.com/getexpenses?budget_id=${budgetId}`, { mode: 'no cors' });
      if (user.status === 200 && user != null) {
        const json = await user.json();
        setExpenses(json);
        
      }
      
      
    }
    fetchData();
      
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
              <div className="me-auto fs-4">{expense.description} - {expense.created_at} 
                 </div>
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