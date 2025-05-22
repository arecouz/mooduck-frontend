import NavBar from './components/NavBar';
import Content from './components/Content';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <Content/>
      <Footer />
    </div>
  );
};

export default Layout;
