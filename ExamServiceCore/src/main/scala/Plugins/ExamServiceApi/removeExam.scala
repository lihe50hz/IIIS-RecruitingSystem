package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{RunningExamInfo}

case class removeExam(
                           paperIndex:Int,
                         ) extends MSAkkaExamServiceMessageExtended[Int]
