import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Navbar from "../../../components/Navbar";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: 'var(--bg-primary)', color: '#888', fontSize: '1rem'
      }}>
        Loading...
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Protected;
