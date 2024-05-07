import { Route, Routes } from 'react-router-dom'; // Import BrowserRouter for routing
import './App.css';
import PartnerList from './component/PartnerList';
import Home from './component/Home';
import AddPartner from './component/AddPartner';
import EditPartner from './component/EditPartner';
import ServiceUsingRegistration from './component/ServiceUsingRegistration';
import PartnerSearch from './component/PartnerSearch';
import ServiceUsageByPartner from './component/ServiceUsageByPartner';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} /> {/* Use self-closing tags for Route components */}
          <Route path='/partner/list' element={<PartnerList />} />
          <Route path='/partner/add/' element={<AddPartner></AddPartner>}></Route>
          <Route path='/partner/edit/:id' element={<EditPartner></EditPartner>}></Route>
          <Route path='/service-registration' element={<ServiceUsingRegistration></ServiceUsingRegistration>}></Route>
          <Route path='/pay-invoice' element={<PartnerSearch></PartnerSearch>}></Route>
          <Route path='/service-usage-by-partner/:id' element={<ServiceUsageByPartner></ServiceUsageByPartner>}></Route>
        </Routes>
    </div>
  );
}

export default App;
