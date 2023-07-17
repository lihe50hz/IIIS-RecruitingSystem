package Tables

import Plugins.ExamPaperServiceShared.ExamPaper
import Plugins.ExamPaperServiceShared.SimpleExamPaper
import Plugins.ExamPaperServiceShared.Problem
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import monix.execution.Scheduler.Implicits.global
import slick.lifted.{ProvenShape, TableQuery, Tag}

case class ExamPaperRow(
                       index:Option[Int] = None,
                       title:String,
                       problemCnt:Int,
                       examDuration:Int,
                       examYear:String,
                       problems:Array[Problem],
                    )

object Convert{
  def fromProblemToString(problem: Problem): String = {
    ("{()" + problem.problemType + "&/&" +
      problem.description + "&/&" +
      problem.image + "&/&" +
      problem.choiceCnt.toString + "()}")
  }

  def fromStringToProblem(string: String): Problem = {
    if(string == "") return Problem("Choice", "", "", 0)
    println(string)
    val strList = string.replace("{()", "").replace("()}", "").split("&/&")
    Problem(strList(0), strList(1), strList(2), strList(3).toInt)
  }

  def fromRowToShared(row: ExamPaperRow): ExamPaper = {
    ExamPaper(row.index.getOrElse(-1), row.title, row.problemCnt, row.examDuration, row.examYear, row.problems)
  }

  def simplify(paper: ExamPaper): SimpleExamPaper = {
    SimpleExamPaper(paper.index, paper.title, paper.examYear, paper.examDuration)
  }

}

object MyImplicits {
  implicit val arrayProblemColumnType: BaseColumnType[Array[Problem]] = {
    MappedColumnType.base[Array[Problem], String](
      list => list.map(Convert.fromProblemToString).mkString("!"),
      string => string.split("!").map(Convert.fromStringToProblem)
    )
  }
}

import MyImplicits._

class ExamPaperTable(tag:Tag) extends Table[ExamPaperRow](tag, ServiceCenter.mainSchema, "examPaper") {
  def index:Rep[Int] = column[Int]("index", O.PrimaryKey, O.AutoInc)
  def title:Rep[String] = column[String]("title")
  def problemCnt:Rep[Int] = column[Int]("problemCnt")
  def examDuration:Rep[Int] = column[Int]("examDuration")
  def examYear:Rep[String] = column[String]("examYear")
  def problems:Rep[Array[Problem]] = column[Array[Problem]]("problems")

  def * : ProvenShape[ExamPaperRow] = (index.?, title, problemCnt, examDuration, examYear, problems).mapTo[ExamPaperRow]
}



object ExamPaperTable{
  val examPaperTable = TableQuery[ExamPaperTable]

  def addPaper(paper:ExamPaper)(implicit uuid:PlanUUID): Task[Int] = {
    val paperRow = ExamPaperRow(title = paper.title, problemCnt = paper.problemCnt,
      examDuration = paper.examDuration, examYear = paper.examYear, problems = paper.problems)
    dbWriteAction((examPaperTable returning examPaperTable.map(_.index)) += paperRow)
  }

  def deletePaper(index:Int)(implicit uuid:PlanUUID): Task[Int] = {
    dbWriteAction(examPaperTable.filter(_.index === index).delete)
  }

  def getPaper(index:Int)(implicit uuid:PlanUUID): Task[ExamPaper] = {
    dbReadAction(examPaperTable.filter(_.index === index).result.headOption).flatMap{
      case Some(row) => Task.now(ExamPaper(row.index.getOrElse(-1), row.title, row.problemCnt, row.examDuration, row.examYear, row.problems))
      case None => Task.raiseError(new Exception(s"Index $index not found!"))
    }
  }

  def rewritePaper(paper:ExamPaper)(implicit uuid: PlanUUID): Task[Int] = {
    val paperRow = ExamPaperRow(index = Option(paper.index), title = paper.title, problemCnt = paper.problemCnt,
      examDuration = paper.examDuration, examYear = paper.examYear, problems = paper.problems)
    println(paper.problems.map(Convert.fromProblemToString).mkString(","))
    dbReadAction(examPaperTable.filter(_.index === paper.index).result.headOption).flatMap {
      case None => Task.raiseError(new Exception(s"Index $paper.index not found!"))
      case Some(row) => dbWriteAction(examPaperTable.filter(_.index === paper.index).update(paperRow))
    }
  }

  def getAllRows()(implicit uuid: PlanUUID): Task[Array[SimpleExamPaper]] = {
    dbReadAction{
      examPaperTable.result
    }.map(_.toArray.map(Convert.fromRowToShared).map(Convert.simplify))
  }

}
