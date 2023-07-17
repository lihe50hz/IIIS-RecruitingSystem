package Plugins.SignUpServiceApi

import Plugins.SignUpServiceApi.MSAkkaSignUpServiceMessageExtended
import Plugins.SignUpServiceShared.SignUpInfo

case class writeInfo(
  signUpInfo:SignUpInfo,
) extends MSAkkaSignUpServiceMessageExtended[Int]
