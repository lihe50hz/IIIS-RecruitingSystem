package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended


case class verify(
  userName:String,
  userType:String,
) extends MSAkkaUserServiceMessageExtended[Int]
