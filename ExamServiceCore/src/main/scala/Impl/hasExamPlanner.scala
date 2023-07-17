package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.hasExam
import Tables.RunningExamTable
import monix.eval.Task

object hasExamPlanner extends APIPlanner[hasExam]{
  override protected def plan(api: hasExam)(implicit uuid: PlanUUID): Task[Boolean] = {
    RunningExamTable.hasExam(api.paperIndex)
  }
}