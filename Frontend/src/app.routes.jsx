import {createBrowserRouter} from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/home";
import Report from "./features/interview/pages/report";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Profile from "./features/profile/pages/Profile";
import Settings from "./features/settings/pages/Settings";
import History from "./features/history/pages/History";

export const router = createBrowserRouter([
    { path: "/login",     element: <Login /> },
    { path: "/register",  element: <Register /> },
    { path: "/dashboard", element: <Protected><Dashboard /></Protected> },
    { path: "/",          element: <Protected><Home /></Protected> },
    { path: "/report",    element: <Protected><Report /></Protected> },
    { path: "/profile",   element: <Protected><Profile /></Protected> },
    { path: "/settings",  element: <Protected><Settings /></Protected> },
    { path: "/history",   element: <Protected><History /></Protected> },
])