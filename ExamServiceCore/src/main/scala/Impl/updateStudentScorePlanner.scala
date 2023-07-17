package Impl

import Plugins.ExamServiceShared.ExamAnswer
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.updateStudentScore
import Tables.StudentScoreTable
import monix.eval.Task

object updateStudentScorePlanner extends APIPlanner[updateStudentScore]{
  override protected def plan(api: updateStudentScore)(implicit uuid: PlanUUID): Task[Int] = {
    StudentScoreTable.addExamAnswer(api.answer)
  }
}