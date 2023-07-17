package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceShared.UserInfo
import Plugins.UserServiceApi.verify
import Tables.UserServiceCoreTable
import monix.eval.Task

object verifyPlanner extends APIPlanner[verify]{
  override protected def plan(api: verify)(implicit uuid: PlanUUID): Task[Int] = {
    UserServiceCoreTable.verifyUserType(api.userName).map{ userType =>
      if(userType == api.userType) 0 else 1
    }.onErrorHandle(_ => 2)
  }
}