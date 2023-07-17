package Impl

import Plugins.ExamServiceShared.StudentScore
import Plugins.ExamServiceShared.Chooser
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.sortByProblem
import Tables.StudentScoreTable
import monix.eval.Task


object sortByProblemPlanner extends APIPlanner[sortByProblem]{
  override protected def plan(api: sortByProblem)(implicit uuid: PlanUUID): Task[Array[StudentScore]] = {
    val arr = StudentScoreTable.getAllRows(api.examYear)
    arr.map(_.map(__ => Chooser.chooseByProblem(__, api.paperIndex, api.problemIndex)))
  }
}