package Plugins.ExamPaperServiceShared

import Plugins.CommonUtils.Types.JacksonSerializable

case class SimpleExamPaper(
                      index:Int,
                      title:String,
                      examYear:String,
                      examDuration:Int,
                    ) extends JacksonSerializable
