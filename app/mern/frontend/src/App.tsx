import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Checkout from './checkout/Checkout';
import Home from './Home';
import NotFound from './NotFound';
import CampaignGrid from './components/campaign/CampaignGrid';
import CampaignCreate from './components/campaign/CampaignCreate';
import CampaignDetails from './components/campaign/CampaignDetails';
import { BrowserRouter as Router, Routes, Route, Link as ReactLink,useSearchParams, useParams } from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/evan-sctg/MERN">
        Evan Estal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (

  <Router>
    <main>

    <Routes>
      <Route index element={<Home />} />
      <Route path="campaigns" element={<CampaignGrid />} />
      <Route path="campaigns" element={<CampaignGrid />} />
      <Route path="campaigns/new" element={<CampaignCreate />} />
      <Route path="campaigns/:urlslug" element={<CampaignDetails />} />
      <Route path="campaigns/:urlslug/donate" element={<Checkout />} />
      <Route path="donate" element={<Checkout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    </main>
  </Router>

  );
}
