package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Tables.VerificationTable
import monix.eval.Task
import Plugins.UserServiceApi.resetPassword

object resetPasswordPlanner extends APIPlanner[resetPassword] {
  override protected def plan(api: resetPassword)(implicit uuid: PlanUUID): Task[Int] = {
      VerificationTable.checkVerification(api.email,api.verify).flatMap({ info=>
        if(info==0)VerificationTable.resetPassword(api.email,api.newPassword).flatMap(one=>Task.now(one))
        else Task.now(1)
      })
  }
}
