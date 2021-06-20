import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../context';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, Tab, Tabs } from '@material-ui/core';

export default function MissionsScreen(){
  let history = useHistory();
  const {dummyState, setAppBarIcons} = React.useContext(AppContext);
  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  React.useEffect(()=>{
    setAppBarIcons(
      <IconButton aria-label="search" color="inherit">
        <SearchIcon />
      </IconButton>
    )
  }, [])

  const goToLocationScreen = (missionId) => {
    history.push(`/missions/${missionId}`);
  }

  const missions = dummyState.missions;
  const active_missions = [dummyState.active_mission];


  return (
    <React.Fragment>

      <Tabs value={activeTab} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Explore all Missions" />
        <Tab label="Your Current Missions" />
      </Tabs>

      {activeTab == 0 &&
        <List >
          {missions.map(m => {
            return (
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={m.name} secondary={`Conducted on ${m.locations.length} WFP locations
        in ${m.country.name} (${m.country.wfp_region}): ${m.location_names} by ${m.consultant} for the period
        from ${m.period_from} to ${m.period_to}`} />
              </ListItem>
            )
          })}
        </List>
      }

      {activeTab == 1 &&
        <List >
          {active_missions.map(m => {
            return (
              <ListItem button onClick={() => goToLocationScreen(m.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={m.name} secondary={`To be conducted on ${m.locations.length} WFP locations
        in ${m.country.name} (${m.country.wfp_region}): ${m.location_names} by ${m.consultant} for the period
        from ${m.period_from} to ${m.period_to}`} />
              </ListItem>
            )
          })}
        </List>
      }





    </React.Fragment>

  )
}