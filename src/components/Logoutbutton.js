import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cookies from 'js-cookie';






const LogoutButton = () => {
    
  
  

    const submit =  (e) => {
        e.preventDefault();
  
        const response = fetch('http://localhost:8000/logout', {
          
         
        method: 'POST',
        
            headers: {'Content-Type': 'application/json'},
            
            credentials: 'include',
          
        });
        
        response.then(res => {
            if (res.status === 200) {
                
                window.location.href = '/signin';
                
            } else {
                alert('Invalid username or password');
            }
  
        }   ).catch(err => {
            alert('Invalid username or password');
        } 
        
        );
        Cookies.setItem('session_token', undefined);
        
        
    }
  
    return (
        <form onSubmit={submit}>
        <button  className="logout-button border-0 bg-white " type="submit">
        Log Out  <FontAwesomeIcon icon={{prefix: 'fas', iconName: 'sign-out-alt'}} />
        
        

        
        </button>
       
        </form>
        
    );
    }

    export default LogoutButton;
// }
