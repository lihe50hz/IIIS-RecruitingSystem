package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{RunningExamInfo}

case class hasExam(
                       paperIndex:Int,
                     ) extends MSAkkaExamServiceMessageExtended[Boolean]
