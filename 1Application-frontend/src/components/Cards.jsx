import React from 'react'
import { red } from '@mui/material/colors';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';


export default function Cards( {projectName, imageUrl, altname, description} ) {
    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardContent sx={{display: 'flex', justifyContent:'start'}}>
          <Avatar sx={{ bgcolor: red[500], mr: 2}} aria-label="leter">
            {projectName.match(/[0-9 A-Z]/g).join('').slice(0,2)}
          </Avatar>
        <Typography color="text.secondary" variant="h5">
            {projectName}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
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
    )
}
