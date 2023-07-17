package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Tables.{UserServiceCoreTable, VerificationTable}
import monix.eval.Task
import Plugins.UserServiceApi.register
import Plugins.UserServiceShared.UserInfo

object registerPlanner extends APIPlanner[register] {
  override protected def plan(api: register)(implicit uuid: PlanUUID): Task[Int] = {
    VerificationTable.checkVerification(api.email,api.verify).flatMap({
      info => {
        if(info==0)UserServiceCoreTable.addUser(new UserInfo(api.userName,api.password,api.email,"Student")).flatMap(one=>Task.now(one))
        else Task.now(-1)
      }
    })

  }
}