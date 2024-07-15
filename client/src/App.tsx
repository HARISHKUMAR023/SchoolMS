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
import AssignClassSection from './pages/Setups/AssignClassSection';
import UserTable from './pages/Setups/UserTable';
import Layout from './components/layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/layout/ProtectedRoute';
import PublicRoute from './components/layout/PublicRoute';
import Mystudent from './pages/Staff/Mystudent';
import SubmitHomework from './pages/Service/SubmitHomework';
import Logmanagement from './pages/Logmanagement/Logmanagement';
import Side from './side/side'
import Info from './pages/Info/Info'

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
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
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
      {
        path: "Student-class-section",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <AssignClassSection/>
          </ProtectedRoute>
        ),
      },
      {
        path: "mysudent",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <Mystudent/>
          </ProtectedRoute>
        ),
      },
      {
        path: "submit-homework",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <SubmitHomework/>
          </ProtectedRoute>
        ),
      },
      {
        path: "log",
        element: (
          <ProtectedRoute allowedRoles={['admin', 'teacher']}>
            <Logmanagement/>
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

  {
    path: "/side",
    element: <Side />,
  },
  {
    path: "/info",
    element: (
     
        <Info />
    )
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
