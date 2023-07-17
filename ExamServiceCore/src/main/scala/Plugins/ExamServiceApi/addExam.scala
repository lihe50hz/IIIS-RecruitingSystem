package Plugins.ExamServiceApi

import Plugins.ExamPaperServiceShared.SimpleExamPaper
import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended


case class addExam(
                      examPaper:SimpleExamPaper,
                      startTime:Long,
) extends MSAkkaExamServiceMessageExtended[Int]
