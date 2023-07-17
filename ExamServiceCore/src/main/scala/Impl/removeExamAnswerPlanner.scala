package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.removeExamAnswer
import Tables.ExamAnswerTable
import monix.eval.Task

object removeExamAnswerPlanner extends APIPlanner[removeExamAnswer]{
  override protected def plan(api: removeExamAnswer)(implicit uuid: PlanUUID): Task[Int] = {
    ExamAnswerTable.removeAnswer(api.index)
  }
}