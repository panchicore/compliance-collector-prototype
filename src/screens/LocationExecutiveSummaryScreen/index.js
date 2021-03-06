import React from 'react';
import { Button, Chip, Container, Grid, IconButton, makeStyles, Paper, Toolbar, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExecutiveSummaryItem from './ExecutiveSummaryItem';
import { ArrowDownward } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';

export default function LocationExecutiveSummaryScreen(){
  const {missionId, locationId} = useParams();

  const { dummyState, setTitle, setMenuIcon, setAppBarIcons } = React.useContext(AppContext);
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));
  const {executive_summaries} = location
  const history = useHistory();

  React.useState(() => {
    setTitle(`${mission.name} · ${location.name}'s Executive's Summary`);
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

      <Grid container justify={'center'} alignItems={'center'} spacing={0}>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            align="left"
          >
            Write the executive summary
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container justify={'flex-end'} spacing={1}>
            <Grid item>
              <Chip
                color={done ? 'primary' : 'secondary'}
                avatar={<Avatar>{done ? '4' : '4'}</Avatar>}
                label="of 4 items"
                onClick={() => setDone(true)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            Please describe each one of the items in no more than 200 characters.
          </Typography>
        </Grid>

      </Grid>

      <Paper style={{padding: 40, marginTop: 20}}>
        <ExecutiveSummaryItem
          summary_type={''}
          label={'General security situation'}
          helper={'Capturing key security risks'}
          summary_value={executive_summaries.es1}
        />

        <ExecutiveSummaryItem
          summary_type={''}
          label={'UNDSS compliance'}
          helper={'Review of SRM/UNDSS country documentation'}
          summary_value={executive_summaries.es2}
        />

        <ExecutiveSummaryItem
          summary_type={''}
          label={'About the state of SAM recommendations'}
          helper={'Implementation findings from previous missions'}
          summary_value={executive_summaries.es3}
        />

        <ExecutiveSummaryItem
          summary_type={''}
          label={'Other'}
          helper={'Say it now or shut up forever'}
          summary_value={executive_summaries.es4}
        />
      </Paper>

    </Container>
  )
}