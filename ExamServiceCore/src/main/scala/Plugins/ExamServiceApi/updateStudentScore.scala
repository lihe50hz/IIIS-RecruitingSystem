package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.ExamAnswer

case class updateStudentScore(
  answer:ExamAnswer,
) extends MSAkkaExamServiceMessageExtended[Int]
