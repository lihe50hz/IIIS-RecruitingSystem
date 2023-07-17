package Tables

import Plugins.MessageServiceShared.Message
import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.TypedSystem.EventGenerator.{dbReadAction, dbReadActionSeq, dbWriteAction}
import Plugins.CommonUtils.Utils.DBUtils.db
import akka.http.scaladsl.model.DateTime
import monix.eval.Task
import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ProvenShape, TableQuery, Tag}

import scala.concurrent.ExecutionContext
import scala.util.parsing.json.JSON
class MessageTable(tag: Tag) extends Table[MessageRow](tag, "MessageTable") {
  def mesRank: Rep[Int] = column[Int]("mes_rank", O.PrimaryKey, O.AutoInc)
  def mesTitle: Rep[String] = column[String]("mes_title")
  def mesPic: Rep[String] = column[String]("mes_status")
  def tarName: Rep[String] = column[String]("tar_name")
  def mesType: Rep[String] = column[String]("mes_type")
  def mesContent: Rep[String] = column[String]("mes_content")
  def mesDate: Rep[String] = column[String]("mes_date")

  override def * : ProvenShape[MessageRow] =
    (mesRank, mesTitle, mesPic, tarName,mesType, mesContent, mesDate).<>(MessageRow.tupled, MessageRow.unapply)
}

case class MessageRow(
                       mesRank: Int,
                       mesTitle: String,
                       mesStatus: String,
                       tarName:String,
                       mesType: String,
                       mesContent: String,
                       mesDate: String
                     )

object MessageTable {
  val messages = TableQuery[MessageTable]

  // 添加操作
  def addMessage(message: MessageRow)(implicit uuid:PlanUUID): Task[Int] = {
    dbWriteAction {
      val messageToAdd = validateAndCopyMessage(message) // 检查并复制消息对象
      messages += messageToAdd
    }
  }


  def deleteMessage(mesRank: Int)(implicit uuid:PlanUUID): Task[Int] = {
    dbReadAction(messages.filter(_.mesRank === mesRank).result.headOption).flatMap {
      case Some(req) =>
        val deleteAction = messages.filter(_.mesRank === req.mesRank).delete
        dbWriteAction(deleteAction)
      case None => Task.raiseError(new Exception(s"Message ${mesRank} doesn't exists!"))
    }
  }



  def queryMessage(userName: String, userType: String)(implicit uuid: PlanUUID): Task[List[Message]] = {
    if (userType == "Student") {
      dbReadAction(messages.filter(_.mesType === "Published").filter { row =>
        (row.tarName === "  ") || (row.tarName.like(s"%${" " + userName + " "}%"))

      }.result).flatMap { result =>
        val messageList = result.map(req => Message(req.mesTitle, req.mesContent, req.mesRank, req.mesStatus.split('|'), req.mesType, req.mesDate,req.tarName)).toList
        Task.pure(messageList)
      }
    } else {
      dbReadAction(messages.result).flatMap { result =>
        val messageList = result.map(req => Message(req.mesTitle, req.mesContent, req.mesRank, req.mesStatus.split('|'), req.mesType, req.mesDate,req.tarName)).toList
        Task.pure(messageList)
      }
    }
  }

  def sendMessage(mesRank: Int)(implicit uuid: PlanUUID): Task[Int] = {
    dbReadAction(messages.filter(_.mesRank === mesRank).result.headOption).flatMap {
      case Some(existingMessage) =>
        val validatedMessage = validateAndCopyMessage(existingMessage.copy(mesType = "Published"))
        val updateAction = messages.filter(_.mesRank === existingMessage.mesRank)
          .update(validatedMessage)
        dbWriteAction(updateAction)
      case None => Task.raiseError(new Exception(s"Message $mesRank doesn't exist!"))
    }
  }

  def recallMessage(mesRank: Int)(implicit uuid: PlanUUID): Task[Int] = {
    dbReadAction(messages.filter(_.mesRank === mesRank).result.headOption).flatMap {
      case Some(existingMessage) =>
        val validatedMessage = validateAndCopyMessage(existingMessage.copy(mesType = "Unpublished"))
        val updateAction = messages.filter(_.mesRank === existingMessage.mesRank)
          .update(validatedMessage)
        dbWriteAction(updateAction)
      case None => Task.raiseError(new Exception(s"Message $mesRank doesn't exist!"))
    }
  }



  // 检查并复制消息对象
  private def validateAndCopyMessage(message: MessageRow): MessageRow = {
    val validatedType = validateMessageType(message.mesType)
    val currentDate = DateTime.now.toString // 获取当前日期
    message.copy(mesType = validatedType, mesDate = currentDate)
  }

  // 检查消息状态字段是否合法

  // 检查消息类型字段是否合法
  private def validateMessageType(mType: String): String = {
    if (mType == "Published" || mType == "Unpublished") {
      mType
    } else {
      throw new Exception("mesType字段不合法")
    }
  }
}