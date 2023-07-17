package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.StudentScore

case class sortByTotalScore(
                             examYear: String,
                           ) extends MSAkkaExamServiceMessageExtended[Array[StudentScore]]
