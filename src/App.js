import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { AppBar, Container, CssBaseline, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LoginScreen from './screens/LoginScreen';
import { AppContext } from './context';
import { useLocation, Route, Switch, useHistory } from 'react-router-dom';
import dummyState from './missions_db.json'
import MissionsScreen from './screens/MissionsScreen';
import LocationScreen from './screens/LocationScreen';
import MissionLocationsScreen from './screens/MissionLocationsScreen';
import QuestionnaireRecsScreen from './screens/QuestionnaireRecsScreen';
import SearchIcon from '@material-ui/icons/Search';
import QuestionsScreen from './screens/QuiestionsScreen';
import LocationExecutiveSummaryScreen from './screens/LocationExecutiveSummaryScreen';
import LocationPastRecommendationsReviewerScreen from './screens/LocationPastRecommendationsReviewerScreen';
import LocationSRMReviewerScreen from './screens/LocationSRMReviewerScreen';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [title, setTitle] = useState('eTREMP App');
  const [appBarIcons, setAppBarIcons] = useState(null);
  const [menuIcon, setMenuIcon] = useState(null);
  const context = { title, setTitle, dummyState, setAppBarIcons, setMenuIcon };
  const location = useLocation();
  const history = useHistory();

  return (

    <AppContext.Provider value={context}>
      <React.Fragment>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar variant='dense'>
            {menuIcon ? menuIcon : <IconButton
              edge='start'
              onClick={() => history.goBack()}
              color='inherit'>
                <MenuIcon />}
            </IconButton>}
            <Typography variant='h6' color='inherit' style={{ flexGrow: 1}}>
              {title}
            </Typography>
            {appBarIcons}
          </Toolbar>
        </AppBar>
        <Container maxWidth='md' disableGutters>


          <Switch>
            <Route path='/missions/:missionId/:locationId/qa/:questionId'>
              <QuestionsScreen />
            </Route>
            <Route path='/missions/:missionId/:locationId/qa'>
              <QuestionnaireRecsScreen />
            </Route>
            <Route path='/missions/:missionId/:locationId/es'>
              <LocationExecutiveSummaryScreen />
            </Route>
            <Route path='/missions/:missionId/:locationId/rw'>
              <LocationPastRecommendationsReviewerScreen />
            </Route>
            <Route path='/missions/:missionId/:locationId/srm'>
              <LocationSRMReviewerScreen />
            </Route>
            <Route path='/missions/:missionId/:locationId'>
              <LocationScreen />
            </Route>
            <Route path='/missions/:missionId'>
              <MissionLocationsScreen />
            </Route>
            <Route path='/missions'>
              <MissionsScreen />
            </Route>
            <Route path='/'>
              <LoginScreen />
            </Route>
          </Switch>

        </Container>
      </React.Fragment>
    </AppContext.Provider>

  );
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
