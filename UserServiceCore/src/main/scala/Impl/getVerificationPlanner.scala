package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Tables.VerificationTable
import monix.eval.Task
import Plugins.UserServiceApi.getVerification

object getVerificationPlanner extends APIPlanner[getVerification]{
  override protected def plan(api: getVerification)(implicit uuid: PlanUUID): Task[Int] = {
      VerificationTable.getVerification(api.email).flatMap(one=>Task.now(one))
  }
}
