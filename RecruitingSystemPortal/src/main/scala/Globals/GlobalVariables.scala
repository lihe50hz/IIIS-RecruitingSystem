package Globals

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.CommonUtils.ServiceCenter.recruitingSystemPortalServiceCode

import Plugins.CommonUtils.TypedSystem.RootBehavior.AkkaThreadInfo
import Plugins.CommonUtils.TypedSystem.akkaSystem
import Process.PortalHttpServer.startHttpServer
import Process.Routes

object GlobalVariables {

  type APIType = ClusterAPI

  
  lazy val serviceCode: String = recruitingSystemPortalServiceCode


  /** ******************************************** threads ********************************************* */

  var beforeSystemInit: () => Unit = () => {
  }

  val threads: List[AkkaThreadInfo] = List(

  )

  var afterSystemInit: () => Unit = () => {
    startHttpServer(new Routes()(akkaSystem).tongWenPortalRoutes, akkaSystem)
  }
}
