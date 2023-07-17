package Utils

import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.{API, PlanUUID}
import Plugins.CommonUtils.TypedSystem.EventGenerator.dbWriteActionSeq
import monix.execution.Scheduler.Implicits.global
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.duration.DurationInt
import Tables.ExamPaperTable

object DBUtils {
  def initDatabase(): Unit = {
    println("初始化数据库...")
    implicit val uuid:PlanUUID = API.initUUID
    dbWriteActionSeq(
      List(
        sql"CREATE SCHEMA IF NOT EXISTS #${ServiceCenter.mainSchema.get}".as[Long],
        ExamPaperTable.examPaperTable.schema.createIfNotExists
      )
    ).runSyncUnsafe(10.seconds)
  }

  def dropDatabse(): Unit = {
    println("删除数据库...")
    dbWriteActionSeq(
      List(
        sql"DROP SCHEMA IF EXISTS #${ServiceCenter.mainSchema.get}".as[Long],
        ExamPaperTable.examPaperTable.schema.dropIfExists
      )
    )(API.initUUID).runSyncUnsafe(10.seconds)
  }
}
