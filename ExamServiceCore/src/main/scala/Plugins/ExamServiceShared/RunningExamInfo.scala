package Plugins.ExamServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class RunningExamInfo(
  nowTime:Long,
  startTime:Long,
  endTime:Long,
  paperIndex:Int,
  examName:String,
  examYear:String,
) extends JacksonSerializable