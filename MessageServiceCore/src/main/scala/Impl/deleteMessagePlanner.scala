package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.CommonUtils.Utils.StringUtils
import Plugins.MessageServiceApi.deleteMessage
import Tables.MessageTable
import monix.eval.Task

object deleteMessagePlanner extends APIPlanner[deleteMessage]{
  override protected def plan(api: deleteMessage)(implicit uuid: PlanUUID): Task[Int] = {
    if (api.userType != "Admin") {
      Task.raiseError(new Exception("权限不足"))
    } else {
      MessageTable.deleteMessage(api.mesRank)
    }
  }
}