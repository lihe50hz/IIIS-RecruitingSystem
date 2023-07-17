package Impl

import Plugins.ExamServiceShared.ExamAnswer
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.getAnswer
import Tables.ExamAnswerTable
import monix.eval.Task

object getAnswerPlanner extends APIPlanner[getAnswer]{
  override protected def plan(api: getAnswer)(implicit uuid: PlanUUID): Task[ExamAnswer] = {
    ExamAnswerTable.getAnswer(api.index)
  }
}