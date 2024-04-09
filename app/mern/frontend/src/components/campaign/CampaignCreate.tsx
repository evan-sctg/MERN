import * as React from 'react';
import {ChangeEvent,FormEvent,useState, useEffect} from 'react';
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

const userTestimonials = [
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
    name: 'Remy Sharp',
    occupation: 'Senior Engineer',
    testimonial:
      "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
    name: 'Travis Howard',
    occupation: 'Lead Product Designer',
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
    name: 'Cindy Baker',
    occupation: 'CTO',
    testimonial:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
  },
  {
    avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
    name: 'Julia Stewart',
    occupation: 'Senior Engineer',
    testimonial:
      "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
  },
  {
    avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
    name: 'John Smith',
    occupation: 'Product Designer',
    testimonial:
      "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
  },
  {
    avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
    name: 'Daniel Wolf',
    occupation: 'CDO',
    testimonial:
      "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
  },
];

const whiteLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628e8573c43893fe0ace_Sydney-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d520d0517ae8e8ddf13_Bern-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f46794c159024c1af6d44_Montreal-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e891fa22f89efd7477a_TerraLight.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a09d1f6337b1dfed14ab_colorado-white.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5caa77bf7d69fb78792e_Ankara-white.svg',
];

const darkLogos = [
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560628889c3bdf1129952dc_Sydney-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f4d4d8b829a89976a419c_Bern-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f467502f091ccb929529d_Montreal-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e911fa22f2203d7514c_TerraDark.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/6560a0990f3717787fd49245_colorado-black.svg',
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/655f5ca4e548b0deb1041c33_Ankara-black.svg',
];

const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function CampaignCreate() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;


  const [formValue, setformValue] = React.useState({
    url: 'feed-the-hungry',
    title: 'Feed The Hungry',
    description: 'Helpin Hands',
    goalAmount: '100',
    currentAmount: '0',
    imageUrl: 'https://www.feedingamerica.org/themes/custom/ts_feeding_america/images/svgs/logo-2020.svg',
    youtubeUrl: 'https://www.youtube.com/watch?v=Py5JW5J8afg',
    startDate: '',
    endDate: '',
    ownerId: '',
    donations: ''
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent default form submission if needed
    event.preventDefault();

    const loginFormData = new FormData();
    loginFormData.append("url", formValue.url);
    loginFormData.append("title", formValue.title);
    loginFormData.append("description", formValue.description);
    loginFormData.append("goalAmount", formValue.goalAmount);
    loginFormData.append("currentAmount", formValue.currentAmount);
    loginFormData.append("imageUrl", formValue.imageUrl);
    loginFormData.append("youtubeUrl", formValue.youtubeUrl);
    loginFormData.append("startDate", formValue.startDate);
    loginFormData.append("endDate", formValue.endDate);
    loginFormData.append("ownerId", formValue.ownerId);
    loginFormData.append("donations", formValue.donations);
  
    try {
      // make axios post request
      // axios.post("https://webhook.site/d9289fb5-cf79-425a-8ee1-a3255c83423d", loginFormData)
      // axios.post("https://webhook.site/d9289fb5-cf79-425a-8ee1-a3255c83423d", {
      axios.post("http://localhost:3000/api/campaigns", {
      url: formValue.url,
      title: formValue.title,
      description: formValue.description,
      goalAmount: formValue.goalAmount,
      currentAmount: formValue.currentAmount,
      imageUrl: formValue.imageUrl,
      youtubeUrl: formValue.youtubeUrl,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      ownerId: formValue.ownerId,
      donations: formValue.donations
    })
      .then((response) => {
        console.log(response);
      });
    } catch(error) {
      console.log(error)
    }
  }


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setformValue({
        ...formValue,
        [event.target.name]: event.target.value
      });
    }

    return (
     <form onSubmit={handleSubmit}>
        <p>Campaign Setup</p>
        <input
          type="text"
          name="title"
          placeholder="Feed The Hungry"
          value={formValue.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="url"
          placeholder="feed-the-hungry"
          value={formValue.url}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="A Local Effort to Feed The Hungry."
          value={formValue.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="goalAmount"
          placeholder="100"
          value={formValue.goalAmount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="https://www.feedingamerica.org/themes/custom/ts_feeding_america/images/svgs/logo-2020.svg"
          value={formValue.imageUrl}
          onChange={handleChange}
        />
        <input
          type="text"
          name="youtubeUrl"
          placeholder="https://www.youtube.com/watch?v=Py5JW5J8afg"
          value={formValue.youtubeUrl}
          onChange={handleChange}
        />
        <button
          type="submit"
        >
          Create Campaign
        </button>
      </form>
    );
}
