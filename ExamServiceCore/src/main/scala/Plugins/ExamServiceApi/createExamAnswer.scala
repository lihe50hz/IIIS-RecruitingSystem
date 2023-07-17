package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.ExamAnswer

case class createExamAnswer(
  answer:ExamAnswer,
) extends MSAkkaExamServiceMessageExtended[Int]
