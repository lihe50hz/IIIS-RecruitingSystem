package Tables

import Plugins.ExamServiceShared.ExamAnswer
import Plugins.ExamServiceShared.StudentScore
import Plugins.ExamServiceShared.Serializer
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, Tag, TableQuery}

case class StudentScoreRow(
                            userName: String,
                            totalScore: Double,
                            examYear: String,
                            exams: Array[ExamAnswer],
                            examPassed: Boolean,
                            interviewPassed: Boolean,
                          )

object MyImplicitsForStudentScore {
  implicit val arrayExamAnswerColumnType: BaseColumnType[Array[ExamAnswer]] = {
    MappedColumnType.base[Array[ExamAnswer], String](
      list => list.map(Serializer.fromExamAnswerToString).mkString("!"),
      string => string.split("!").map(Serializer.fromStringToExamAnswer)
    )
  }
}

import MyImplicitsForStudentScore._

class StudentScoreTable(tag:Tag) extends Table[StudentScoreRow](tag, ServiceCenter.mainSchema, "studentScore") {

  def userName:Rep[String] = column[String]("userName", O.PrimaryKey)
  def totalScore:Rep[Double] = column[Double]("totalScore")
  def examYear:Rep[String] = column[String]("examYear")
  def exams:Rep[Array[ExamAnswer]] = column[Array[ExamAnswer]]("exams")
  def examPassed:Rep[Boolean] = column[Boolean]("examPassed")

  def interviewPassed:Rep[Boolean] = column[Boolean]("interviewPassed")

  def * :ProvenShape[StudentScoreRow] = (userName, totalScore, examYear, exams, examPassed, interviewPassed).mapTo[StudentScoreRow]
}

object StudentScoreTable{
  val studentScoreTable = TableQuery[StudentScoreTable]

  def addExamAnswer(exam: ExamAnswer)(implicit uuid:PlanUUID): Task[Int] = {
    dbReadAction(studentScoreTable.filter(_.userName === exam.userName).
      filter(_.examYear === exam.examYear).result.headOption).flatMap {
      case Some(row) => dbWriteAction {
        studentScoreTable.filter(_.userName === exam.userName).update{
          StudentScoreRow(row.userName, row.totalScore + exam.score, row.examYear, row.exams ++ Array(exam),
            row.examPassed, row.interviewPassed)
        }
      }
      case None => dbWriteAction{
        studentScoreTable += StudentScoreRow(exam.userName, exam.score, exam.examYear, Array(exam), false, false)
      }
    }
  }

  def updateStatus(score: StudentScore)(implicit uuid:PlanUUID): Task[Int] = {
    dbReadAction(studentScoreTable.filter(_.userName === score.userName).
      filter(_.examYear === score.examYear).result.headOption).flatMap {
      case Some(row) => dbWriteAction {
        studentScoreTable.filter(_.userName === score.userName).update {
          StudentScoreRow(row.userName, row.totalScore, row.examYear, row.exams,
            score.examPassed, score.interviewPassed)
        }
      }
      case None => Task.raiseError(new Exception(s"Score ${score.userName} doesn't exist"))
    }
  }

  def getAllRows(examYear:String)(implicit uuid: PlanUUID): Task[Array[StudentScore]] = {
    dbReadAction {
      studentScoreTable.filter(_.examYear === examYear).result
    }.map(_.toArray.map(row => StudentScore(row.userName, row.totalScore, row.examYear, row.exams, 0, row.examPassed, row.interviewPassed)))
  }

}
