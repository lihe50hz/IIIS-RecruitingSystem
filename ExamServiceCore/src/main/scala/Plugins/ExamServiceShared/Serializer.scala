package Plugins.ExamServiceShared

import Plugins.ExamPaperServiceShared.Problem

object Serializer{
  def fromProblemToString(problem: Problem): String = {
    ("{()" + problem.problemType + "&/&" +
      problem.description + "&/&" +
      problem.image + "&/&" +
      problem.choiceCnt.toString + "()}")
  }

  def fromStringToProblem(string: String): Problem = {
    if (string == "") return Problem("Choice", "", "", 0)
    println(string)
    val strList = string.replace("{()", "").replace("()}", "").split("&/&")
    Problem(strList(0), strList(1), strList(2), strList(3).toInt)
  }
  def fromProblemAnswerToString(answer: ProblemAnswer): String = {
    ("(*" + fromProblemToString(answer.problem) + "`" +
      answer.studentChoice + "`" +
      answer.studentAnswer + "`" +
      answer.studentImage + "`" +
      answer.score.toString + "*)")
  }
  def fromStringToProblemAnswer(string: String): ProblemAnswer = {
    val strList = string.replace("(*", "").replace("*)", "").split("`")
    println(string)
    println(strList(0))
    println(strList(1))
    println(strList(2))
    println(strList(3))
    println(strList(4))
    ProblemAnswer(fromStringToProblem(strList(0)), strList(1), strList(2),
      strList(3), strList(4).toDouble)
  }

  def fromExamAnswerToString(answer: ExamAnswer): String = {
    ( answer.index.toString + "#" +
      answer.userName + "#" +
      answer.paperIndex.toString + "#" +
      answer.examName + "#" +
      answer.examYear + "#" +
      "%[" + answer.answers.map(fromProblemAnswerToString).mkString("vvvvv") + "]%" + "#" +
      answer.score.toString )
  }

  def fromStringToExamAnswer(string: String): ExamAnswer = {
    val strList = string.split("#")
    ExamAnswer(strList(0).toInt, strList(1), strList(2).toInt, strList(3), strList(4),
      strList(5).replace("%[", "").replace("]%", "")
        .split("vvvvv").map(fromStringToProblemAnswer),
      strList(6).toDouble)
  }

}