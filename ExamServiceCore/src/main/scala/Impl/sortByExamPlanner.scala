package Impl

import Plugins.ExamServiceShared.StudentScore
import Plugins.ExamServiceShared.Chooser
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.sortByExam
import Tables.StudentScoreTable
import monix.eval.Task


object sortByExamPlanner extends APIPlanner[sortByExam]{
  override protected def plan(api: sortByExam)(implicit uuid: PlanUUID): Task[Array[StudentScore]] = {
    val arr = StudentScoreTable.getAllRows(api.examYear)
    arr.map(_.map(__ => Chooser.chooseByExam(__, api.paperIndex)))
  }
}