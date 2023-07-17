package Plugins.SignUpServiceApi

import Plugins.SignUpServiceApi.MSAkkaSignUpServiceMessageExtended
import Plugins.SignUpServiceShared.SignUpInfo

case class queryInfoByExam(
                            examName:String,
                          ) extends MSAkkaSignUpServiceMessageExtended[Array[SignUpInfo]]
