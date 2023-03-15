import React from 'react';
import AddBudgetButton from '../components/addBudgetButton';
import BudgetCard from '../components/BudgetCard';
import CurrentDate from '../components/CurrentDate';
import { useState, useEffect } from 'react';
import { Button, Stack, Container } from 'react-bootstrap';
import AddExpenseButton from '../components/addExpenseButton';
import AddExpenseButtonBy from '../components/addExpenseButtonByID';
import ViewExpenses from '../components/ViewExpenses';

function Home() {
  const [showAddBudgetButton, setShowAddBudgetButton] = useState(false);
  const [showAddExpenseButton, setShowAddExpenseButton] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [addExpenseButtonBudgetId, setAddExpenseButtonBudgetId] = useState();
  const [addExpenseButtonByBudgetId, setAddExpenseButtonByBudgetId] =
    useState();

  const [Budgets, setBudgets] = useState([]);
  // URL from .env file (see .env.example)
  const API_URL = process.env.REACT_APP_API_URL;
  console.log('TEST', API_URL);

  console.log('TEST', process.env.TEST_API_URL);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const user = await fetch('http://localhost:8000/getBudgets', {
        credentials: 'include',
        mode: 'cors',
        AccessControlAllowOrigin: 'http://localhost:3000',
        AccessControlAllowCredentials: 'true',
        method: 'GET',
      });

      // convert the array to json
      const json = await user.json();

      // set state with the result
      setBudgets(json);
    };

    // call the function
    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);
    console.log(result);
  }, []);

  console.log('fetch data', Budgets);

  const [total_max, setTotalMax] = useState('');
  const [total_amount, setTotalAmount] = useState('');

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const user = await fetch('http://localhost:8000/totalBudget', {
        credentials: 'include',
        mode: 'cors',
        AccessControlAllowOrigin: 'http://localhost:3000',
        AccessControlAllowCredentials: 'true',
        method: 'GET',
      });

      // convert the data to json
      const json = await user.json();

      // set state with the result
      setTotalMax(json.total_max);
      setTotalAmount(json.total_budget);
    };

    // call the function
    const result = fetchData()
      // make sure to catch any error
      .catch(console.error);
    console.log(result);
  }, []);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" className="mt-4 mb-4">
          <h1 className=" me-auto">Budget Tracker © </h1>
          <CurrentDate />
        </Stack>
        <Stack direction="horizontal" gap="2" className="mt-4 mb-4">
          <Button
            variant="primary"
            onClick={() => setShowAddBudgetButton(true)}
          >
            Add Budget
          </Button>
          {total_max ? (
            <h3 className=" me-auto">
              <Button
                variant="primary"
                onClick={() => setAddExpenseButtonByBudgetId('all')}
              >
                Add Expense
              </Button>
            </h3>
          ) : (
            <h3 className=" me-auto">
              No Budgets Yet. Add a Budget to get started.
            </h3>
          )}
        </Stack>

        <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />
        <AddExpenseButton
          show={showAddExpenseButton}
          defaultBudgetId={addExpenseModalBudgetId}
          budgetId={addExpenseButtonBudgetId}
          handleClose={() => setShowAddExpenseButton(false)}
        />
        <ViewExpenses
          budgetId={viewExpensesModalBudgetId}
          handleClose={() => setViewExpensesModalBudgetId()}
        />

        <AddExpenseButtonBy
          budgetId={addExpenseButtonByBudgetId}
          handleClose={() => setAddExpenseButtonByBudgetId()}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.isArray(Budgets)
            ? Budgets.map((Budget) => (
                <>
                  <BudgetCard
                    key={Budget.budget_id}
                    name={Budget.name}
                    amount={Budget.totalAmount}
                    max={Budget.max}
                    onAddExpenseClick={() =>
                      setAddExpenseButtonByBudgetId(Budget.budget_id)
                    }
                    onViewExpensesClick={() =>
                      setViewExpensesModalBudgetId(Budget.budget_id)
                    }
                    onDeleteClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this budget?'
                        )
                      ) {
                        fetch(
                          'http://localhost:8000/deleteBudget?budget_id=' +
                            Budget.budget_id,
                          {
                            credentials: 'include',
                            mode: 'cors',
                            AccessControlAllowOrigin: 'http://localhost:3000',
                            AccessControlAllowCredentials: 'true',
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              budget_id: Budget.budget_id,
                            }),
                          }
                        )
                          .then((res) => {
                            if (res.status === 200) {
                              window.location.reload();
                            } else {
                              alert('Error deleting budget');
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }
                    }}
                  />
                </>
              ))
            : null}
          <BudgetCard
            amount={total_amount}
            name="Total"
            gray
            max={total_max}
            hideButtons
          />
        </div>
      </Container>
    </>
  );
}

export default Home;
