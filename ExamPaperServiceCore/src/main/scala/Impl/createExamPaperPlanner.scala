package Impl

import Plugins.ExamPaperServiceShared.ExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamPaperServiceApi.createExamPaper
import Tables.ExamPaperTable
import monix.eval.Task

object createExamPaperPlanner extends APIPlanner[createExamPaper]{
  override protected def plan(api: createExamPaper)(implicit uuid: PlanUUID): Task[Int] = {
    val paper = ExamPaper(0, "New Exam Paper", 0, 0, "", Array())
    ExamPaperTable.addPaper(paper)
  }
}