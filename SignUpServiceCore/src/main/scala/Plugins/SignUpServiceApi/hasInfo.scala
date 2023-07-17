package Plugins.SignUpServiceApi

import Plugins.SignUpServiceApi.MSAkkaSignUpServiceMessageExtended
import Plugins.SignUpServiceShared.SignUpInfo

case class hasInfo(
                      userName:String,
                    ) extends MSAkkaSignUpServiceMessageExtended[Boolean]
