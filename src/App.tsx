import "./App.css";
import DomainResolver from "./components/DomainResolver";
//import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WalletAnalyzer from "./components/WalletAnalyzer";

const App : React.FC = function(){
  return (
    <div className="p-4">
      <Navbar />
      <h1 className="font-bold text-3xl">Blockchain Wallet Analyzer</h1>
      <DomainResolver />
      <WalletAnalyzer />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
