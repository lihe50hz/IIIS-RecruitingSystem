package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.getCurrentInfo
import Tables.RunningExamTable
import monix.eval.Task

object getCurrentInfoPlanner extends APIPlanner[getCurrentInfo]{
  override protected def plan(api: getCurrentInfo)(implicit uuid: PlanUUID): Task[RunningExamInfo] = {
    RunningExamTable.getExamInfo(api.paperIndex)
  }
}