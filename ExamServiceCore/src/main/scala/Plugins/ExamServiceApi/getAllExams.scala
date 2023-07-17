package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{RunningExamInfo}

case class getAllExams(
                      examYear:String,
                         ) extends MSAkkaExamServiceMessageExtended[Array[RunningExamInfo]]
