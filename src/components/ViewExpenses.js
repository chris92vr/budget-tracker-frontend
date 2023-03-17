import React, { useEffect, useState } from 'react';

import { Modal, Button, Stack } from 'react-bootstrap';
import { currencyFormatter, formatDate } from '../utils';

function deleteBudget(budgetId) {
  fetch(
    `https://budgeet-tracker-api.herokuapp.com/deleteBudget?budget_id=${budgetId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      AccessControlAllowOrigin: 'http://localhost:3000',
      AccessControlAllowCredentials: 'include',

      body: JSON.stringify({
        budget_id: budgetId,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // reload the page
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
  window.location.reload(false);
}

function deleteExpense(expenseId) {
  fetch(
    `https://budgeet-tracker-api.herokuapp.com/deleteExpense?expense_id=${expenseId}`,
    {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
      AccessControlAllowOrigin: 'http://localhost:3000',
      AccessControlAllowCredentials: 'include',

      body: JSON.stringify({
        expense_id: expenseId,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
  window.location.reload(false);
}

function ViewExpenses({ budgetId, handleClose }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetch(
        `https://budgeet-tracker-api.herokuapp.com/getExpense?budget_id=${budgetId}`,
        {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
          AccessControlAllowOrigin: 'http://localhost:3000',
        }
      );
      if (user.status === 200 && user != null) {
        const json = await user.json();

        setExpenses(json);
      }
    };
    fetchData();
  }, [budgetId]);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Expenses </div>

            <Button
              onClick={() => {
                deleteBudget(budgetId);
                handleClose();
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
            ? expenses.map((expense) => (
                <Stack direction="horizontal" gap="2" key={expense.expense_id}>
                  <div className="me-auto fs-4">
                    {expense.description} - {formatDate(expense.created_at)}
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
  );
}

export default ViewExpenses;
