import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/fontawesome-free-solid'
import { useNavigate } from 'react-router-dom';




const ProfileButton = () => {
    const navigate = useNavigate();
    

    const submit =  (e) => {

        e.preventDefault();

        const response = fetch('http://localhost:8000/profile', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',

        });

        response.then(res => {  
            if (res.status === 200) {
                navigate('/profile');
            } else {
                alert('Invalid username or password');
            }

        }   ).catch(err => {
            alert('Invalid username or password');
        }
        );
    }

    return (
        <form onSubmit={submit}  >
        <button  className="profile-button border-0 bg-white  " type="submit">
        Profile   <FontAwesomeIcon icon={{prefix: 'fas', iconName: 'user'}} />
        </button>
        </form>
    );
    
    }
    export default ProfileButton;
// }
