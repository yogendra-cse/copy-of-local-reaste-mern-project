
import HomePage from './routes_components/HomePage/homePage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProfileUpdatePage from './routes_components/profileUpdatePage/profileUpdatePage';
import ListPage from './routes_components/ListPage/listPage';
import SinglePage from './routes_components/singlePage/SinglePage';
import Profile from './routes_components/roleprofiles/profile';
import Login from './routes_components/login/login';
import Register from './routes_components/register/register';
import { Layout ,RequireAuth } from './routes_components/layout/layout';
import NewPostPage from './routes_components/newPostPage/newPostPage';
import {  profilePageLoader, singlePageLoader } from './lib/loader';
import { listPageLoader } from './lib/loader';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },
        
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },  
      ],
    }, 
    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
            path: "/profile",
            element: <Profile />,
            loader: profilePageLoader,
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />
      }, {
        path: "/add",
        element: <NewPostPage />
    }
      ]
    }
  ]);
  return (
   
    <RouterProvider router={router}/>
    
  )
}

export default App;
