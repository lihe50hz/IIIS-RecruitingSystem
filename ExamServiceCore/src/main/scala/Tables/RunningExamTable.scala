package Tables

import Plugins.ExamServiceShared.RunningExamInfo
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import Plugins.ExamPaperServiceShared.SimpleExamPaper
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, TableQuery, Tag}

case class RunningExamRow(
                        index:Int,
                        examName:String,
                        startTime:Long,
                        endTime:Long,
                        examYear:String,
                       )

class RunningExamTable(tag:Tag) extends Table[RunningExamRow](tag, ServiceCenter.mainSchema, "runningExamTable") {
  def index:Rep[Int] = column[Int]("index", O.PrimaryKey)
  def examName:Rep[String] = column[String]("examName")
  def startTime:Rep[Long] = column[Long]("startTime")
  def endTime:Rep[Long] = column[Long]("endTime")

  def examYear:Rep[String] = column[String]("examYear")
  def * :ProvenShape[RunningExamRow] = (index, examName, startTime, endTime, examYear).mapTo[RunningExamRow]
}

object RunningExamTable{
  val runningExamTable = TableQuery[RunningExamTable]

  def addExam(exam:SimpleExamPaper, startTime:Long, endTime:Long)(implicit uuid:PlanUUID): Task[Int] = {
    val examRow = RunningExamRow(exam.index, exam.title, startTime, endTime, exam.examYear)
    dbReadAction(runningExamTable.filter(_.index === exam.index).result.headOption).flatMap{
      case Some(row) => Task.raiseError(new Exception(s"The exam already exists!"))
      case None => dbWriteAction(runningExamTable += examRow)
    }
  }

  def removeExam(paperIndex:Int)(implicit uuid: PlanUUID): Task[Int] = {
    dbReadAction(runningExamTable.filter(_.index === paperIndex).result.headOption).flatMap {
      case Some(row) => dbWriteAction(runningExamTable.filter(_.index === paperIndex).delete)
      case None => Task.raiseError(new Exception(s"The exam doesn't exist!"))
    }
  }

  def hasExam(paperIndex: Int)(implicit uuid: PlanUUID): Task[Boolean] = {
    dbReadAction(runningExamTable.filter(_.index === paperIndex).result.headOption).flatMap {
      case Some(row) => Task.now(true)
      case None => Task.now(false)
    }
  }

  def getExamInfo(paperIndex:Int)(implicit uuid:PlanUUID): Task[RunningExamInfo] = {
    dbReadAction(runningExamTable.filter(_.index === paperIndex).result.headOption).flatMap{
      case Some(row) => Task.now(RunningExamInfo(System.currentTimeMillis(), row.startTime, row.endTime, row.index, row.examName, row.examYear))
      case None => Task.raiseError(new Exception(s"Exam $paperIndex not found!"))
    }
  }

  def getAllRows(examYear:String)(implicit uuid: PlanUUID): Task[Array[RunningExamInfo]] = {
    dbReadAction {
      runningExamTable.filter(_.examYear === examYear).result
    }.map(_.toArray.map(row => RunningExamInfo(System.currentTimeMillis(), row.startTime, row.endTime, row.index, row.examName, row.examYear)))
  }

}
