import React from 'react';
import {
  Chip,
  Divider, Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText, makeStyles,
  Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import FeedbackIcon from '@material-ui/icons/Feedback';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/Check';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { useHistory, useParams } from 'react-router-dom';
import { Receipt } from '@material-ui/icons';
import { green, pink } from '@material-ui/core/colors';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
}));

function QuestionItem({ question }) {

  const classes = useStyles();
  const history = useHistory();
  const {missionId, locationId} = useParams();
  const done = question.answer_value !== "";
  const hasRecommendation = question.order !== 3;
  const hasObservation = question.order !== 4;

  const goToQuestion = (questionId) => {
    history.push(`/missions/${missionId}/${locationId}/qa/${questionId}`)
  }

  return (
    <React.Fragment>
      <ListItem button style={{backgroundColor: done?'#d3e6d6':'#ffebf5'}} onClick={
        () => goToQuestion(question.ref_id)
      }>
        <ListItemAvatar>
          <Avatar className={done ? classes.green : classes.pink}>
            {done ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Grid container alignItems={'center'}>
              <Grid item xs={11}>

                <Typography variant={'body1'}>
                  {/*[{question.dependency_ref_id}] ({question.answer_type}) [{question.collection_type}] */}
                  {question.ref_id}. {question.question}
                </Typography>{' '}
                <Typography variant={'caption'}>{question.help_text}</Typography>

                <Chip variant={'outlined'} icon={<CheckIcon />} size="small" label={question.subtopic} style={{margin: 3}} />
                {question.ask_to.map(at => (<Chip variant={'outlined'} icon={<FaceIcon />} size="small" label={at} style={{margin: 3}} />))}

              </Grid>
              <Grid item xs={1} style={{textAlign: 'right'}}>

                {/*{hasRecommendation && <FeedbackIcon color="disabled" fontSize="small" />}
                {hasObservation && <VisibilityIcon color="disabled" fontSize="small" />}*/}


              </Grid>
            </Grid>

          }

        />

      </ListItem>
      <Divider variant="fullWidth" />
    </React.Fragment>
  );
}

function AreaOfFocusItems({ questions }) {
  return (
    <List dense={true}>
      {questions.map(q => <QuestionItem question={q} />)}
    </List>
  );
}

function AreaOfFocusHeader({name, subtopics, ask_to, title_variant}){
  const subtopics_display = subtopics.join(", ")
  const ask_to_display = ask_to.join(", ")
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageSearchIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant={title_variant}>{name}</Typography>}
          secondary={<React.Fragment>
            {subtopics.map(st => (<Chip icon={<CheckIcon />} size="small" label={st} style={{margin: 3}} />))}
            {ask_to.map(st => (<Chip icon={<FaceIcon />} size="small" label={st} style={{margin: 3}} />))}

          </React.Fragment>} />
      </ListItem>
    </List>
  )
}


export default function AreasOfFocus({ areasOfFocus, questions }) {

  return (
    <React.Fragment>
      {areasOfFocus.map(a => {

        const qs = questions.filter(q => a.name === q.area_of_focus);

        return (
          <React.Fragment>
            <AreaOfFocusHeader
              name={a.name}
              subtopics={a.subtopics}
              ask_to={a.ask_to}
              title_variant={'h5'}
            />
            <AreaOfFocusItems questions={qs} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
}

export {AreaOfFocusHeader}