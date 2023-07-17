package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended

case class register(
  userName:String,
  password:String,
  email:String,
  verify:String
) extends MSAkkaUserServiceMessageExtended[Int]
