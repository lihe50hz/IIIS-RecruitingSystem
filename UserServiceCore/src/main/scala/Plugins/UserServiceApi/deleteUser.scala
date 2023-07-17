package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended

case class deleteUser (userName:String) extends MSAkkaUserServiceMessageExtended[Int]
