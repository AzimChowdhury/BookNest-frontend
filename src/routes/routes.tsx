import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import AllBooks from '../pages/AllBooks';
import NotFound from '../components/NotFound';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import BookDetails from '../pages/BookDetails';
import EditBook from '../pages/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/allBooks',
        element: <AllBooks />,
      },
      {
        path: '/book/:id',
        element: <BookDetails />,
      },
      {
        path: '/editbook/:id',
        element: <EditBook />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ]
  }
]);

export default routes;
