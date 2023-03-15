import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const response = fetch(
      'https://budgeet-tracker-api.herokuapp.com/protected',
      {
        credentials: 'include',
        mode: 'cors',
        AccessControlAllowOrigin:
          'https://budget-tracker-frontend-delta.vercel.app',
        AccessControlAllowCredentials: 'include',
        SameSite: 'Secure',
        Secure: 'true',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':
            'https://budget-tracker-frontend-delta.vercel.app',
          'Access-Control-Allow-Headers':
            'Origin , X-Requested-With, Content-Type, Accept',
        },
      }
    );

    response
      .then((res) => {
        res.header(
          'Access-Control-Allow-Origin',
          'https://budget-tracker-frontend-delta.vercel.app'
        );
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        if (res.status === 200) {
          navigate('/profile');
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((err) => {
        alert('Invalid username or password');
      });
  };

  return (
    <form onSubmit={submit}>
      <button className="profile-button border-0 bg-light mt-1  " type="submit">
        Profile <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'user' }} />
      </button>
    </form>
  );
};
export default ProfileButton;
// }
