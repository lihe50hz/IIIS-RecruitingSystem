package Process

import Globals.GlobalVariables.serviceCode
import Plugins.CommonUtils.ServiceCenter.portMap
import akka.actor.typed.ActorSystem
import akka.actor.typed.scaladsl.adapter.TypedActorSystemOps
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.headers.HttpOriginRange
import akka.http.scaladsl.server.Directives.{complete, concat, path}
import akka.http.scaladsl.server.Route
import akka.stream.scaladsl.Sink
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors
import ch.megard.akka.http.cors.scaladsl.settings.CorsSettings

import scala.util.{Failure, Success}

object PortalHttpServer {
  def startHttpServer(routes: Route, system: ActorSystem[_]): Unit = {

    implicit val classicSystem: akka.actor.ActorSystem = system.toClassic
    import system.executionContext
    // TODO: 端口号
    val futureBinding =
      Http().newServerAt("0.0.0.0", 6080).connectionSource().to(Sink.foreach { connection => {
        val remoteIP = connection.remoteAddress.getAddress.toString.replaceAll("/", "")
        println("Accepted connection from " + remoteIP)
        connection handleWith concat(routes,
          (path("health") & cors(CorsSettings.defaultSettings.copy(
            allowedOrigins = HttpOriginRange.* // * refers to all
          ))) {
            complete("OK!")
          })
      }
      }).run()
    futureBinding.onComplete {
      case Success(binding) =>
        val address = binding.localAddress
        println("Server online at http://{}:{}/", address.getHostString, address.getPort)
      case Failure(ex) =>
        println("Failed to bind HTTP endpoint, terminating system", ex)
        system.terminate()
    }
  }
}
