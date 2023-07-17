package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended


case class login(
  userName:String,
  userPassword:String,
) extends MSAkkaUserServiceMessageExtended[Int]
