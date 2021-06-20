import React from 'react';

export const AppContext = React.createContext({
  title: '',
  setTitle: () => {}
});

export const QuestionnaireContext = React.createContext({
  allQuestionsWithoutDependency: [],
  setAllQuestionsWithoutDependency: () => {}
});


