package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.UserServiceApi.login
import Tables.UserServiceCoreTable
import monix.eval.Task

object loginPlanner extends APIPlanner[login]{
  override protected def plan(api: login)(implicit uuid: PlanUUID): Task[Int] = {
    UserServiceCoreTable.getUserInfo(api.userName,api.userPassword).map{ userInfo =>
      if(userInfo.userType=="Student") 0
      else if(userInfo.userType=="Teacher") -1
      else -2
    }.onErrorHandle(_ => 1)
  }
}