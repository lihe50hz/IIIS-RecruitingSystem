package Impl

import Plugins.SignUpServiceShared.SignUpInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.SignUpServiceApi.writeInfo
import Tables.SignUpTable
import monix.eval.Task

object writeInfoPlanner extends APIPlanner[writeInfo]{
  override protected def plan(api: writeInfo)(implicit uuid: PlanUUID): Task[Int] = {
    SignUpTable.writeInfo(api.signUpInfo)
  }
}