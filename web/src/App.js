import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Swimmers from "./pages/coach/Swimmers";
import SwimmerLogs from "./pages/coach/SwimmerLogs";
import TrainingLibrary from "./pages/coach/TrainingLibrary";
import AssignWorkout from "./pages/coach/AssignWorkout";
import FeedbackView from "./pages/coach/FeedbackView";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import Layout from "./components/Layout";
import MyWorkouts from "./pages/MyWorkouts";
import SwimmerAnalytics from "./pages/coach/SwimmerAnalytics";
import WorkoutBuilder from "./pages/coach/WorkoutBuilder";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Reports from "./pages/coach/Reports";
import Assignments from "./pages/coach/Assignments";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CoachAssignment from "./pages/admin/CoachAssignment";  

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route 
        path="/forgot-password"
        element={<ForgotPassword />}
        />
        <Route 
        path="/reset-password/:token"
        element={<ResetPassword />}
        />
        

<Route
  path="/swimmers"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <Swimmers />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/logs"
  element={
    <ProtectedRoute>
      <Layout>
        <SwimmerLogs />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/library"
  element={
    <ProtectedRoute>
      <Layout>
        <TrainingLibrary />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/assign"
  element={
    <ProtectedRoute>
      <Layout>
        <AssignWorkout />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/feedback"
  element={
    <ProtectedRoute>
      <Layout>
        <FeedbackView />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/users"
  element={
    <ProtectedRoute roles={["admin"]}>
      <Layout>
        <Users />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/add-user"
  element={
    <ProtectedRoute roles={["admin"]}>
      <Layout>
        <AddUser />
      </Layout>
    </ProtectedRoute>
  }
/>
  <Route
  path="/logs/:userId"
  element={
    <ProtectedRoute>
      <Layout>
        <SwimmerLogs />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/my-workouts"
  element={
    <ProtectedRoute roles={["swimmer"]}>
      <Layout>
        <MyWorkouts />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/builder"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <WorkoutBuilder />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/analytics/:userId"
  element={
    <ProtectedRoute>
      <Layout>
        <SwimmerAnalytics />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/assignments"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <Assignments />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/assignments/:userId"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <Assignments />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/reports"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <Reports />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute roles={["admin"]}>
      <Layout>
        <AdminDashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/coach/dashboard"
  element={
    <ProtectedRoute roles={["coach"]}>
      <Layout>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  }
/>
<Route
  path="/coach-assignment"
  element={
    <ProtectedRoute roles={["admin"]}>
      <Layout>
        <CoachAssignment />
      </Layout>
    </ProtectedRoute>
  }
/>

  </Routes>
    </BrowserRouter>
  );
}

export default App;