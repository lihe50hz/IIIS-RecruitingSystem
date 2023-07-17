package Globals

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Utils.DBUtils
import Plugins.ExamPaperServiceApi.AkkaExamPaperServiceMessage
import Plugins.CommonUtils.ServiceCenter.examPaperServiceServiceCode

object GlobalVariables {

  /** ******************************* Threads ******************************** */
  var beforeSystemInit: () => Unit = () => {
    DBUtils.initDatabase()
  }

  val threads: List[AkkaThreadInfo] = List()

  var afterSystemInit: () => Unit = () => {
  }

  lazy val serviceCode: String = examPaperServiceServiceCode

  type APIType = AkkaExamPaperServiceMessage
}
