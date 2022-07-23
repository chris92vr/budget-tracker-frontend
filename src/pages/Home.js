import React from "react";
import AddBudgetButton from "../components/addBudgetButton";
import BudgetCard from "../components/BudgetCard";
import CurrentDate from "../components/CurrentDate";
import { useState, useEffect } from "react";
import { Button, Stack, Container } from "react-bootstrap"
import AddExpenseButton from "../components/addExpenseButton";
import ViewExpenses from "../components/ViewExpenses";




function Home() {
    const [showAddBudgetButton, setShowAddBudgetButton] = useState(false)
    const [showAddExpenseButton, setShowAddExpenseButton] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  
    
    
   const [Budgets, setBudgets] = useState([]);
   
   function openAddExpenseModal(budgetId) {
    setShowAddExpenseButton(true)
    setAddExpenseModalBudgetId(budgetId)
  }





    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const user = await fetch('https://budget-tracker-go-backend.herokuapp.com/getbudgets').mode('cors').accessControlAllowOrigin('*');
          // convert the data to json
          const json = await user.json();

          
            
         setBudgets(json);
          // set state with the result
        


        }
      
        // call the function
        fetchData();
        
          
      }, [])

      

        const [total_max, setTotalMax] = useState('');
        const [total_amount, setTotalAmount] = useState('');
       
    
        useEffect(() => {
            // declare the async data fetching function
            const fetchData = async () => {
              // get the data from the api
              const user = await fetch('https://budget-tracker-go-backend.herokuapp.com/totalBudget').mode('cors').accessControlAllowOrigin('*');
              // convert the data to json
              const json = await user.json();
          
              // set state with the result
              setTotalMax(json.total_max);
              setTotalAmount(json.total_amount);
    
    
            }
          
            // call the function
            const result = fetchData()
              // make sure to catch any error
              .catch(console.error);;
              console.log(result);
              
          }, [])
    
      
    return (
        <>
        <Container className="my-4">
            <Stack direction="horizontal" className="mt-4 mb-4">
      <h1 className=" me-auto">Budget Tracker © </h1> 
      <CurrentDate />
      </Stack>
      <Stack direction="horizontal" gap="2" className="mt-4 mb-4">
      <Button variant="primary" onClick={() => setShowAddBudgetButton(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
      
          </Stack>
        
        
          <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />
        <AddExpenseButton
          show={showAddExpenseButton} 
          defaultBudgetId={addExpenseModalBudgetId}
          handleClose={() => setShowAddExpenseButton(false)}
        />
       <ViewExpenses
              budgetId= {viewExpensesModalBudgetId}
              handleClose={() => setViewExpensesModalBudgetId()}
        />
      <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
            
        

          }}
        >
      
        {Array.isArray(Budgets)
        ? Budgets.map(Budget => (
          <>
          <BudgetCard
          key={Budget.budget_id}
          name={Budget.name}
        amount={Budget.totalAmount}  
          
          max={Budget.max}
          onAddExpenseClick={() => setShowAddExpenseButton(true)}
          onViewExpensesClick={() => setViewExpensesModalBudgetId(Budget.budget_id)}
          
          
        />
      
        
        </>
          ))
        : null}
        <BudgetCard amount={total_amount} name="Total" gray max={total_max} hideButtons />



       

        </div>
        
        </Container>
            
        </>
    )







}


export default Home;