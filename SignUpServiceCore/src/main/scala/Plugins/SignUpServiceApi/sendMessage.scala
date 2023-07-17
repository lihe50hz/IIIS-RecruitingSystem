package Plugins.SignUpServiceApi

import Plugins.SignUpServiceApi.MSAkkaSignUpServiceMessageExtended
import Plugins.SignUpServiceShared.SignUpInfo

case class sendMessage(
                        email:String,
                        realName:String,
                        messageType:Int,
                        result:Boolean,
                      ) extends MSAkkaSignUpServiceMessageExtended[Int]
