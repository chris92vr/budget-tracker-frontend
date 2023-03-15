import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';

const ProfileButton = () => {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const response = fetch(process.env.REACT_APP_API_URL + '/protected', {
      credentials: 'include',
      mode: 'cors',
      AccessControlAllowOrigin: 'http://localhost:3000',
      AccessControlAllowCredentials: 'true',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    response
      .then((res) => {
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
