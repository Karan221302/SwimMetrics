import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
export default function Layout({ children }) {
    return (
      <div>
        <Navbar />
  
        <div style={{ display: "flex" }}>
          <Sidebar />
  
          <div style={{
            marginLeft: 50,
            flex: 1,
            padding: 30,
            background: "#f1f5f9",
            minHeight: "100vh"
          }}>
            {children}
          </div>
        </div>
      </div>
    );
  }