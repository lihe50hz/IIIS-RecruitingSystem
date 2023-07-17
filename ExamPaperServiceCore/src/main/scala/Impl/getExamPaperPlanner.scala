package Impl

import Plugins.ExamPaperServiceShared.ExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamPaperServiceApi.getExamPaper
import Tables.ExamPaperTable
import monix.eval.Task

object getExamPaperPlanner extends APIPlanner[getExamPaper]{
  override protected def plan(api: getExamPaper)(implicit uuid: PlanUUID): Task[ExamPaper] = {
    ExamPaperTable.getPaper(api.index)
  }
}