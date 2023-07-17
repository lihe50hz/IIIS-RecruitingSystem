package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.StudentScore

case class sortByExam(
  examYear:String,
  paperIndex:Int,
) extends MSAkkaExamServiceMessageExtended[Array[StudentScore]]
