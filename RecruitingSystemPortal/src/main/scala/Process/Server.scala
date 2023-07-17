package Process

import Globals.GlobalVariables
import Plugins.ClusterSystem.setClusterSystem
import Plugins.CommonUtils.Utils.MailSender
import com.typesafe.scalalogging.Logger

object Server {
  val logger: Logger = Logger("MainServer")

  def main(args: Array[String]): Unit = try {
    logger.info("=== master version ===")
    setClusterSystem(GlobalVariables.threads, GlobalVariables.beforeSystemInit, GlobalVariables.afterSystemInit)
  } catch {
    case e: Exception =>
      MailSender.emailException(e)
  }
}
