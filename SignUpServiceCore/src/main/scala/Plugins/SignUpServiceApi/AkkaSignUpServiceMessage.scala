package Plugins.SignUpServiceApi

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.ClusterSystem.ToClusterMessages.{MQRoute, ToSignUpServiceMessage}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import scala.reflect.runtime.universe._

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
Array(
  new JsonSubTypes.Type(value = classOf[writeInfo], name = "writeInfo"),
  new JsonSubTypes.Type(value = classOf[queryInfo], name = "queryInfo"),
  new JsonSubTypes.Type(value = classOf[queryInfoByExam], name = "queryInfoByExam"),
  new JsonSubTypes.Type(value = classOf[sendMessage], name = "sendMessage"),
  new JsonSubTypes.Type(value = classOf[hasInfo], name = "hasInfo"),
))
abstract class AkkaSignUpServiceMessage() extends ClusterAPI{
  override def getRoute: MQRoute = ToSignUpServiceMessage.signUpServiceRoute
}

abstract class MSAkkaSignUpServiceMessageExtended[Ret:TypeTag]() extends AkkaSignUpServiceMessage{
  override type ReturnType = Ret
  override def getReturnTypeTag: TypeTag[Ret] = typeTag[Ret]
}
