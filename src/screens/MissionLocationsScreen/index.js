import React from 'react';
import {
  AppBar,
  BottomNavigation, BottomNavigationAction,
  Button, Card, CardActions, CardContent, Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import MoreIcon from '@material-ui/icons/MoreVert';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FeedbackIcon from '@material-ui/icons/Feedback';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GetAppIcon from '@material-ui/icons/GetApp';
import { ArrowDownward } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import BackupIcon from '@material-ui/icons/Backup';
import ExploreIcon from '@material-ui/icons/Explore';
import SubjectIcon from '@material-ui/icons/Subject';
import LocationCard from './LocationCard';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


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

export default function MissionLocationsScreen() {
  const classes = useStyles();
  const history = useHistory();
  const { missionId } = useParams();
  const [activePage, setActivePage] = React.useState(0);
  const { dummyState, setTitle, setAppBarIcons, setMenuIcon } = React.useContext(AppContext);
  const mission = dummyState.active_mission;

  React.useState(() => {
    setAppBarIcons(
      <React.Fragment>
        <IconButton aria-label='download' color='inherit'>
          <ArrowDownward />
        </IconButton>
        <IconButton aria-label='search' color='inherit'>
          <MoreIcon />
        </IconButton>
      </React.Fragment>,
    );
    setMenuIcon(
      <IconButton
        edge='start'
        onClick={() => history.push( `/missions`)}
        color='inherit'>
        <ArrowBackIcon />
      </IconButton>
    )
    setTitle(mission.name);
  }, []);

  const goToLocationScreen = (locationId) => {
    history.push(`/missions/${missionId}/${locationId}`);
  };
  return (
    <React.Fragment>
      <Toolbar variant={'dense'} />
      <Container>
        <Typography variant='h5' gutterBottom>This Mission</Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <PlaylistAddIcon />
              <Typography>Ready to collect</Typography>
              <Typography variant={'caption'}>status</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <LocationOnIcon />
              <Typography>2 of 7</Typography>
              <Typography variant={'caption'}>locations assessed</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <FeedbackIcon />
              <Typography>12 new</Typography>
              <Typography variant={'caption'}>recommendations</Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              <VisibilityIcon />
              <Typography>7 new</Typography>
              <Typography variant={'caption'}>observations</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <SubjectIcon />
              <Typography>1 of 4</Typography>
              <Typography variant={'caption'}>country executive summaries</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Divider style={{ margin: 30 }} />

        {mission.locations.map(loc => {
          return (
            <LocationCard location={loc} goToLocationScreen={() => goToLocationScreen(loc.id)} />
          )
        })}

      </Container>

      <AppBar position='fixed' color='primary' style={{ top: 'auto', bottom: 0 }}>
        <BottomNavigation
          value={activePage}
          onChange={(event, newValue) => {
            setActivePage(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label='Locations' icon={<LocationOnIcon />} />
          <BottomNavigationAction label='Executive Summary' icon={<SubjectIcon />} />
          <BottomNavigationAction label='Country Links' icon={<ExploreIcon />} />
          <BottomNavigationAction label='Backups' icon={<BackupIcon />} />
          <BottomNavigationAction label='Send Mission' icon={<SendIcon />} />
        </BottomNavigation>
      </AppBar>

    </React.Fragment>
  );
}