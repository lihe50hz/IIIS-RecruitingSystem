package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.updateStatus
import Tables.StudentScoreTable
import monix.eval.Task

object updateStatusPlanner extends APIPlanner[updateStatus]{
  override protected def plan(api: updateStatus)(implicit uuid: PlanUUID): Task[Int] = {
    StudentScoreTable.updateStatus(api.score)
  }
}