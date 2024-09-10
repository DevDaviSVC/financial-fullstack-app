import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}