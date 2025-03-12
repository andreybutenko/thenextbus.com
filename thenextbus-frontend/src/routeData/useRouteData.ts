import { useContext } from 'react';
import { RouteDataContext } from './RouteDataContext';

export const useRouteData = () => useContext(RouteDataContext);
