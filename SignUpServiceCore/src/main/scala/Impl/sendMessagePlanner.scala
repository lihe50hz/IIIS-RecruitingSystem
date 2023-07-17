package Impl

import Plugins.CommonUtils.TypedSystem.API.{APIPlanner, PlanUUID}
import Plugins.SignUpServiceApi.sendMessage
import monix.eval.Task
import play.api.libs.mailer.{Email, SMTPConfiguration, SMTPMailer}
import java.util.Calendar
object sendMessagePlanner extends APIPlanner[sendMessage]{
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

  override protected def plan(api: sendMessage)(implicit uuid: PlanUUID): Task[Int] = {
    val date = Calendar.getInstance()
    val currentTime = date.getTime()
    val examSuccess = api.realName + "同学：\n\t 恭喜你进入面试！请于 xx 月 xx 日 xx:xx 准时到达 FIT 楼二层准备参加面试。祝你成功！\n 交叉信息研究院 \n"
    val examFailed = api.realName + "同学：\n\t 很遗憾，你没有进入面试。希望你在接下来的学习生活中再接再厉，我们有缘再见！ \n 交叉信息研究院 \n"
    val interviewSuccess = api.realName + "同学：\n\t 恭喜你通过面试，被我院录取！请于 xx 月 xx 日 xx:xx 前到 xxx 地确认录取结果。\n 交叉信息研究院 \n"
    val interviewFailed = api.realName + "同学：\n\t 很遗憾，你没有通过面试。希望你在接下来的学习生活中再接再厉，我们有缘再见！ \n 交叉信息研究院 \n"
    val message = Email(
      subject = "交叉信息院二次招生：通知",
      from = defaultEmailAddress,
      to = Seq(api.email),
      bodyText = Some(if(api.messageType == 1) {
        if(api.result) examSuccess + currentTime
        else examFailed + currentTime
      } else {
        if(api.result) interviewSuccess + currentTime
        else interviewFailed + currentTime
      }),
      attachments = Seq()
    )
    defaultMailer.send(message)
    Task.now(0)
  }
}
