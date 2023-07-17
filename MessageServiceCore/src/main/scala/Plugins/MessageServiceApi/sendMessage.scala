package Plugins.MessageServiceApi

import Plugins.MessageServiceApi.MSAkkaMessageServiceMessageExtended


case class sendMessage(
                          userName:String,
                          userType:String,
                          mesRank:Int,
                        ) extends MSAkkaMessageServiceMessageExtended[Int]
