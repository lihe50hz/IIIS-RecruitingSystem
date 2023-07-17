package Plugins.UserServiceApi

import Plugins.UserServiceApi.MSAkkaUserServiceMessageExtended

case class getVerification (email:String) extends MSAkkaUserServiceMessageExtended[Int]
