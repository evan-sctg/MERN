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
import { useSearchParams, useParams, Routes, Route,  } from "react-router-dom";
import { CampaignOBJ } from "../../DataStructures";
import Button from '@mui/material/Button';
import Chat from './Chat';


export default function CampaignDetails() {
  const theme = useTheme();

  const [searchParams, setSearchParams] = useSearchParams();
  // const valtest = searchParams.get("test");
  let { urlslug } = useParams();

  const [recordDetails, setRecordDetails] = useState<CampaignOBJ>({} as CampaignOBJ);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
      // .get('https://webhook.site/d9289fb5-cf79-425a-8ee1-a3255c83423d')
    axios
      .get('http://localhost:3000/api/campaigns/'+urlslug)
      .then((res) => {
        console.log(res);
        setRecordDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

function DoRenderImage(src: string , alt: string ): any {
  if (src) {
    return (<img src={src} alt={alt} />);
  }
  return (<span />);
}

function DoRenderVideo( src: string , alt: string  ): any {
  if (src) {
    const match = src.match(/^.*v=([^&]*)|^.*youtu\.be\/([^&]*)/);
    if (match) {
      const videoId = match[1] || match[2];
      src = `https://www.youtube.com/embed/${videoId}`;
    }
    return (<iframe width="560" height="315" src={src} title={alt} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>);
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
          {recordDetails.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {recordDetails.description}
        </Typography>
        <Typography component="h2" variant="h4" color="text.primary">
          ${recordDetails.currentAmount} of ${recordDetails.currentAmount} Raised
        </Typography>
      </Box>
      <Grid container spacing={1}>
      
                {DoRenderImage(recordDetails.imageUrl,recordDetails.title)}
                {DoRenderVideo(recordDetails.youtubeUrl,recordDetails.title)}


                <Button
                  fullWidth
                  variant='contained'
                  component="a"
                  href={("/campaigns/"+urlslug+"/donate")}
                  target="_blank"
                >
                  Donate Now
                </Button>

                <Chat />
      </Grid>

    </Container>
  );
}
