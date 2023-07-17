package Plugins.ExamServiceApi

import Plugins.ClusterSystem.Extension.ClusterAPI
import Plugins.ClusterSystem.ToClusterMessages.{MQRoute, ToExamServiceMessage}
import com.fasterxml.jackson.annotation.{JsonSubTypes, JsonTypeInfo}
import scala.reflect.runtime.universe._

import Plugins.ExamServiceApi.createExamAnswer
import Plugins.ExamServiceApi.updateStudentScore
import Plugins.ExamServiceApi.removeExam
import Plugins.ExamServiceApi.getCurrentInfo
import Plugins.ExamServiceApi.sortByTotalScore
import Plugins.ExamServiceApi.sortByExam
import Plugins.ExamServiceApi.sortByProblem

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes(
Array(
  new JsonSubTypes.Type(value = classOf[createExamAnswer], name = "createExamAnswer"),
  new JsonSubTypes.Type(value = classOf[updateStudentScore], name = "updateStudentScore"),
  new JsonSubTypes.Type(value = classOf[removeExam], name = "removeExam"),
  new JsonSubTypes.Type(value = classOf[removeExamAnswer], name = "removeExamAnswer"),
  new JsonSubTypes.Type(value = classOf[addExam], name = "addExam"),
  new JsonSubTypes.Type(value = classOf[hasExam], name = "hasExam"),
  new JsonSubTypes.Type(value = classOf[getAllExams], name = "getAllExams"),
  new JsonSubTypes.Type(value = classOf[getCurrentInfo], name = "getCurrentInfo"),
  new JsonSubTypes.Type(value = classOf[sortByTotalScore], name = "sortByTotalScore"),
  new JsonSubTypes.Type(value = classOf[sortByExam], name = "sortByExam"),
  new JsonSubTypes.Type(value = classOf[sortByProblem], name = "sortByProblem"),
  new JsonSubTypes.Type(value = classOf[getAllAnswers], name = "getAllAnswers"),
  new JsonSubTypes.Type(value = classOf[getAnswer], name = "getAnswer"),
  new JsonSubTypes.Type(value = classOf[updateStatus], name = "updateStatus"),
))
abstract class AkkaExamServiceMessage() extends ClusterAPI{
  override def getRoute: MQRoute = ToExamServiceMessage.examServiceRoute
}

abstract class MSAkkaExamServiceMessageExtended[Ret:TypeTag]() extends AkkaExamServiceMessage{
  override type ReturnType = Ret
  override def getReturnTypeTag: TypeTag[Ret] = typeTag[Ret]
}
