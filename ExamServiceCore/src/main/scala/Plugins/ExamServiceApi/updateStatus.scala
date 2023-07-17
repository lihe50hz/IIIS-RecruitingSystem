package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.StudentScore

case class updateStatus(
                             score: StudentScore,
                           ) extends MSAkkaExamServiceMessageExtended[Int]
