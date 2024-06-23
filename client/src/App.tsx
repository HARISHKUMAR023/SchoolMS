
import './App.css'
// import { useState } from 'react';
// import Home from './pages/Home/Home';
import Dashbord from './pages/Admin/Dashbord';
import AddEmployee from './pages/Admin/AddEmployee';
import AddStudent from './pages/Admin/AddStudent';
import StudentDetalis from './pages/Admin/StudentDetalis';
import EmployeeDetalis from './pages/Admin/EmployeeDetalis';
import Footer from './components/comman/Footer/Fotter';
import Navbar from './components/layout/Navbar/Navbar';
// import Login from './components/UI/Auth/Login';
// import PrivateRoute from './components/layout/ProtectedRoute';
// import { AuthProvider } from './context/AuthContext';
import LoginPage from './components/UI/Auth/Login';
import RegisterPage from './components/UI/Auth/Register';

import Menu from './components/layout/Menu/Menu';
import { createBrowserRouter, RouterProvider, Outlet  } from "react-router-dom";
const Layout = () => {
  // const [darkMode, setDarkMode] = useState(() => {
  //   const savedDarkMode = localStorage.getItem('darkMode');
  //   return savedDarkMode === 'true'; // localStorage stores everything as a string
  // });
  // const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn )
  // if (!isLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  return (
    <div className="flex bg-[#343944] flex-row overflow-hidden h-screen">
      <Menu />
      <div className="flex flex-col w-full dark:bg-[#1e1e1e] dark:text-white">
        <Navbar />
        <div className="flex-grow overflow-y-auto bg-[#E5EAEF] dark:bg-[#333333] py-2">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  
    
  );
};

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element:  <Layout />,
    children: [
      {
        path: "Dashboard",
        element: <Dashbord/> ,
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
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reg",
    element: <RegisterPage />,
  },

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
