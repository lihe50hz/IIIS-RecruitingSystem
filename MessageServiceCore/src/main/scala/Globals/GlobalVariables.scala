package Globals

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Utils.DBUtils
import Plugins.MessageServiceApi.AkkaMessageServiceMessage
import Plugins.CommonUtils.ServiceCenter.messageServiceServiceCode

object GlobalVariables {

  /** ******************************* Threads ******************************** */
  var beforeSystemInit: () => Unit = () => {
    DBUtils.initDatabase()
  }

  val threads: List[AkkaThreadInfo] = List()

  var afterSystemInit: () => Unit = () => {
  }

  lazy val serviceCode: String = messageServiceServiceCode

  type APIType = AkkaMessageServiceMessage
}
