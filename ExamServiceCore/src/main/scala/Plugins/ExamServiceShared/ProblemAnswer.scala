package Plugins.ExamServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable


import Plugins.ExamPaperServiceShared.Problem

case class ProblemAnswer(
  problem:Problem,
  studentChoice:String,
  studentAnswer:String,
  studentImage:String,
  score:Double,
  
) extends JacksonSerializable