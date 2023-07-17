package Globals

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Utils.DBUtils
import Plugins.SignUpServiceApi.AkkaSignUpServiceMessage
import Plugins.CommonUtils.ServiceCenter.signUpServiceServiceCode

object GlobalVariables {

  /** ******************************* Threads ******************************** */
  var beforeSystemInit: () => Unit = () => {
    DBUtils.initDatabase()
  }

  val threads: List[AkkaThreadInfo] = List()

  var afterSystemInit: () => Unit = () => {
  }

  lazy val serviceCode: String = signUpServiceServiceCode

  type APIType = AkkaSignUpServiceMessage
}
