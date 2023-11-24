import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

import { WorkoutsContextProvider } from './context/WorkoutContext';
import { OverdueSIContextProvider} from './context/OverdueSIContext';
import { InventoryContextProvider} from './context/InventoryContext';
//import reportWebVitals from './reportWebVitals';  This was deleted, not important

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
      <WorkoutsContextProvider>
        <InventoryContextProvider>
        <OverdueSIContextProvider>
        <App />
        </OverdueSIContextProvider>
        </InventoryContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); This was deleted, not important
