package Plugins.ExamPaperServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class Problem(
  problemType:String,
  description:String,
  image:String,
  choiceCnt:Int,
  
) extends JacksonSerializable