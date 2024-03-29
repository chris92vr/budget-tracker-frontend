import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LogoutButton = () => {
  const submit = (e) => {
    e.preventDefault();

    const response = fetch('https://budgeet-tracker-api.herokuapp.com/logout', {
      credentials: 'include',
      mode: 'cors',
      method: 'POST',
      AccessControlAllowOrigin:
        'https://budget-tracker-frontend-delta.vercel.app',

      headers: { 'Content-Type': 'application/json' },
    });

    response
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
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
      <button className="logout-button border-0 bg-light mt-1 " type="submit">
        Log Out{' '}
        <FontAwesomeIcon icon={{ prefix: 'fas', iconName: 'sign-out-alt' }} />
      </button>
    </form>
  );
};

export default LogoutButton;
// }
