package Plugins.ExamServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class ExamAnswer(
  index:Int,
  userName:String,
  paperIndex:Int,
  examName:String,
  examYear:String,
  answers:Array[ProblemAnswer],
  score:Double,
  
) extends JacksonSerializable