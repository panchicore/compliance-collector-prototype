import React from 'react';
import { Button, Container, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExecutiveSummaryItem from './ExecutiveSummaryItem';
import { ArrowDownward } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';

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



  return (
    <Container>
      <Toolbar variant={'dense'} />

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

    </Container>
  )
}