import React from 'react';
import {
  Button,
  Card,
  CardActionArea, CardContent,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { ArrowDownward } from '@material-ui/icons';
import SendIcon from '@material-ui/icons/Send';
import MoreIcon from '@material-ui/icons/MoreVert';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SubjectIcon from '@material-ui/icons/Subject';
import RestoreIcon from '@material-ui/icons/Restore';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { percentageOfCompletion, percentageOfCompletionES } from '../../locationUtils';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  incompleted: {
    backgroundColor: '#fbdcd7'
  },
  completed: {
    backgroundColor: '#b0fbbb'
  },

}));

export default function LocationScreen(){
  const history = useHistory();
  const classes = useStyles();
  const {missionId, locationId} = useParams();

  const { dummyState, setTitle, setMenuIcon } = React.useContext(AppContext);
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));

  let percentOfCompletion = percentageOfCompletion(location);
  let percentOfCompletionExecutiveSummary = percentageOfCompletionES(location.executive_summaries);

  React.useEffect(() => {
    setTitle(`${mission.name} · ${location.name}`);

    setMenuIcon(
      <IconButton
        edge='start'
        onClick={() => history.push( `/missions/${missionId}`)}
        color='inherit'>
        <ArrowBackIcon />
      </IconButton>
    )

  }, []);

  const goToQuestionnaireForRecommendations = () => {
    history.push(`/missions/${missionId}/${locationId}/qa`)
  }

  const goToExecutiveSummary = () => {
    history.push(`/missions/${missionId}/${locationId}/es`)
  }

  return (
    <Container>
      <Toolbar variant={'dense'} />
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <Card>
            <CardActionArea onClick={()=>goToQuestionnaireForRecommendations()}>
              <CardContent className={classes.paper}>
                  <AssignmentIcon fontSize={'large'} />
                  <Typography variant={'body1'}>Questionnaire ({percentOfCompletion}%)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{goToExecutiveSummary()}}>
              <CardContent className={classes.paper}>
                <SubjectIcon fontSize={'large'} />
                <Typography variant={'body1'}>Executive Summary ({percentOfCompletionExecutiveSummary}%)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{alert("https://codesandbox.io/s/reviewapp-v1-3chpv")}}>
              <CardContent className={classes.paper}>
                <RestoreIcon fontSize={'large'} />
                <Typography variant={'body1'}>Past Recommendations Reviewer (100%)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{alert("https://codesandbox.io/s/srm-measures-app-v1-qlfl6?file=/src/Measures.js")}}>
              <CardContent className={classes.paper}>
                <VerifiedUserIcon fontSize={'large'} />
                <Typography variant={'body1'}>SRM Measures Reviewer (100%)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{}}>
              <CardContent className={classes.paper}>
                <GpsFixedIcon fontSize={'large'} />
                <Typography variant={'body1'}>GPS Collector (100%)</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

{/*        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{}}>
              <CardContent className={classes.paper}>
                <FeedbackIcon fontSize={'large'} />
                <Typography variant={'body1'}>12 Recommendations</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <CardActionArea onClick={()=>{}}>
              <CardContent className={classes.paper}>
                <VisibilityIcon fontSize={'large'} />
                <Typography variant={'body1'}>7 Observations</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>*/}


      </Grid>
    </Container>
  )
}