import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import Dashboard from '../pages/stories/dashboard';
import AddStory from '../pages/stories/add-story';
import DetailStory from '../pages/stories/detail';
import Favorite from '../pages/stories/favorite';

const routes = {
  '/': Dashboard,
  '/login': Login,
  '/register': Register,
  '/add': AddStory,
  '/stories/:id': DetailStory,
  '/favorite': Favorite
};

export default routes;
