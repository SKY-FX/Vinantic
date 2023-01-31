import { propOr } from "ramda";

const onUserSignIn = ({ onHandle, user: { username, password } }) => {
  fetch('/vinanticApi/adminLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then((data) => {
      console.info('onUserSignIn', data);
      const result = propOr({}, 'result', data);

      onHandle({
        label: 'GET_ADMIN_PERMISSION',
        permission: result
      })
    });
}

export default onUserSignIn