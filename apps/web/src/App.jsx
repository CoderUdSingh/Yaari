import { RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { routes } from "./routes/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCredentials,
  selectAuthLoading,
  setCredentials,
} from "./redux/slices/authSlice";
import axiosInstance from "./utils/axiosInstance";

function App() {
  const dispatch = useDispatch();
  const isAuthloading = useSelector(selectAuthLoading);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/auth/me");
        dispatch(setCredentials(response.data.user));
      } catch (error) {
        console.log("User is not logged in or token expired", error);
        dispatch(clearCredentials());
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isAuthloading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-xl font-bold">Loading Yaari...</h1>
      </div>
    );
  }

  return <RouterProvider router={routes} />;
}

export default App;
