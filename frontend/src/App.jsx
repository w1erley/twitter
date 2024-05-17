import React, {Suspense} from 'react';

import router from "./router";
import { RouterProvider } from "react-router-dom";

export default function App() {
   return (
    <Suspense fallback={<div>Loading . . .</div>}>
        <RouterProvider router={router}/>
    </Suspense>
   );
}
