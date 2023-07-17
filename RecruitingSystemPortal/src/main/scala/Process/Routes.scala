package Process

import Impl.CarRentPortalMessage
import Plugins.ClusterSystem.Exceptions.RouteNotAcceptedException
import Plugins.ClusterSystem.Extension.ClusterEventGenerator.portalForward
import Plugins.CommonUtils.Exceptions.{ExceptionWithCode, ExceptionWithMessage}
import Plugins.CommonUtils.TypedSystem.API.PlanUUID
import Plugins.CommonUtils.Types.ReplyMessage
import Plugins.CommonUtils.Utils.IOUtils.passwordRemoval
import Plugins.CommonUtils.Utils.{IOUtils, RegexUtils, StringUtils}
import akka.actor.typed.ActorSystem
import akka.http.scaladsl.model.headers.HttpOriginRange
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings
import monix.eval.Task
import monix.execution.Scheduler.Implicits.global

import scala.concurrent.duration.{DurationInt, FiniteDuration}

class Routes()(implicit val system: ActorSystem[_]) {

  val executionTimeLimit: FiniteDuration = 30.seconds

  val settings: CorsSettings.Default = CorsSettings.defaultSettings.copy(
    allowedOrigins = HttpOriginRange.* // * refers to all
  )
  val userTokenName = "userToken"
  val doctorTokenName = "doctorToken"

  val tongWenPortalRoutes: Route =
    concat(
      (pathPrefix("api") & cors(settings)) {
        post {
          entity(as[String]) { bytes: String =>
            val message: CarRentPortalMessage = IOUtils.deserialize[CarRentPortalMessage](bytes)
            implicit val uuid: PlanUUID = PlanUUID.getUUID(message.toClusterMessage.serializedInfo).addTail(StringUtils.randomLetterString(5))

//            val messageToken = getMessagePersonToken(message)

            IOUtils.printInfo(s"api got a post: ${passwordRemoval(bytes)}")

            val futureReply = Task.defer {
//              (if (!message.directPass)
//                sendAction(GetUserIDByTokenMessage(message.userToken))
//              else Task.unit) >>
                  portalForward(message.toClusterMessage.route, message.toClusterMessage.serializedInfo)
            }.timeout(executionTimeLimit).onErrorHandle {
              case e: ExceptionWithMessage =>
                IOUtils.printInfo(s"捕捉到已知异常${e.getMessage}")
                ReplyMessage(-1, e.message, uuid.id)
              case e: ExceptionWithCode =>
                IOUtils.printError(s"捕捉到严重异常${e.getMessage}")
                ReplyMessage(-2, e.getMessage, uuid.id)
              case e: Throwable =>
                IOUtils.printError(s"出现未知错误${e.getMessage}")
                IOUtils.exceptionToReplyCode(e, uuid.id)
            }.map(IOUtils.serialize).runToFuture

            complete(futureReply)
          }
        }
      }
    )


  private def getMessagePersonToken(message: CarRentPortalMessage) = {
    if (message.userToken != "") {
      message.userToken
    } else {
      val bytes = message.toClusterMessage.serializedInfo
      val userToken = RegexUtils.getValueOfJson(bytes, userTokenName)
      if (userToken != "") {
        userToken
      } else {
        RegexUtils.getValueOfJson(bytes, doctorTokenName)
      }
    }
  }

}
