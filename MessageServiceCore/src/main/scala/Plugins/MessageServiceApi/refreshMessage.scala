package Plugins.MessageServiceApi
import Plugins.MessageServiceShared.Message
import Plugins.MessageServiceApi.MSAkkaMessageServiceMessageExtended


case class refreshMessage(
   userName: String,
   userType: String,
) extends MSAkkaMessageServiceMessageExtended[List[Message]]
