import React, {useState, useEffect} from "react";
import { Modal,Menu} from "antd";
import { Link, useNavigate,useLocation } from "react-router-dom";
import './styles/Dashboard.css'
import { PoweroffOutlined, HomeFilled, UserAddOutlined, AppstoreAddOutlined, UserOutlined, UsergroupAddOutlined, ScheduleOutlined, PullRequestOutlined, ScheduleFilled } from "@ant-design/icons";
import LoginPage from "./Login";
import { HeaderbarProps } from "./Headerbar";
const Sidebar: React.FC<HeaderbarProps> = ({onToggleTheme, theme}) => {
    const [activeKey, setActiveKey] = useState("")
    const Location = useLocation();
    useEffect(() => {
        console.log("location.pathName", Location.pathname)
        const pathSegments = Location.pathname.split("/");
        setActiveKey(pathSegments[pathSegments.length - 1]);
        console.log("pathsegments", pathSegments[pathSegments.length - 1])
    }, [Location.pathname]);
    return (
        <div style={{marginTop:'100px'}}>
            <Menu style={{color: theme === 'light' ? 'black' : 'white',
    backgroundColor: theme === 'light' ? 'rgb(231, 236, 240)' : 'rgb(51, 51, 51)',}} mode="inline" selectedKeys={[activeKey]}>
            <>
                <Menu.Item
                    id="menu"
                    key="dashboard"
                    icon={<HomeFilled />}
                    className={activeKey==='dashboard' ? "active" : ""}
                >
                    <Link to="/dashboard">Dashboard</Link>
                </Menu.Item>
            </>
            </Menu>
        </div>
    );
};

export default Sidebar;