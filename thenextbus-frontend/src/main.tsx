import '@cloudscape-design/global-styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { DeparturesPage } from './pages/DeparturesPage.tsx';
import { StopIdInputPage } from './pages/StopIdInputPage.tsx';

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

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
