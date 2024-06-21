
import './App.css'
import { useState } from 'react';
// import Home from './pages/Home/Home';
import Dashbord from './pages/Admin/Dashbord';
import AddEmployee from './pages/Admin/AddEmployee';
import AddStudent from './pages/Admin/AddStudent';
import StudentDetalis from './pages/Admin/StudentDetalis';
import EmployeeDetalis from './pages/Admin/EmployeeDetalis';
import Navbar from './components/layout/Navbar/Navbar';

import Menu from './components/layout/Menu/Menu';
import { createBrowserRouter, RouterProvider, Outlet ,Navigate } from "react-router-dom";
const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true'; // localStorage stores everything as a string
  });
  // const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div className={`max-h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
    <div className="bg-white dark:bg-[#1e1e1e] text-black dark:text-white flex flex-row">
      <div className="menucontainer ">
        <Menu />
      </div>
      <div className="content-Container w-full pb-4 max-h-full dark:bg-[#1e1e1e] dark:text-white">
        {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <ToastContainer /> */}
        <Navbar/>
        <div className="bg-[#E5EAEF] dark:bg-[#333333] py-2 h-full overflow-y-scroll rounded-s-md">
          {/* Adjust the height of the div below */}
          
            <Outlet  />
          
        </div>
        
        {/* <Footer /> */}
      </div>
    </div>
  </div>
  
    
  );
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "Dashboard",
        element: <Dashbord/>,
      },

      {
        path: "AddEmployee",
        element: <AddEmployee />,
      },
      {
        path: "AddStudent",
        element: <AddStudent/>,
      },
      {
        path: "StudentDetails",
        element: <StudentDetalis/>,
      },
      {
        path: "EmployeeDetails",
        element: <EmployeeDetalis/>,
      },
      // {
      //   path: "FinancialYear",
      //   element: <FinancialYear />,
      // },
      // {
      //   path: "Products",
      //   element: <Products  />,
      // },
      // {
      //   path: "Manufacturer",
      //   element: <Manufacturer />,
      // },
      // {
      //   path: "Paymenttype",
      //   element: <Paymenttype/>,
      // },
      // {
      //   path: "Suppliersview",
      //   element: <Suppliers />,
      // },
      // {
      //   path: "Patients",
      //   element: <Patients />,
      // },
      // {
      //   path: "Purchase",
      //   element: <Purchase />,
       
      // },
      // {
      //   path: "/dashboard/Purchase/addPurchase",
      //   element: <AddPurchase />,
       
      // },
      // {
      //   path: "Billing",
      //   element: <Billing />,
       
      // },
      // {
      //   path: "*",
      //   element: <Pagenotfouned />,
      // },

    ],
  },
  // {
  //   path: "/",
  //   element: <Login />,
  // },

  // {
  //   path: "/logview",
  //   element: <Log />,
  // },
  // {
  //   path: "*",
  //   element: <Pagenotfouned />,
  // }

]);

function App() {
 

  return (
    <>
  <RouterProvider router={router}  />
    </>
  )
}

export default App
