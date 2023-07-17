package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.StudentScore

case class sortByProblem(
                          examYear: String,
                          paperIndex:Int,
                          problemIndex:Int,
) extends MSAkkaExamServiceMessageExtended[Array[StudentScore]]
