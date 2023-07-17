package Tables

import Plugins.SignUpServiceShared.SignUpInfo
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, Tag, TableQuery}
import monix.execution.Scheduler.Implicits.global
import Plugins.CommonUtils.TypedSystem.API.PlanUUID

case class SignUpRow(
                    userName:String,
                    realName:String,
                    gender:String,
                    ID:String,
                    phoneNumber:String,
                    provinceFrom:String,
                    CEEScore:String,
                    CEERanking:String,
                    awards:String,
                    selfIntroduction:String,
                    examYear:String,
                    score:Double,
                    isValid:Boolean,
                  )

class SignUpTable(tag:Tag) extends Table[SignUpRow](tag, ServiceCenter.mainSchema, "SignUpTable") {
  def userName:Rep[String] = column[String]("userName", O.PrimaryKey)
  def realName:Rep[String] = column[String]("realName")
  def gender:Rep[String] = column[String]("gender")
  def ID:Rep[String] = column[String]("ID")
  def phoneNumber:Rep[String] = column[String]("phoneNumber")
  def provinceFrom:Rep[String] = column[String]("provinceFrom")
  def CEEScore:Rep[String] = column[String]("CEEScore")
  def CEERanking:Rep[String] = column[String]("CEERanking")
  def awards:Rep[String] = column[String]("awards")
  def selfIntroduction:Rep[String] = column[String]("selfIntroduction")
  def examYear:Rep[String] = column[String]("examName")
  def score:Rep[Double] = column[Double]("score")
  def isValid:Rep[Boolean] = column[Boolean]("isValid")

  def * :ProvenShape[SignUpRow] = (userName,realName,gender,ID,phoneNumber,provinceFrom,
                                   CEEScore,CEERanking,awards,selfIntroduction,
                                   examYear, score, isValid).mapTo[SignUpRow]
}

object SignUpTable{
  val signUpTable = TableQuery[SignUpTable]
  def writeInfo(info:SignUpInfo)(implicit uuid:PlanUUID): Task[Int] = {
    val infoRow = SignUpRow(info.userName,info.realName,info.gender,info.ID,info.phoneNumber,
      info.provinceFrom,info.CEEScore,info.CEERanking,info.awards,info.selfIntroduction,
      info.examYear, info.score, info.isValid)
    println("WRITEINFO")
    dbReadAction(signUpTable.filter(_.userName === info.userName).result.headOption).flatMap{
      case Some(row) => {
        println("yes")
        dbWriteAction(signUpTable.filter(_.userName===info.userName).update(infoRow)).runSyncUnsafe()
        Task.now(0)
      }
      case None => {
        println("no")
        dbWriteAction(signUpTable += infoRow).runSyncUnsafe()
        Task.now(0)
      }
    }

  }

  def printAll()(implicit  uuid:PlanUUID): Unit = {
    dbReadAction(signUpTable.map(identity).result).flatMap({
      case all => {
        println(all);
        Task.now(0)
      }
    }).runSyncUnsafe()
  }
  def queryInfo(userName:String)(implicit uuid:PlanUUID): Task[SignUpInfo] = {
    dbReadAction(signUpTable.filter(_.userName === userName).result.headOption).flatMap{
      case Some(row) => Task.now(SignUpInfo(row.userName, row.realName, row.gender, row.ID, row.phoneNumber,
                          row.provinceFrom, row.CEEScore, row.CEERanking, row.awards, row.selfIntroduction,
                          row.examYear, row.score, row.isValid))
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }

  def hasInfo(userName:String)(implicit uuid:PlanUUID): Task[Boolean] = {
    dbReadAction(signUpTable.filter(_.userName === userName).result.headOption).flatMap{
      case Some(row) => Task.now(true)
      case None => Task.now(false)
    }
  }

  def queryInfoByExam(examYear:String)(implicit uuid:PlanUUID): Task[Array[SignUpInfo]] = {
    if(signUpTable.filter(_.examYear === examYear).result.headOption != None)
        println("no " + examYear)
    else
        println("yes")
    dbReadAction(signUpTable.filter(_.examYear === examYear).result).map{
      _.toArray.map(row => SignUpInfo(row.userName, row.realName, row.gender, row.ID, row.phoneNumber,
        row.provinceFrom, row.CEEScore, row.CEERanking, row.awards, row.selfIntroduction, row.examYear, row.score, row.isValid))
    }
  }

  def main(args: Array[String]): Unit = {

    implicit val uuid=PlanUUID.getUUID(PlanUUID("uuid:{id:test}").toString)
    import Plugins.CommonUtils.LocalTestPath
    import Plugins.CommonUtils.UserPath
    UserPath.chosenPath = LocalTestPath()
    dbWriteAction(signUpTable.map(identity).delete).runSyncUnsafe()
//    writeInfo(SignUpInfo("lubenwei3","罗天择","男","2022012084","17744532016","北京","10000","250","OI","我叫lubenwei","test",false,false,0,true)).runSyncUnsafe()
//    printAll()
//    queryInfo("lubenwei").flatMap({
//      case one=>{println(one);Task.now((0))}
//    })

  }
}
