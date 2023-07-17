package Plugins.SignUpServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class SignUpInfo(
  userName:String,
  realName:String,
  gender:String,
  ID:String,
  phoneNumber:String,
  provinceFrom:String,
  CEEScore:String,
  CEERanking:String,
  awards:String,
  selfIntroduction:String,
  examYear:String,
  score:Double,
  isValid:Boolean,
) extends JacksonSerializable