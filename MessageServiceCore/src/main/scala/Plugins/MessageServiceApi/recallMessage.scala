package Plugins.MessageServiceApi

import Plugins.MessageServiceApi.MSAkkaMessageServiceMessageExtended


case class recallMessage(
                        userName:String,
                        userType:String,
                        mesRank:Int,
                      ) extends MSAkkaMessageServiceMessageExtended[Int]
