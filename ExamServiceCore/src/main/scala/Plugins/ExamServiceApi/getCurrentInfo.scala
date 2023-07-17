package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{RunningExamInfo}

case class getCurrentInfo(
  paperIndex:Int,
) extends MSAkkaExamServiceMessageExtended[RunningExamInfo]
