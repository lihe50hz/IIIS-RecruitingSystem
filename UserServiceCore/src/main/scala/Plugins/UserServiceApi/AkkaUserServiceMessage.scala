package Plugins.UserServiceApi

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.ClusterSystem.ToClusterMessages.{MQRoute, ToUserServiceMessage}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import scala.reflect.runtime.universe._


@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
Array(
  new JsonSubTypes.Type(value = classOf[register], name = "register"),
  new JsonSubTypes.Type(value = classOf[login], name = "login"),
  new JsonSubTypes.Type(value = classOf[verify], name = "verify"),
  new JsonSubTypes.Type(value = classOf[resetPassword], name = "resetPassword"),
  new JsonSubTypes.Type(value = classOf[getVerification], name = "getVerification"),
  new JsonSubTypes.Type(value = classOf[queryUserInfo], name = "queryUserInfo"),
  new JsonSubTypes.Type(value = classOf[queryAllInfo], name = "queryAllInfo"),
  new JsonSubTypes.Type(value = classOf[updateUserType], name = "updateUserType"),
  new JsonSubTypes.Type(value = classOf[deleteUser], name = "deleteUser"),
))
abstract class AkkaUserServiceMessage() extends ClusterAPI{
  override def getRoute: MQRoute = ToUserServiceMessage.userServiceRoute
}

abstract class MSAkkaUserServiceMessageExtended[Ret:TypeTag]() extends AkkaUserServiceMessage{
  override type ReturnType = Ret
  override def getReturnTypeTag: TypeTag[Ret] = typeTag[Ret]
}
