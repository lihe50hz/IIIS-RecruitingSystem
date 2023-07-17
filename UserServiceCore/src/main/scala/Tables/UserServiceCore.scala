package Tables

import Plugins.UserServiceShared.UserInfo
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction, dbWriteActionSeq}
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, TableQuery, Tag,LiteralColumn}
import org.apache.commons.codec.digest.DigestUtils
import play.api.libs.mailer.{Email, SMTPConfiguration, SMTPMailer}
import monix.execution.Scheduler.Implicits.global

import java.io.File
import scala.util.Random


case class UserRow(
                    userName:String,
                    password:String,
                    email:String,
                    userType:String,
                    )

case class Verification(
                       email:String,
                       verify:String,
                       sendTime:Long,
                       )


class UserServiceCoreTable(tag:Tag) extends Table[UserRow](tag, ServiceCenter.mainSchema, "UserServiceCoreTable") {
  def userName:Rep[String] = column[String]("username", O.PrimaryKey)
  def password:Rep[String] = column[String]("password")
  def email:Rep[String] = column[String]("email")
  def userType:Rep[String] = column[String]("userType")
  def * :ProvenShape[UserRow] = (userName,password,email,userType).mapTo[UserRow]
}

class VerificationTable(tag:Tag) extends Table[Verification](tag, ServiceCenter.mainSchema, "VerificationTable") {
  def email:Rep[String] = column[String]("email")
  def verify:Rep[String] = column[String]("verify")
  def sendTime:Rep[Long] = column[Long]("sendTime")
  def * :ProvenShape[Verification] = (email,verify,sendTime).mapTo[Verification]
}

object VerificationTable{

  val defaultEmailAddress = "1668263467@qq.com"
  val defaultEmailPassword = "laewbcwsulkabacb"
  val defaultEmailHost = "smtp.qq.com"
  val defaultEmailPort = 465
  val defaultEmailUseSsl = true
  val defaultEmailUseTls = false

  val defaultMailer = new SMTPMailer(SMTPConfiguration(
    host = defaultEmailHost,
    port = defaultEmailPort,
    ssl = defaultEmailUseSsl,
    tls = defaultEmailUseTls,
    user = Some(defaultEmailAddress),
    password = Some(defaultEmailPassword)
  ))

  val verifyTable = TableQuery[VerificationTable]

  def init()(implicit uuid: PlanUUID): Unit = {
    dbWriteAction(verifyTable.delete).runSyncUnsafe()//调试函数
  }

  private def sendVerification(email:String,verify:String): Unit = {
    val verificationCode = Email(
      subject = "您的注册验证码",
      from = defaultEmailAddress,
      to = Seq(email),
      bodyText = Some("验证码"),
      bodyHtml = Some(
        s"""<html><body><h2>
           |您的验证码:${verify}
          </h2></body></html>""".stripMargin),
      attachments = Seq()
    )
    defaultMailer.send(verificationCode)
  }

  private def sendAccountInfo(info:UserInfo):Unit={
    val email = Email(
      subject = "已找回您的账号与密码",
      from = defaultEmailAddress,
      to = Seq(info.email),
      bodyText = Some("账号与密码"),
      bodyHtml = Some(
        s"""<html><body><h2>
           |您的账号:${info.userName}
           |您的密码:${info.password}
            </h2></body></html>""".stripMargin),
      attachments = Seq()
    )
    defaultMailer.send(email)
  }

  def resetPassword(email:String,newPassword:String)(implicit uuid:PlanUUID):Task[Int]={
    UserServiceCoreTable.resetPassword(email,newPassword)
  }

  def printAll()(implicit uuid: PlanUUID): Unit = {
    dbReadAction(verifyTable.map(identity).result).flatMap({
      case all => {
        println(all);
        Task.now(0)
      }
    }).runSyncUnsafe()//调试函数
  }

  def checkVerification(email:String,verify:String)(implicit uuid:PlanUUID):Task[Int] = {
    val nowTime: Long = System.currentTimeMillis ().toLong
    //printAll()
    //println(nowTime)
    dbWriteAction (verifyTable.filter (x => (LiteralColumn (nowTime - 60000.toLong) > x.sendTime) ).delete).flatMap(one=>{
      dbReadAction(verifyTable.filter(x => x.email === email && x.verify === verify).result.headOption).flatMap({
        case Some(row) => {
          dbWriteAction(verifyTable.filter(x => x.email === email && x.verify === verify).delete).flatMap({
            one=>Task.now(0)
          })
        }
        case None => Task.now(1)
      })
    })

  }

  def getVerification(email:String)(implicit uuid:PlanUUID):Task[Int]={
    val nowTime:Long=System.currentTimeMillis().toLong
    dbWriteAction(verifyTable.filter(x=> (LiteralColumn(nowTime-60000.toLong)>x.sendTime)).delete).flatMap(one=>{
      val verify: String = (Random.nextInt(899999) + 100000).toString
      sendVerification(email, verify)
      val nowVerify = Verification(email, verify, System.currentTimeMillis().toLong)
      dbWriteActionSeq(List(verifyTable.filter(_.email === email).delete, verifyTable += nowVerify)).flatMap(
        one=> Task(0)
      )
    })
  }
}
object UserServiceCoreTable{
  val userTable = TableQuery[UserServiceCoreTable]
  val adminUsername="admin"
  val adminPassword="12345678"

  val admin=new UserRow(adminUsername,hashPassword(adminPassword),"","Administrater")

  private def hashPassword(password: String): String = {
    DigestUtils.sha256Hex(password)
  }

  def printAll()(implicit uuid:PlanUUID): Unit ={
    dbReadAction(userTable.map(identity).result).flatMap({
      case all => {
        println(all); Task.now(0)
      }
    }).runSyncUnsafe()//调试函数
  }

  def init()(implicit uuid:PlanUUID): Unit = {
    //dbWriteAction(userTable.delete).runSyncUnsafe()
    dbWriteActionSeq(List(userTable.filter(_.userType==="Administrater").delete,userTable+= admin)).runSyncUnsafe()//调试函数
    printAll()
  }

  def addUser(userInfo:UserInfo)(implicit uuid:PlanUUID): Task[Int] = {
    val userRow = UserRow(userInfo.userName,hashPassword(userInfo.password),userInfo.email,userInfo.userType)
    val flag:Task[Int]=dbReadAction(userTable.filter(x=> x.userName === userInfo.userName).result.headOption).flatMap{
      case Some(row) => Task.now(1)
      case None => {
        dbReadAction(userTable.filter(x=> x.email === userInfo.email).result.headOption).flatMap{
          case Some(row) => Task.now(2)
          case None => {dbWriteAction(userTable += userRow).flatMap({one=>Task.now(0)})}
        }
      }
    }
    return flag
  }

  def deleteUser(userName:String)(implicit uuid:PlanUUID): Task[Int] = {
    dbReadAction(userTable.filter(_.userName === userName).result.headOption).flatMap{
      case Some(row) => dbWriteAction(userTable.filter(_.userName === userName).delete)
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }


  def resetPassword(email: String,newPassword:String)(implicit uuid: PlanUUID): Task[Int]= {
    dbReadAction(userTable.filter(_.email === email).result.headOption).flatMap({
      case Some(row)=>{
        dbWriteAction(userTable.filter(_.email === email ).map(_.password).update(hashPassword(newPassword))).flatMap({
          one=>Task.now(0)
        })
      }
      case None=>{
        Task.now(-1)
      }
    })
  }

  def verifyUserType(userName:String)(implicit uuid:PlanUUID):Task[String]={
    dbReadAction(userTable.filter(_.userName===userName).result.headOption).flatMap{
      case Some(row) => Task.now(row.userType)
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }
  def getUserInfo(userName:String,userPassword: String)(implicit uuid:PlanUUID): Task[UserInfo] = {
    dbReadAction(userTable.filter(_.userName === userName)
      .filter(_.password === hashPassword(userPassword)).result.headOption).flatMap{
      case Some(row) => Task.now(UserInfo(row.userName,hashPassword(row.password),row.email,row.userType))
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }

  def getUserInfoNoPassword(userName:String)(implicit uuid:PlanUUID): Task[UserInfo] = {
    dbReadAction(userTable.filter(_.userName === userName).result.headOption).flatMap{
      case Some(row) => Task.now(UserInfo(row.userName, "0", row.email, row.userType))
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }

  def getAllInfo()(implicit uuid:PlanUUID): Task[Array[UserInfo]] = {
    dbReadAction(userTable.filter(_.userType =!= "Administrater").result).map{
      _.toArray.map(row => UserInfo(row.userName, "0", row.email, row.userType))
    }
  }

  def updateUserType(userName:String, userType:String)(implicit uuid:PlanUUID): Task[Int] = {
    dbReadAction(userTable.filter(_.userName === userName).result.headOption).flatMap{
      case Some(row) => {dbWriteAction(userTable.filter(_.userName === userName).update(UserRow(
          row.userName, row.password, row.email, userType
        ))).flatMap({
        one=>Task.now(0)
        })
      }
      case None => Task.raiseError(new Exception(s"User $userName not found!"))
    }
  }

  def main(args: Array[String]): Unit = {
    print()
    return
    import java.io.File
    import play.api.libs.mailer.{Email,SMTPConfiguration,SMTPMailer,AttachmentFile}
    val config = SMTPConfiguration(
      host = "smtp.qq.com",
      port = 465,
      ssl = true,
      tls = false,
      user = Option("1668263467@qq.com"),
      password = Option("laewbcwsulkabacb"),
    )
    val email = Email(
      subject="Simple email",
      from="1668263467@qq.com",
      to=Seq("1668263467@qq.com","wst22@mails.tsinghua.edu.cn"),
      bodyText = Some("A text message"),
      bodyHtml = Some(s"""<html><body><h1>Hello, Play for Scala</h1></body></html>"""),
      attachments = Seq(AttachmentFile("",new File("D:\\文件\\小学期1\\类型安全的前后端系统设计\\lec2.pptx")))
                        //AttachmentFile("",new File("D:\\文件\\小学期1\\代数与计算\\AC2023-Ex1-罗天择-2022012084.pdf")))
    )
    val mailer=new SMTPMailer(config)
    println("start send")
    mailer.send(email)
    println("end send")
  }
}