package Plugins.ExamPaperServiceApi

import Plugins.ExamPaperServiceApi.MSAkkaExamPaperServiceMessageExtended
import Plugins.ExamPaperServiceShared.ExamPaper


case class getExamPaper(
                            index:Int,
                          ) extends MSAkkaExamPaperServiceMessageExtended[ExamPaper]
