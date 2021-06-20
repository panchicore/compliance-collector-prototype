import React from 'react';
import { Chip, Container, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';


export default function LocationSRMReviewerScreen(){
  const {missionId, locationId} = useParams();
  const { dummyState, setTitle, setMenuIcon, setAppBarIcons } = React.useContext(AppContext);
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));
  const history = useHistory();

  React.useEffect(() => {
    setTitle(`${mission.name} · ${location.name}'s SRM Reviewer`);

    setAppBarIcons(
      <React.Fragment>
        <IconButton aria-label='download' color='inherit'>
          <SaveIcon />
        </IconButton>
      </React.Fragment>
    );
    setMenuIcon(
      <IconButton
        edge='start'
        onClick={() => history.push( `/missions/${missionId}/${locationId}`)}
        color='inherit'>
        <ArrowBackIcon />
      </IconButton>
    )

  }, []);

  const done = true;

  return (

    <Container>

      <Toolbar variant={'dense'} />

      <Grid container justify={'center'} alignItems={'center'} spacing={1}>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            align="left"
          >
            Review the SRM for this region
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify={'flex-end'} spacing={1}>
            <Grid item>
              <Chip
                color={done ? 'primary' : 'secondary'}
                avatar={<Avatar>{done ? '4' : '4'}</Avatar>}
                label="of 94 items"
                onClick={() => setDone(true)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            The information for SRMM displayed below was extracted from UNMINS 4
            days ago, the measures list are based on the security level area where
            the location is placed.
          </Typography>
        </Grid>

      </Grid>





    </Container>
  )
}