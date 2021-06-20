import React from 'react';
import { Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from '../../context';
import { AreaOfFocusHeader } from '../QuestionnaireRecsScreen/AreasOfFocus';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ANSWER_TYPE_YES_NO = "Yes / No"
const ANSWER_TYPE_YES_NO_NA = "Yes / No / NA"
const ANSWER_TYPE_TEXT = "[Text Field]"

function QuestionItem({question}){
  const [answer, setAnswer] = React.useState(question.answer_value);

  React.useEffect(() => {
    if(question){
      setAnswer(question.answer_value);
    }
  }, [question])

  React.useEffect(() => {

  }, [answer])

  return  (
    <React.Fragment>


      <Typography variant={'h5'} gutterBottom>{question.question}</Typography>
      <Typography variant={'subtitle2'} gutterBottom>{question.help_text}</Typography>

      {question.answer_type === ANSWER_TYPE_YES_NO &&
        <Grid container spacing={1} style={{marginTop: 15, marginBottom: 15}}>
          <Grid item xs={6}>
            <Button variant={'contained'} fullWidth
                    color={answer === 'yes' ? 'primary': 'default'}
                    onClick={() => setAnswer('yes')}>Yes</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant={'contained'} fullWidth
                    color={answer === 'no' ? 'primary': 'default'}
                    onClick={() => setAnswer('no')}>No</Button>
          </Grid>
        </Grid>
      }

      {question.answer_type === ANSWER_TYPE_TEXT &&
        <TextField fullWidth multiline rows={2}
                   variant={'outlined'}
                   defaultValue={answer}
                   onChange={(e) => setAnswer(e.target.value)}/>
      }

    </React.Fragment>
  )
}

export default function QuestionsScreen(){

  const history = useHistory();
  const { setTitle, dummyState, setMenuIcon } = React.useContext(AppContext);

  const {locationId, missionId, questionId} = useParams();
  const mission = dummyState.active_mission;
  const location = mission.locations.find(loc => loc.id === parseInt(locationId));

  const getQuestion = (questionId) => {
    const question = location.questions.find(q => q.ref_id === questionId);
    return question
  }

  const getSubQuestions = (questionId) => {
    return location.questions.filter(q => q.dependency_ref_id === questionId);
  }

  const [question, setQuestion] = React.useState(getQuestion(questionId));
  const [subQuestions, setSubQuestions] = React.useState([]);

  const getMainQuestionids = () => {
    return location.questions
      .filter(q => q.hidden === false)
      .filter(q => q.dependency_ref_id === "")
      .map(q => q.ref_id);
  }

  const getNextId = () => {
    const ids = getMainQuestionids();
    const currentQuestionIndex = ids.indexOf(questionId);
    return ids[currentQuestionIndex + 1];
  }

  const getPrevId = () => {
    const ids = getMainQuestionids();
    const currentQuestionIndex = ids.indexOf(questionId);
    return ids[currentQuestionIndex - 1];
  }

  const goToNext = () => {
    history.push(`/missions/${missionId}/${locationId}/qa/${getNextId()}`);
  }

  const goToPrev = () => {
    history.push(`/missions/${missionId}/${locationId}/qa/${getPrevId()}`);
  }


  React.useEffect(()=>{
    setQuestion(getQuestion(questionId));
  }, [questionId])

  React.useEffect(()=>{
    if(question){
      setSubQuestions(getSubQuestions(questionId))
      setTitle(`Question #${question.ref_id}  · ${location.name}`);
    }
  }, [question])

  React.useEffect(()=>{
    setMenuIcon(
      <IconButton
        edge='start'
        onClick={() => history.push( `/missions/${missionId}/${locationId}/qa`)}
        color='inherit'>
        <ArrowBackIcon />
      </IconButton>
    )
  }, [])


  return (
    <React.Fragment>

      <AreaOfFocusHeader
        name={question.area_of_focus}
        subtopics={[question.subtopic]}
        ask_to={question.ask_to}
        title_variant={'h6'}
      />

      <Container>
        <Paper style={{padding: 10, marginBottom: 20}}>
          <QuestionItem question={question} />
          {subQuestions.map(q => (<QuestionItem question={q} />))}
        </Paper>
      </Container>


      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Button
            variant={'outlined'}
            fullWidth
            disabled={getPrevId() === undefined}
            onClick={goToPrev}>Previous</Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant={'outlined'}
            fullWidth>Save and Next</Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant={'outlined'}
            fullWidth
            disabled={getNextId() === undefined}
            onClick={goToNext}>Next</Button>
        </Grid>
      </Grid>

    </React.Fragment>
  )
}
