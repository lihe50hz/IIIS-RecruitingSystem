package TongWenPortal

import Globals.GlobalVariables
import Plugins.ClusterSystem.setClusterSystem
import Plugins.CommonUtils.{LocalTestPath, UserPath}

object LocalTest {
  def main(args: Array[String]): Unit =  try {
    println("=== Local Test version ===")
    UserPath.chosenPath = LocalTestPath()
    setClusterSystem(GlobalVariables.threads, GlobalVariables.beforeSystemInit, GlobalVariables.afterSystemInit)
  } catch {
    case e: Exception =>
      e.printStackTrace()
  }
}
