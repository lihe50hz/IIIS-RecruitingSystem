package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended
import Plugins.UserServiceShared.UserInfo

case class updateUserType (userName:String, userType: String) extends MSAkkaUserServiceMessageExtended[Int]
