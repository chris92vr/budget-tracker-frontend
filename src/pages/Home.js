import React from "react";
import AddBudgetButton from "../components/addBudgetButton";
import BudgetCard from "../components/BudgetCard";
import CurrentDate from "../components/CurrentDate";
import { useState, useEffect } from "react";
import { Button, Stack, Container } from "react-bootstrap"



function Home() {
    const [showAddBudgetButton, setShowAddBudgetButton] = useState(false)
    
   const [Budgets, setBudgets] = useState([]);

    useEffect(() => {
        // declare the async data fetching function
        const fetchData = async () => {
          // get the data from the api
          const user = await fetch('http://localhost:8000/getbudgets');
          // convert the data to json
          const json = await user.json();

          console.log('lunghezza' + json.length);
            
         setBudgets(json);
          // set state with the result
        


        }
      
        // call the function
        const result = fetchData()
          // make sure to catch any error
          .catch(console.error);;
          console.log(result);
          
      }, [])
   

    return (
        <>
        <div className="container">
            <Stack direction="horizontal" className="mt-4 mb-4">
      <h1 className=" me-auto">Budget Tracker © </h1> 
      <CurrentDate />
      </Stack>
      <Button variant="primary" onClick={() => setShowAddBudgetButton(true)}>
            Add Budget
          </Button>
      
            
        </div>
          <AddBudgetButton
          show={showAddBudgetButton}
          handleClose={() => setShowAddBudgetButton(false)}
        />

        <Container>
        {Budgets.map(Budget => {
           
            return (
              <BudgetCard
                key={Budget.budget_id}
                name={Budget.name}
                
                max={Budget.max}
                
              />
            )
          })}
        </Container>
            
        </>
    )







}


export default Home;