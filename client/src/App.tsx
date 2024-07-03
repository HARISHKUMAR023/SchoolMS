import './App.css';
import Dashbord from './pages/Admin/Dashbord';
import AddEmployee from './pages/Admin/AddEmployee';
import AddStudent from './pages/Admin/AddStudent';
import StudentDetalis from './pages/Admin/StudentDetalis';
import EmployeeDetalis from './pages/Admin/EmployeeDetalis';
import Login from './components/UI/Auth/Login';
import Register from './components/UI/Auth/Register';
import Unauthorized from './pages/Unauthorized';
import Attendance from './pages/Staff/Attendance';
import AddClass from './pages/Setups/AddClass';
import UserTable from './pages/Setups/UserTable';
import Layout from './components/layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <Dashbord />
          </ProtectedRoute>
        ),
      },
      {
        path: "Dashboard",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <Dashbord />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-employee",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddEmployee />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-student",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <AddStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "student-details",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <StudentDetalis />
          </ProtectedRoute>
        ),
      },
      {
        path: "employee-details",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <EmployeeDetalis />
          </ProtectedRoute>
        ),
      },
      {
        path: "StudentAttendance",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Attendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-class",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <AddClass/>
          </ProtectedRoute>
        ),
      },
      {
        path: "userTable",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <UserTable/>
          </ProtectedRoute>
        ),
      },
      {
        path: "Adduser",
        element: (
          <ProtectedRoute allowedRoles={['admin']}>
            <Register />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  
 
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  
  
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
