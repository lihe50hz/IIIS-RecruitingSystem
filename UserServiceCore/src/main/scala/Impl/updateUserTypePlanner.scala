package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceApi.updateUserType
import Tables.UserServiceCoreTable
import Plugins.UserServiceShared.UserInfo
import monix.eval.Task

object updateUserTypePlanner extends APIPlanner[updateUserType]{
  override protected def plan(api: updateUserType)(implicit uuid: PlanUUID): Task[Int] = {
    UserServiceCoreTable.updateUserType(api.userName, api.userType).flatMap(one=>Task.now(one))
  }
}