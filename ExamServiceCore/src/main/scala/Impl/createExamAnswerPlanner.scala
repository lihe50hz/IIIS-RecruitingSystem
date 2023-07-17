package Impl

import Plugins.ExamServiceShared.ExamAnswer
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.createExamAnswer
import Tables.ExamAnswerTable
import monix.eval.Task

object createExamAnswerPlanner extends APIPlanner[createExamAnswer]{
  override protected def plan(api: createExamAnswer)(implicit uuid: PlanUUID): Task[Int] = {
    ExamAnswerTable.addAnswer(api.answer)
  }
}