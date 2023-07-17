package Impl

import Plugins.ClusterSystem.ToClusterMessages.ToClusterMessage
import Plugins.CommonUtils.Types.JacksonSerializable

case class CarRentPortalMessage(userToken:String, toClusterMessage: ToClusterMessage) extends JacksonSerializable
