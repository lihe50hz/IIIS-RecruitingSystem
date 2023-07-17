package Plugins.ExamServiceShared

object Chooser{

  def chooseByTotalScore(score: StudentScore): StudentScore = {
    StudentScore(score.userName, score.totalScore, score.examYear, score.examAnswers,
      score.totalScore, score.examPassed, score.interviewPassed)
  }
  def chooseByExam(score: StudentScore, paperIndex: Int): StudentScore = {
    val opt = score.examAnswers.find(_.paperIndex == paperIndex).headOption
    if(opt == None) {
      StudentScore(score.userName, score.totalScore, score.examYear, score.examAnswers, 0,
        score.examPassed, score.interviewPassed)
    } else {
      StudentScore(score.userName, score.totalScore, score.examYear, score.examAnswers, opt.get.score,
        score.examPassed, score.interviewPassed)
    }
  }

  def chooseByProblem(score: StudentScore, paperIndex: Int, problemIndex: Int): StudentScore = {
    val opt = score.examAnswers.find(_.paperIndex == paperIndex).headOption
    if (opt == None) {
      StudentScore(score.userName, score.totalScore, score.examYear, score.examAnswers, 0,
        score.examPassed, score.interviewPassed)
    } else {
      StudentScore(score.userName, score.totalScore, score.examYear, score.examAnswers, opt.get.answers(problemIndex).score,
        score.examPassed, score.interviewPassed)
    }
  }
}
