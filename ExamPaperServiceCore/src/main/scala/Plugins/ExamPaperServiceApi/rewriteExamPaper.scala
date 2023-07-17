package Plugins.ExamPaperServiceApi

import Plugins.ExamPaperServiceApi.MSAkkaExamPaperServiceMessageExtended
import Plugins.ExamPaperServiceShared.ExamPaper

case class rewriteExamPaper(
  index:Int,
  paper:ExamPaper,
) extends MSAkkaExamPaperServiceMessageExtended[Int]
