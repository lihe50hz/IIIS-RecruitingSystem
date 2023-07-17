package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.getAllExams
import Tables.RunningExamTable
import monix.eval.Task

object getAllExamsPlanner extends APIPlanner[getAllExams]{
  override protected def plan(api: getAllExams)(implicit uuid: PlanUUID): Task[Array[RunningExamInfo]] = {
    RunningExamTable.getAllRows(api.examYear)
  }
}