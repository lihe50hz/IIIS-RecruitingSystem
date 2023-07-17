package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.CommonUtils.Utils.StringUtils
import Plugins.MessageServiceApi.sendMessage
import Tables.MessageTable
import monix.eval.Task

object sendMessagePlanner extends APIPlanner[sendMessage]{
  override protected def plan(api: sendMessage)(implicit uuid: PlanUUID): Task[Int] = {
    if (api.userType != "Admin") {
      Task.raiseError(new Exception("权限不足"))
    } else {
      MessageTable.sendMessage(api.mesRank)
    }
  }
}