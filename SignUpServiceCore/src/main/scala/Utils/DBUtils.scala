package Utils

import Plugins.CommonUtils.ServiceCenter
import Plugins.CommonUtils.TypedSystem.API.{API, PlanUUID}
import Plugins.CommonUtils.TypedSystem.EventGenerator.dbWriteActionSeq
import Plugins.SignUpServiceShared.SignUpInfo
import monix.execution.Scheduler.Implicits.global
import slick.jdbc.PostgresProfile.api._

import scala.concurrent.duration.DurationInt
import Tables.SignUpTable
import Tables.SignUpTable.{printAll, writeInfo}

object DBUtils {
  def initDatabase(): Unit = {
    println("初始化数据库...")
    implicit val uuid:PlanUUID = API.initUUID
    dbWriteActionSeq(
      List(
        sql"CREATE SCHEMA IF NOT EXISTS #${ServiceCenter.mainSchema.get}".as[Long],
        SignUpTable.signUpTable.schema.createIfNotExists
      )
    ).runSyncUnsafe(10.seconds)
//    writeInfo(SignUpInfo("Caro23333", "吕敬一", "男", "2022010874", "13671192823", "北京", "10000", "250", "OI", "hm_forever", "test", false, false, 0, true)).runSyncUnsafe()
    printAll()
  }

  def dropDatabse(): Unit = {
    println("删除数据库...")
    dbWriteActionSeq(
      List(
        sql"DROP SCHEMA IF EXISTS #${ServiceCenter.mainSchema.get}".as[Long],
        SignUpTable.signUpTable.schema.dropIfExists
      )
    )(API.initUUID).runSyncUnsafe(10.seconds)
  }
}
