package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceApi.queryAllInfo
import Tables.UserServiceCoreTable
import Plugins.UserServiceShared.UserInfo
import monix.eval.Task

object queryAllInfoPlanner extends APIPlanner[queryAllInfo]{
  override protected def plan(api: queryAllInfo)(implicit uuid: PlanUUID): Task[Array[UserInfo]] = {
    UserServiceCoreTable.getAllInfo().flatMap(one=>Task.now(one))
  }
}