package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{ExamAnswer}

case class getAnswer(
                           index:Int,
                         ) extends MSAkkaExamServiceMessageExtended[ExamAnswer]
