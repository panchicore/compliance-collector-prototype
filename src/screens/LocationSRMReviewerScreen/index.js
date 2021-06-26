import React from 'react';
import {
  Card,
  CardActionArea, CardContent,
  CardMedia,
  Chip,
  Container, Divider, FormControlLabel,
  Grid,
  IconButton, makeStyles, MenuItem, Paper, Radio, Select, TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
import { MEASURES } from './data';
import _ from "lodash";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  layout: {
    width: 800,
    marginLeft: "auto",
    marginRight: "auto"
  },
  media: {
    height: 440
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


function MeasureItem({ m, i, applies }) {
  const classes = useStyles();
  let remarks = m.remarks.split("\n").map((item, i) => {
    return <p key={i}>{item}</p>;
  });
  const n = i + 1;
  const [selectedVulnerability, setSelectedVulnerability] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const showCommentBox = selectedVulnerability > 1;

  let isDone = false;
  if (selectedVulnerability > 0){
    if (selectedVulnerability === 1){
      isDone = true
    }else{
      if(comment.length > 10){
        isDone = true;
      }
    }
  }

  return (
    <Paper className={classes.recommendationPaper} style={{ background: isDone ? "#d4ffd0" : "#fff" }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="overline">{m.category_name}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="overline" align="center">
            {m.status_name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant="h5" display="block" gutterBottom>
            {n}. {applies === "wfp" && <Chip label="Applies to WFP" />}{" "}
            {m.description}
          </Typography>
          <Typography variant="body2" display="block" gutterBottom>
            {remarks}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="caption">
            Implementation starts {moment(m.implementation_starts).format("LL")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            Implementation ends {moment(m.implementation_ends).format("LL")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            Active from {moment(m.active_from_date).format("LL")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="caption">
            Last update {moment(m.last_update_date).format("LL")}
          </Typography>
        </Grid>
      </Grid>

      <Divider style={{ marginTop: 30, marginBottom: 30 }} />

      <Paper elevation={0} style={{ backgroundColor: "#f1f2f3", padding: 10 }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            <Typography>Mitigation risk management countermeasures and procedures has been</Typography>
          </Grid>
          <Grid item xs={12}>

            <Select
              label={'Select one'}
              fullWidth
              value={selectedVulnerability}
              onChange={(e) => setSelectedVulnerability(e.target.value)}>
              <MenuItem value={1}>completely in place and consistently effective</MenuItem>
              <MenuItem value={2}>in place (but may not be consistently effective or may have limitations)</MenuItem>
              <MenuItem value={3}>not completely in place OR not consistently effective</MenuItem>
              <MenuItem value={4}>not completely in place AND not consistently effective</MenuItem>
              <MenuItem value={5}>disregarded</MenuItem>
            </Select>

          </Grid>
          {showCommentBox &&
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline

              variant="standard"
              rows={3}
              label="A brief description on why the countermeasures and procedures are in this state"
              defaultValue={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          }

        </Grid>
      </Paper>
    </Paper>
  );
}



export default function LocationSRMReviewerScreen(){
  const classes = useStyles();
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

  const measures = MEASURES.filter(m => m.security_level_area_name === "Sahel Region");
  const categories = measures
    .map(m => m.category_name)
    .reduce((prev, current) => {
      let found = prev.find(c => c.name === current);
      if (!found) {
        prev = [...prev, { name: current, count: 1 }];
      } else {
        prev = prev.map(p => {
          if (p.name === current) {
            return { ...p, count: p.count + 1 };
          }
          return p;
        });
      }
      return prev;
    }, []);

  return (

    <Container>

      <Toolbar variant={'dense'} />

      <Grid container justify={'center'} alignItems={'center'} spacing={1}>
        <Grid item xs={8}>
          <Typography
            variant="h5"
            align="left"
          >
            This office is located within the SRM Sahel Region
          </Typography>
        </Grid>
        <Grid item xs={4}>
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
            days ago, only contains measures that apply for WFP and the area within this office location.
            Please review each risk mitigation measure to assest level of implementation.
          </Typography>
        </Grid>

      </Grid>


      <Card className={classes.root} style={{marginTop: 20}}>

          <CardMedia
            className={classes.media}
            image="https://uploads.codesandbox.io/uploads/user/2a3ae63c-7b7e-489d-963e-2715285eb274/EbF_-Captura+de+Pantalla+2021-06-26+a+la(s)+9.22.11+a.%C2%A0m..png"
            title="SRM Sahel Region"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              <Chip avatar={<Avatar>5</Avatar>} label="General Security Level" />{" "}
              <Chip avatar={<Avatar>4</Avatar>} label="Highest Risk" />{" "}
              Sahel Region
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              <Chip avatar={<Avatar>SA</Avatar>} label="Security Area" />{" "}
              Burkina Faso
            </Typography>

            <Typography gutterBottom variant="h6" component="h2">
              <Chip avatar={<Avatar>DA</Avatar>} label="Designated Area" />{" "}
              Burkina Faso
            </Typography>

            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Grid item>
                <Chip
                  variant="outlined"
                  avatar={<Avatar>5</Avatar>}
                  label="Armed Conflict"
                />
              </Grid>

              <Grid item>
                <Chip
                  variant="outlined"
                  avatar={<Avatar>5</Avatar>}
                  label="Terrorism"
                />
              </Grid>

              <Grid item>
                <Chip
                  variant="outlined"
                  avatar={<Avatar>4</Avatar>}
                  label="Crime"
                />
              </Grid>

              <Grid item>
                <Chip
                  variant="outlined"
                  avatar={<Avatar>2</Avatar>}
                  label="Civil Unrest"
                />
              </Grid>

              <Grid item>
                <Chip
                  variant="outlined"
                  avatar={<Avatar>3</Avatar>}
                  label="Hazards"
                />
              </Grid>
            </Grid>


          </CardContent>

      </Card>

      <Typography
        gutterBottom
        variant="h6"
        component="h2"
        style={{ marginTop: 20 }}
      >
        List of the {measures.length} applying to WFP
      </Typography>
      <Typography>
        Scroll down, read each measure details and determine the level of
        implementation, at the end of this screen use the save button, the
        statistics as the result of this exersice will appear on the SRMM
        section in the Mission screen and delivered to the team when the
        mission be submited.
      </Typography>


      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        spacing={1}
        style={{ marginTop: 20 }}
      >
        {categories.map(c => (
          <Grid item>
            <Chip avatar={<Avatar>{c.count}</Avatar>} label={c.name} />
          </Grid>
        ))}
        <Grid item>
          <Chip label="Show without review only" />
        </Grid>
      </Grid>




      {measures.map((m, i) => {
        return <MeasureItem m={m} i={i} applies={true} />
      })}


    </Container>
  )
}