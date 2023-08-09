import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: false,
            retry: false
        }
    }
});

root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </QueryClientProvider>
);
