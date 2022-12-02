import "./home.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import Main from "../../components/sidebar";
function Home() {
    return (
        <ProSidebarProvider>
            <Main />
        </ProSidebarProvider>
    );
}

export default Home;
