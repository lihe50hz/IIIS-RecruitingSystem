package Impl

import Plugins.ExamServiceShared.StudentScore
import Plugins.ExamServiceShared.Chooser
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.sortByTotalScore
import Tables.StudentScoreTable
import monix.eval.Task


object sortByTotalScorePlanner extends APIPlanner[sortByTotalScore]{
  override protected def plan(api: sortByTotalScore)(implicit uuid: PlanUUID): Task[Array[StudentScore]] = {
    val arr = StudentScoreTable.getAllRows(api.examYear)
    arr.map(_.map(__ => Chooser.chooseByTotalScore(__)))
  }
}