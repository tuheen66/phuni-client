import { Button, Layout } from "antd";
const { Header, Content } = Layout;
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const MainLayout = () => {
const dispatch = useDispatch()

  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button onClick={handleLogout}>Logout</Button>
        </Header>
        
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
