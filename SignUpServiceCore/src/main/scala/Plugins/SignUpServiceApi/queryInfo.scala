package Plugins.SignUpServiceApi

import Plugins.SignUpServiceApi.MSAkkaSignUpServiceMessageExtended
import Plugins.SignUpServiceShared.SignUpInfo

case class queryInfo(
  userName:String,
) extends MSAkkaSignUpServiceMessageExtended[SignUpInfo]
