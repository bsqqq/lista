import * as React from 'react'
import { Providers } from './contexts/Providers';
import { Routes } from './routes/app.routes';

export default function App() {
  return (
    <Providers>
      <Routes/>
    </Providers>
  );
}
