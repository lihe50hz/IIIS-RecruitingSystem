package Plugins.ExamServiceApi

import Plugins.ExamServiceApi.MSAkkaExamServiceMessageExtended
import Plugins.ExamServiceShared.{SimpleExamAnswer}

case class getAllAnswers() extends MSAkkaExamServiceMessageExtended[Array[SimpleExamAnswer]]
