import useAuth from "../../hooks/useAuth";
const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();

  console.log({ user, isAuthenticated, loading });
  return <div>Dashboard</div>;
};

export default Dashboard;
