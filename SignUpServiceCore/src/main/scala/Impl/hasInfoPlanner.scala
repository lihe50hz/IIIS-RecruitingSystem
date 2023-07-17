package Impl

import Plugins.SignUpServiceShared.SignUpInfo
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.SignUpServiceApi.hasInfo
import Tables.SignUpTable
import monix.eval.Task

object hasInfoPlanner extends APIPlanner[hasInfo]{
  override protected def plan(api: hasInfo)(implicit uuid: PlanUUID): Task[Boolean] = {
    SignUpTable.hasInfo(api.userName)
  }
}