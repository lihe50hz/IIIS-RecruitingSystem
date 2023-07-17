package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceApi.queryUserInfo
import Tables.UserServiceCoreTable
import Plugins.UserServiceShared.UserInfo
import monix.eval.Task

object queryUserInfoPlanner extends APIPlanner[queryUserInfo]{
  override protected def plan(api: queryUserInfo)(implicit uuid: PlanUUID): Task[UserInfo] = {
    UserServiceCoreTable.getUserInfoNoPassword(api.userName).flatMap(one=>Task.now(one))
  }
}