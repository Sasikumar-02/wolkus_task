import React, { useState } from "react";
import { Layout, Space } from "antd";
import { useOutlet } from "react-router";
import Headerbar from "./Headerbar";
import Sidebar from "./Sidebar";
import './styles/Dashboard.css';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    // Toggle the theme
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // Save the new theme to local storage
    localStorage.setItem('theme', newTheme);
    // Update the theme state
    setTheme(newTheme);
  };

  const headerStyle: React.CSSProperties = {
    color: theme === 'light' ? 'black' : 'white',
    height: 90,
    backgroundColor: theme === 'light' ? '#E7ECF0' : '#333',
    position: 'fixed',
    right: 0,
    left: 200,
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    marginTop: 90,
    marginLeft: 200,
    height: `calc(100vh - 90px)`,
    color: theme === 'light' ? 'black' : 'white',
    backgroundColor: theme === 'light' ? '#fff' : '#555',
    borderTopLeftRadius: '20px',
    overflowY: 'auto',
  };

  const siderStyle: React.CSSProperties = {
    width: '100px',
    position: 'fixed',
    textAlign: 'center',
    lineHeight: '70px',
    color: theme === 'light' ? 'black' : 'white',
    height: '100vh',
    backgroundColor: theme === 'light' ? '#E7ECF0' : '#333',
  };

  const outlet = useOutlet();

  // Ensure outlet is not null before enhancing it
  const enhancedOutlet = outlet && React.cloneElement(outlet, { onToggleTheme: toggleTheme, theme: theme });

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Sider style={siderStyle}>
          <Sidebar onToggleTheme={toggleTheme} theme={theme}/>
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <Headerbar onToggleTheme={toggleTheme} theme={theme} />
          </Header>
          <Content style={contentStyle}>
            {enhancedOutlet}
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default DashboardLayout;
