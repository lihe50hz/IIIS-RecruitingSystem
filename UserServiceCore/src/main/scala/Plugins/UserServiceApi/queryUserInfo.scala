package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended
import Plugins.UserServiceShared.UserInfo

case class queryUserInfo (userName:String) extends MSAkkaUserServiceMessageExtended[UserInfo]
