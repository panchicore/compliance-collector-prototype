import React from 'react';
import { Button, Card, CardActions, CardContent, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { percentageOfCompletion } from '../../locationUtils';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function LocationCard({location, goToLocationScreen}) {
  const classes = useStyles();
  let percent = percentageOfCompletion(location);


  return (
    <Card style={{marginBottom: 30}}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h5" component="h2">
              {location.name}
            </Typography>
            <Typography color="body2">
              {location.office_type}
            </Typography>
            <Typography color="textSecondary">
              <LocationOnIcon fontSize="small"/> {location.city.region.name}, {location.city.name}
            </Typography>

          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row"
                  justify="flex-end"
                  alignItems="center">
              <Grid item xs={4}>
                <Paper elevation={0} className={classes.paper}>
                  <Typography variant={'h4'}>{percent}%</Typography>
                  <Typography variant={'caption'}>completion</Typography>
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={0} className={classes.paper}>
                  {percent < 100 ? <Chip label="Basic" label={"Pending"} color="secondary" /> : <Chip label="Basic" label={"Completed"} color="primary" />}

                </Paper>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

      </CardContent>
      <CardActions>
        <Button color="primary" style={{marginLeft: 'auto'}} onClick={goToLocationScreen}>MORE DETAILS</Button>
      </CardActions>
    </Card>
  )
}