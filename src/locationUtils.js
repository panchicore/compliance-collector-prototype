function percentageOfCompletion(location){
  let percent = (location.questions.filter(q => q.answer_value !== "").length / location.questions.length) * 100;
  return Math.floor(percent);
}

export {percentageOfCompletion}