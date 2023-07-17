package Plugins.ExamServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable


import Plugins.ExamServiceShared.ExamAnswer

case class StudentScore(
  userName:String,
  totalScore:Double,
  examYear:String,
  examAnswers:Array[ExamAnswer],
  specifiedScore:Double,
  examPassed:Boolean,
  interviewPassed:Boolean,
) extends JacksonSerializable