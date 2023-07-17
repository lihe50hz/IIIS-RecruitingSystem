package Impl

import Plugins.ExamPaperServiceShared.ExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamPaperServiceApi.rewriteExamPaper
import Tables.ExamPaperTable
import monix.eval.Task

object rewriteExamPaperPlanner extends APIPlanner[rewriteExamPaper]{
  override protected def plan(api: rewriteExamPaper)(implicit uuid: PlanUUID): Task[Int] = {
    ExamPaperTable.rewritePaper(api.paper)
  }
}