package Tables

import Plugins.ExamServiceShared.{ExamAnswer, ProblemAnswer, Serializer, SimpleExamAnswer}
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, TableQuery, Tag}

case class ExamAnswerRow(
                        index: Option[Int] = None,
                        userName: String,
                        paperIndex: Int,
                        examName: String,
                        examYear: String,
                        answers: Array[ProblemAnswer],
                        score: Double,
                        )

object Convert {
  def fromRowToShared(row: ExamAnswerRow): SimpleExamAnswer = {
    SimpleExamAnswer(row.index.getOrElse(-1), row.userName, row.examName)
  }
}


object MyImplicitsForExamAnswer {
  implicit val arrayProblemAnswerColumnType: BaseColumnType[Array[ProblemAnswer]] = {
    MappedColumnType.base[Array[ProblemAnswer], String](
      list => list.map(Serializer.fromProblemAnswerToString).mkString("!"),
      string => string.split("!").map(Serializer.fromStringToProblemAnswer)
    )
  }
}

import MyImplicitsForExamAnswer._

class ExamAnswerTable(tag:Tag) extends Table[ExamAnswerRow](tag, ServiceCenter.mainSchema, "examAnswer") {

  def index:Rep[Int] = column[Int]("index", O.PrimaryKey, O.AutoInc)
  def userName:Rep[String] = column[String]("userName")
  def paperIndex:Rep[Int] = column[Int]("paperIndex")

  def examName: Rep[String] = column[String]("examName")
  def examYear:Rep[String] = column[String]("examYear")
  def answers:Rep[Array[ProblemAnswer]] = column[Array[ProblemAnswer]]("answers")
  def score:Rep[Double] = column[Double]("score")
  def * :ProvenShape[ExamAnswerRow] = (index.?, userName, paperIndex, examName, examYear, answers, score).mapTo[ExamAnswerRow]
}

object ExamAnswerTable{
  val examAnswerTable = TableQuery[ExamAnswerTable]

  def addAnswer(answer:ExamAnswer)(implicit uuid:PlanUUID): Task[Int] = {
    val answerRow = ExamAnswerRow(userName = answer.userName, paperIndex = answer.paperIndex, examName = answer.examName,
      examYear = answer.examYear, answers = answer.answers, score = answer.score)
    println(answerRow.answers(0))
    dbWriteAction(examAnswerTable += answerRow)
  }

  def getAnswer(index:Int)(implicit uuid:PlanUUID): Task[ExamAnswer] = {
    dbReadAction(examAnswerTable.filter(_.index === index).result.headOption).flatMap{
      case Some(row) => Task.now(ExamAnswer(row.index.getOrElse(-1), row.userName, row.paperIndex, row.examName, row.examYear,
        row.answers, row.score))
      case None => Task.raiseError(new Exception(s"Answer index ${index} doesn't exists!"))
    }
  }

  def removeAnswer(index:Int)(implicit uuid:PlanUUID): Task[Int] = {
    dbWriteAction(examAnswerTable.filter(_.index === index).delete)
  }
  def getAllRows()(implicit uuid: PlanUUID): Task[Array[SimpleExamAnswer]] = {
    dbReadAction {
      examAnswerTable.result
    }.map(_.toArray.map(Convert.fromRowToShared))
  }

}
