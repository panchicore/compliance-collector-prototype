import React from 'react';
import {
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField, Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { LOCATION_RECOMMENDATIONS } from './data';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 800,
    marginLeft: "auto",
    marginRight: "auto"
  },

  recommendationPaper: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(6)
  },
  paperStat: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: "center"
  },

  formControl: {
    marginBottom: theme.spacing(2)
  }
}));

function RecommendationReview({ r, onSubmit }) {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState(r.isImplemented.answer);
  const [justification, setJustification] = React.useState(
    r.isImplemented.justification
  );

  let isDone = answer !== null;
  if (answer === false && justification === "") {
    isDone = false;
  }

  return (
    <Paper
      className={classes.recommendationPaper}
      style={{ background: isDone ? "#d4ffd0" : "#fff" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={6}>
              <Typography variant="overline">{r.component}</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "right" }}>
              <Typography variant="overline" align="center">
                SEPTEMBER 25TH 2019 · CREATED 7 MONTHS AGO
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" display="block" gutterBottom>
            Has the Area Security Coordinator been appointed in writing and
            attended training (see also section on training)? yes, the asc left
            the country and the alternate is acting during the interim period.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            <Chip
              label={r.status.name}
              style={{
                color: "black",
                background: r.status.color_primary
              }}
              size="small"
              variant="outlined"
            />{" "}
            {r.body}
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} style={{ margin: 20 }}>
        <Typography variant="h6">Recommendation activity</Typography>
      </Grid>
      {r.activity.map(a => (
        <Grid item xs={12}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={4}>
              <Typography variant="overline" align="center">
                {a.date}
              </Typography>
            </Grid>
            <Grid item xs={8} style={{ textAlign: "right" }}>
              <Typography variant="overline">{a.action}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body">{a.message}</Typography>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Grid>
      ))}

      <Grid item xs={12} style={{ margin: 20, textAlign: "center" }}>
        <Typography variant="h5">
          Is it justified/implemented appropriately?
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color={answer === true ? "primary" : "default"}
              onClick={() => {
                setAnswer(true), onSubmit(r, true, "");
              }}
            >
              Yes, mark as appropiate
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              color={answer === false ? "primary" : "default"}
              onClick={() => setAnswer(false)}
            >
              No, leave a feedback
            </Button>
          </Grid>
          {answer === false && (
            <React.Fragment>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="standard-helperText"
                  label="Not justified/implemented appropriately? Please tell to the assignee"
                  helperText="This message will be added to the follow-ups and notified to the RSO and CO at the end of your current mission"
                  value={justification}
                  onChange={event => {
                    setJustification(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  onClick={() => onSubmit(r, answer, justification)}
                  startIcon={
                    justification === "" ? <SaveIcon /> : <CheckIcon />
                  }
                  variant="contained"
                >
                  Save
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function LocationPastRecommendationsReviewerScreen(){
  const {missionId, locationId} = useParams();
  const { dummyState, setTitle, setMenuIcon, setAppBarIcons } = React.useContext(AppContext);
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));
  const history = useHistory();
  const [done, setDone] = React.useState(false);

  const [recommendations, setRecommendations] = React.useState(
    LOCATION_RECOMMENDATIONS
  );

  const onSubmit = (edited, answer, justification) => {
    setRecommendations(
      recommendations.map(r => {
        if (r.id === edited.id) {
          return { ...r, isImplemented: { answer, justification } };
        }
        return r;
      })
    );
  };

  React.useEffect(() => {
    setTitle(`${mission.name} · ${location.name}'s Past Recommendations`);

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

  return (

    <Container>
      <Toolbar variant={'dense'} />
      <Grid container justify={'center'} alignItems={'center'} spacing={1}>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            align="left"
          >
            Review one by one
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify={'flex-end'} spacing={1}>
            <Grid item>
              <Chip
                color={done ? 'primary' : 'secondary'}
                avatar={<Avatar>{done ? '20' : '16'}</Avatar>}
                label="of 20 items"
                onClick={() => setDone(true)}
              />
            </Grid>
            <Grid item>
              <Chip
                color="primary"
                avatar={<Avatar>4</Avatar>}
                label="Feedbacks"
              />
            </Grid>
            <Grid item>
              <Chip
                color="default"
                avatar={<Avatar>12</Avatar>}
                label="Appropiates"
              />
            </Grid>


          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Scroll down and review the recommendations one by one, when the
            recommendation is completed (green), please verify X, when the
            recommendation is in process (yellow) verify Y, and when the
            recommendaition needs action (red) verify Z.
          </Typography>
        </Grid>

      </Grid>




      <Grid container spacing={1} style={{ marginTop: 30 }} alignItems={'center'}>
        <Grid item>
          <Typography variant={'caption'}>Filter by</Typography>
        </Grid>
        <Grid item>
          <Chip label="Without review" onDelete={() => {}} />
        </Grid>
        <Grid item>
          <Chip variant="outlined" label="Status completed" />
        </Grid>
        <Grid item>
          <Chip variant="outlined" label="Status in progress" />
        </Grid>
        <Grid item>
          <Chip variant="outlined" label="Status action needed" />
        </Grid>
      </Grid>

      {recommendations.map(r => (
        <React.Fragment>
          <RecommendationReview key={r.id} r={r} onSubmit={onSubmit} />
          <Divider style={{ margin: 20 }} />
        </React.Fragment>
      ))}

    </Container>
  )
}