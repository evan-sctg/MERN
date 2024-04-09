import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { CampaignOBJ } from "../../DataStructures";





export default function CampaignGrid() {
  const theme = useTheme();



    const [activeCampaigns, setActiveCampaigns] = useState([]);
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = () => {
        // .get('https://webhook.site/d9289fb5-cf79-425a-8ee1-a3255c83423d')
      axios
        .get('http://localhost:3000/api/campaigns')
        .then((res) => {
          console.log(res);
          setActiveCampaigns(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    function DoRenderImage(src: string , alt: string ): any {
      if (src) {
        return (<img src={src} alt={alt} width='75px' />);
      }
      return (<span />);
    }
    

  return (
    <Container
      id="campaigns"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Active Campaigns <br /> Empower Causes You Care About
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Find a cause you care about and help make a real difference. Browse through these inspiring fundraising campaigns and donate to the ones that move you.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {activeCampaigns.map((activeCampaign: CampaignOBJ, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>

              
          
           <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  {typeof activeCampaign}
                  {activeCampaign.title}
                </Typography>
              </CardContent>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {activeCampaign.description}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  http://localhost:81/campaigns/{activeCampaign.url}
                </Typography>
              </CardContent>

                {DoRenderImage(activeCampaign.imageUrl,activeCampaign.title)}

              </Box>
              <CardActions>
                <Button
                  fullWidth
                  variant='contained'
                  component="a"
                  href={("/campaigns/"+activeCampaign.url)}
                  target="_blank"
                >
                  View Campaign Page
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
