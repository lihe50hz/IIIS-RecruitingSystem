package Plugins.MessageServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class Message(
                    mesTitle:String,
                    mesContent:String,
                    mesRank:Int,
                    mesStatus:Array[String],
                    mesType:String,
                    mesDate:String,
                    tarName:String,
                  ) extends JacksonSerializable