package Impl

import Plugins.SignUpServiceShared.SignUpInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.SignUpServiceApi.queryInfoByExam
import Tables.SignUpTable
import monix.eval.Task

object queryInfoByExamPlanner extends APIPlanner[queryInfoByExam]{
  override protected def plan(api: queryInfoByExam)(implicit uuid: PlanUUID): Task[Array[SignUpInfo]] = {
    SignUpTable.queryInfoByExam(api.examName)
  }
}