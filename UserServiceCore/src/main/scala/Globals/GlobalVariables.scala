package Globals

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Utils.DBUtils
import Plugins.UserServiceApi.AkkaUserServiceMessage
import Plugins.CommonUtils.ServiceCenter.userServiceServiceCode

object GlobalVariables {

  /** ******************************* Threads ******************************** */
  var beforeSystemInit: () => Unit = () => {
    DBUtils.initDatabase()
  }

  val threads: List[AkkaThreadInfo] = List()

  var afterSystemInit: () => Unit = () => {
  }

  lazy val serviceCode: String = userServiceServiceCode

  type APIType = AkkaUserServiceMessage
}
