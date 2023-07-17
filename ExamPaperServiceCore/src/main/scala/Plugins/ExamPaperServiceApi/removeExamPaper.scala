package Plugins.ExamPaperServiceApi

import Plugins.ExamPaperServiceApi.MSAkkaExamPaperServiceMessageExtended


case class removeExamPaper(
  index:Int,
) extends MSAkkaExamPaperServiceMessageExtended[Int]
