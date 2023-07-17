package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.CommonUtils.Utils.StringUtils
import Plugins.MessageServiceApi.recallMessage
import Tables.MessageTable
import monix.eval.Task

object recallMessagePlanner extends APIPlanner[recallMessage]{
  override protected def plan(api: recallMessage)(implicit uuid: PlanUUID): Task[Int] = {
    if (api.userType != "Admin") {
      Task.raiseError(new Exception("权限不足"))
    } else {
      MessageTable.recallMessage(api.mesRank)
    }
  }
}