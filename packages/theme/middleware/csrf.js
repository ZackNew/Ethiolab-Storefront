const generateCSRFToken = () => {
  let token = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

export default function ({ req, res, store }) {
  store.dispatch('csrfToken/addToken', { csrf: generateCSRFToken() });
  if (res) {
    res.setHeader('X-CSRF-TOKEN', generateCSRFToken());
  }
}
