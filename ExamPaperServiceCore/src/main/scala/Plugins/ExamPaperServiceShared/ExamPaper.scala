package Plugins.ExamPaperServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable
import Plugins.ExamPaperServiceShared.Problem

case class ExamPaper(
  index:Int,
  title:String,
  problemCnt:Int,
  examDuration:Int,
  examYear:String,
  problems:Array[Problem]
) extends JacksonSerializable