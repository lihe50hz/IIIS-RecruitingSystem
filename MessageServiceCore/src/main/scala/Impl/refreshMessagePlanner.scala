package Impl
import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.CommonUtils.Utils.StringUtils
import Plugins.MessageServiceApi.refreshMessage
import Tables.{MessageRow, MessageTable}
import monix.eval.Task
import Plugins.MessageServiceShared.Message
object refreshMessagePlanner extends APIPlanner[refreshMessage]{
  override protected def plan(api: refreshMessage)(implicit uuid: PlanUUID): Task[List[Message]] = {
      MessageTable.queryMessage(api.userName, api.userType)
  }
}