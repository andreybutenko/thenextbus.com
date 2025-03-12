import '@cloudscape-design/global-styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRoutes } from './AppRoutes.tsx';
import './index.css';
import { RouteDataLoadedContext } from './routeData/RouteDataLoadedContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouteDataLoadedContext>
            <AppRoutes />
        </RouteDataLoadedContext>
    </StrictMode>
);
