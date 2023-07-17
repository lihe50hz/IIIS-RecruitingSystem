import Globals.GlobalVariables.{afterSystemInit, beforeSystemInit, threads}
import Plugins.ClusterSystem.setClusterSystem
import Plugins.CommonUtils.{LocalTestPath, UserPath}


object LocalTest {
  def main(args: Array[String]): Unit = try {
    println("=== Local Test version ===")
    UserPath.chosenPath = LocalTestPath()

    setClusterSystem(threads, beforeSystemInit, afterSystemInit)

  } catch {
    case exception: Exception =>
      exception.printStackTrace()
  }
}
