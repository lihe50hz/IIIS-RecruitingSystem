package Plugins.MessageServiceApi

import Plugins.MessageServiceApi.MSAkkaMessageServiceMessageExtended


case class deleteMessage(
  userName:String,
  userType:String,
  mesRank:Int,
) extends MSAkkaMessageServiceMessageExtended[Int]
