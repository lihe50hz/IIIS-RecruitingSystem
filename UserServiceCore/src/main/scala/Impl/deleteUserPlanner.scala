package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceApi.deleteUser
import Tables.UserServiceCoreTable
import monix.eval.Task

object deleteUserPlanner extends APIPlanner[deleteUser]{
  override protected def plan(api: deleteUser)(implicit uuid: PlanUUID): Task[Int] = {
    UserServiceCoreTable.deleteUser(api.userName).flatMap(one=>Task.now(one))
  }
}