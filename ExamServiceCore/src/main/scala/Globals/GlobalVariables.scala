package Globals

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Utils.DBUtils
import Plugins.ExamServiceApi.AkkaExamServiceMessage
import Plugins.CommonUtils.ServiceCenter.examServiceServiceCode

object GlobalVariables {

  /** ******************************* Threads ******************************** */
  var beforeSystemInit: () => Unit = () => {
    DBUtils.initDatabase()
  }

  val threads: List[AkkaThreadInfo] = List()

  var afterSystemInit: () => Unit = () => {
  }

  lazy val serviceCode: String = examServiceServiceCode

  type APIType = AkkaExamServiceMessage
}
