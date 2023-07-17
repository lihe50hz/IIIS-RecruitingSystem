package Plugins.ExamPaperServiceApi

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.ClusterSystem.ToClusterMessages.{MQRoute, ToExamPaperServiceMessage}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import scala.reflect.runtime.universe._

import Plugins.ExamPaperServiceApi.createExamPaper
import Plugins.ExamPaperServiceApi.removeExamPaper
import Plugins.ExamPaperServiceApi.rewriteExamPaper
import Plugins.ExamPaperServiceApi.getAllExamPaper

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
Array(
  new JsonSubTypes.Type(value = classOf[createExamPaper], name = "createExamPaper"),
  new JsonSubTypes.Type(value = classOf[removeExamPaper], name = "removeExamPaper"),
  new JsonSubTypes.Type(value = classOf[rewriteExamPaper], name = "rewriteExamPaper"),
  new JsonSubTypes.Type(value = classOf[getAllExamPaper], name = "getAllExamPaper"),
  new JsonSubTypes.Type(value = classOf[getExamPaper], name = "getExamPaper"),
))
abstract class AkkaExamPaperServiceMessage() extends ClusterAPI{
  override def getRoute: MQRoute = ToExamPaperServiceMessage.examPaperServiceRoute
}

abstract class MSAkkaExamPaperServiceMessageExtended[Ret:TypeTag]() extends AkkaExamPaperServiceMessage{
  override type ReturnType = Ret
  override def getReturnTypeTag: TypeTag[Ret] = typeTag[Ret]
}
