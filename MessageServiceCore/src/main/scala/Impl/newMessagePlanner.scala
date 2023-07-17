package Impl
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.CommonUtils.Utils.StringUtils
import Plugins.MessageServiceApi.newMessage
import Tables.{MessageRow, MessageTable}
import monix.eval.Task

object newMessagePlanner extends APIPlanner[newMessage]{
  override protected def plan(api: newMessage)(implicit uuid: PlanUUID): Task[Int] = {
    if (api.userType != "Admin") {
      Task.raiseError(new Exception("权限不足"))
    } else {
      MessageTable.addMessage(MessageRow(1, api.mesTitle, api.mesStatus.mkString("|"), " "+api.tarName+" ",api.mesType, api.mesContent, ""))
    }
  }
}