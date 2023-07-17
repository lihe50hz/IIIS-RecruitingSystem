package Impl

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.ExamServiceApi.addExam
import Tables.RunningExamTable
import monix.eval.Task

object addExamPlanner extends APIPlanner[addExam]{
  override protected def plan(api: addExam)(implicit uuid: PlanUUID): Task[Int] = {
    val nowTime = System.currentTimeMillis()
    println(api.examPaper)
    println(api.startTime)
    println(api.examPaper.examDuration)
    RunningExamTable.addExam(api.examPaper, api.startTime, api.startTime + api.examPaper.examDuration * 60L * 1000L)
  }
}