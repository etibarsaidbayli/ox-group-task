import React, {JSX} from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from "../pages/Login";
import Products from '../pages/Products';
import Search from '../pages/Search';
import { getToken } from '../utils/auth';
import AppLayout from "../components/Layout";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
	const token = getToken();
	return token ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
	const token = getToken();

	const routes = useRoutes([
		{
			path: '/login',
			element: token ? <Navigate to="/products" /> : <Login />,
		},
		{
			path: '/products',
			element: (
			 <PrivateRoute
			  element={
				  <AppLayout>
					  <Products />
				  </AppLayout>
			  }
			 />
			),
		},
		{
			path: '/search',
			element: (
			 <PrivateRoute
			  element={
				  <AppLayout>
					  <Search />
				  </AppLayout>
			  }
			 />
			),
		},
		{
			path: '*',
			element: token ? <Navigate to="/products" /> : <Navigate to="/login" />,
		},
	]);

	return routes;
};

export default AppRoutes;
