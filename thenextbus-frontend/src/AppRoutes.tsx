import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DeparturesPage } from './pages/DeparturesPage';
import { StopIdInputPage } from './pages/StopIdInputPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <StopIdInputPage />,
    },
    {
        path: '/departures/:stopId',
        element: <DeparturesPage />,
    },
]);

export function AppRoutes(): React.ReactElement {
    return <RouterProvider router={router} />;
}
