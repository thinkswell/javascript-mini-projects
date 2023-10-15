import React from 'react'
import { red } from '@mui/material/colors';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';


export default function Cards( {projectName, imageUrl, altname, description} ) {
    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {projectName[0].toUpperCase()}
          </Avatar>
        }
        title={projectName}
      />
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={altname}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      </CardActions>
    </Card>
    )
}
