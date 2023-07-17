package Plugins.UserServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class UserInfo(
  userName:String,
  password:String,
  email:String,
  userType:String,
  
) extends JacksonSerializable