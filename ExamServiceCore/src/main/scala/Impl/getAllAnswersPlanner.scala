package Impl

import Plugins.ExamServiceShared.SimpleExamAnswer
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.getAllAnswers
import Tables.ExamAnswerTable
import monix.eval.Task

object getAllAnswersPlanner extends APIPlanner[getAllAnswers]{
  override protected def plan(api: getAllAnswers)(implicit uuid: PlanUUID): Task[Array[SimpleExamAnswer]] = {
    ExamAnswerTable.getAllRows()
  }
}