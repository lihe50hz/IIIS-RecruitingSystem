package Plugins.MessageServiceApi

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.ClusterSystem.ToClusterMessages.{MQRoute, ToMessageServiceMessage}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import scala.reflect.runtime.universe._

import Plugins.MessageServiceApi.refreshMessage
import Plugins.MessageServiceApi.newMessage
import Plugins.MessageServiceApi.deleteMessage

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
Array(
  new JsonSubTypes.Type(value = classOf[refreshMessage], name = "refreshMessage"),
  new JsonSubTypes.Type(value = classOf[newMessage], name = "newMessage"),
  new JsonSubTypes.Type(value = classOf[deleteMessage], name = "deleteMessage"),
  new JsonSubTypes.Type(value = classOf[sendMessage], name = "sendMessage"),
  new JsonSubTypes.Type(value = classOf[recallMessage], name = "recallMessage"),
))
abstract class AkkaMessageServiceMessage() extends ClusterAPI{
  override def getRoute: MQRoute = ToMessageServiceMessage.messageServiceRoute
}

abstract class MSAkkaMessageServiceMessageExtended[Ret:TypeTag]() extends AkkaMessageServiceMessage{
  override type ReturnType = Ret
  override def getReturnTypeTag: TypeTag[Ret] = typeTag[Ret]
}
