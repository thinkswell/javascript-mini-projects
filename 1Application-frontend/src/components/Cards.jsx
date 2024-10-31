import React from 'react';
import { red } from '@mui/material/colors';
import { Avatar, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

export default function Cards({ projectName = 'NA', imageUrl, altname = 'Project Image', description = 'No description available' }) {
  // Safely handle the match and join logic
  const projectCodeArray = projectName ? projectName.match(/[0-9 A-Z]/g) : null;
  const projectCode = projectCodeArray ? projectCodeArray.join('').slice(0, 2) : 'NA'; // Default if match is null

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'start' }}>
        <Avatar sx={{ bgcolor: red[500], mr: 2 }} aria-label="letter">
          {projectCode}
        </Avatar>
        <Typography color="text.secondary" variant="h5">
          {projectName}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl || 'defaultImageUrl.jpg'}
        alt={altname}
      />
      <CardContent>
        <Typography color="text.secondary" variant="subtitle1">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
  );
}
