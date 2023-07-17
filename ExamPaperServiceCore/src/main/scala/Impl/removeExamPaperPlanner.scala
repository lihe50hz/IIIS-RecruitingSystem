package Impl

import Plugins.ExamPaperServiceShared.ExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamPaperServiceApi.removeExamPaper
import Tables.ExamPaperTable
import monix.eval.Task

object removeExamPaperPlanner extends APIPlanner[removeExamPaper]{
  override protected def plan(api: removeExamPaper)(implicit uuid: PlanUUID): Task[Int] = {
    ExamPaperTable.deletePaper(api.index)
  }
}