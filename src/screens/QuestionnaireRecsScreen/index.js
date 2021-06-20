import React from 'react';
import { Button, IconButton, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import questionnaire from '../../questionnaire_db.json'
import AreasOfFocus from './AreasOfFocus';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function QuestionnaireRecsScreen(){
  const history = useHistory();
  const {missionId, locationId} = useParams();
  const { dummyState, setTitle, setMenuIcon } = React.useContext(AppContext);
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));

  const areasOfFocus = questionnaire.areas_of_focus;
  const allQuestions = location.questions.filter(q => q.hidden === false);
  const allQuestionsWithoutDependency = allQuestions.filter(q => q.dependency_ref_id === "");

  React.useState(() => {
    setTitle(`Recommendations Collector for ${location.name}`);

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
    <React.Fragment>
      <AreasOfFocus areasOfFocus={areasOfFocus} questions={allQuestionsWithoutDependency} />
    </React.Fragment>
  )
}