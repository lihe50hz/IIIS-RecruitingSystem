package Plugins.ExamServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class SimpleExamAnswer(
                       index:Int,
                       userName:String,
                       examName:String,
                     ) extends JacksonSerializable