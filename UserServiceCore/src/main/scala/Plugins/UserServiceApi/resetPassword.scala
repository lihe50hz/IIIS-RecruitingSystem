package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended

case class resetPassword (email:String,verify:String,newPassword:String) extends MSAkkaUserServiceMessageExtended[Int]
