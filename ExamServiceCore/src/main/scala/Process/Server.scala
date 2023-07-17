package Process

import Globals.GlobalVariables
import Plugins.ClusterSystem.setClusterSystem
import com.typesafe.scalalogging.Logger

object Server {
  val logger:Logger = Logger("MainServer")

  def main(args: Array[String]): Unit = try {
    logger.info("=== master version (NewProject) ===")

    setClusterSystem(GlobalVariables.threads,GlobalVariables.beforeSystemInit,GlobalVariables.afterSystemInit)
  }catch {
    case e:Exception =>
      e.printStackTrace()
  }
}
