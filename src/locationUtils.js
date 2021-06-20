function percentageOfCompletion(location){
  let percent = (location.questions.filter(q => q.answer_value !== "").length / location.questions.length) * 100;
  return Math.floor(percent);
}

function percentageOfCompletionES(executive_summaries){
  let total = 0;
  if (executive_summaries.es1.length > 160) total+=25
  if (executive_summaries.es2.length > 160) total+=25
  if (executive_summaries.es3.length > 160) total+=25
  if (executive_summaries.es4.length > 160) total+=25
  return Math.floor(total);
}

export {percentageOfCompletion, percentageOfCompletionES}