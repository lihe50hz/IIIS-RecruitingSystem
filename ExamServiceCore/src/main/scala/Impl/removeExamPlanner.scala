package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.removeExam
import Tables.RunningExamTable
import monix.eval.Task

object removeExamPlanner extends APIPlanner[removeExam]{
  override protected def plan(api: removeExam)(implicit uuid: PlanUUID): Task[Int] = {
    RunningExamTable.removeExam(api.paperIndex)
  }
}