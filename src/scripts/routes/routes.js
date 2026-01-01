import Dashboard from '../views/pages/stories/dashboard';

const Login = { async render() { return '<h1>Login Page</h1>'; }, async afterRender() {} };
const Register = { async render() { return '<h1>Register Page</h1>'; }, async afterRender() {} };
const AddStory = { async render() { return '<h1>Add Story</h1>'; }, async afterRender() {} };

const routes = {
  '/': new Dashboard(),
  '/auth/login': Login,
  '/auth/register': Register,
  '/stories/add': AddStory,
};

export default routes;
