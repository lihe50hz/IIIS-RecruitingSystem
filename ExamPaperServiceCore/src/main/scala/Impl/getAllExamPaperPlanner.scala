package Impl

import Plugins.ExamPaperServiceShared.SimpleExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamPaperServiceApi.getAllExamPaper
import Tables.ExamPaperTable
import monix.eval.Task

object getAllExamPaperPlanner extends APIPlanner[getAllExamPaper]{
  override protected def plan(api: getAllExamPaper)(implicit uuid: PlanUUID): Task[Array[SimpleExamPaper]] = {
    ExamPaperTable.getAllRows()
  }
}