package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended

case class removeExamAnswer(
                      index:Int,
                    ) extends MSAkkaExamServiceMessageExtended[Int]
