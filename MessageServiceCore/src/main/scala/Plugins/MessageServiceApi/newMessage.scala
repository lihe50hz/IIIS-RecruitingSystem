package Plugins.MessageServiceApi

import Plugins.MessageServiceApi.MSAkkaMessageServiceMessageExtended


case class newMessage(
                       userName:String,
                       userType:String,
                       mesContent:String,
                       mesTitle:String,
                       mesStatus:List[String],
                       mesType:String,
                       tarName:String
                     ) extends MSAkkaMessageServiceMessageExtended[Int]
