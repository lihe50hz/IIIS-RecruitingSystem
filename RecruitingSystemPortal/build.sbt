ThisBuild / scalaVersion := "2.12.8"

lazy val server = (project in file("."))
  .settings(
    name := "RecruitingSystemPortal",
    Compile/mainClass := Some("Process.Server"),
    mainClass in assembly := Some("Process.Server"),
    assemblyMergeStrategy in assembly := {
      case PathList("META-INF", xs @ _*) => MergeStrategy.discard
      case "application.conf" => MergeStrategy.concat
      case x => MergeStrategy.first
    },
    assemblyJarName in assembly := "assembly_main.jar"
  )

lazy val akkaVersion = "2.6.18"
lazy val akkaHttpVersion = "10.2.4"
lazy val jacksonVersion = "2.9.5"

libraryDependencies ++= Seq(
  "com.rabbitmq" % "amqp-client" % "5.14.1",
  "org.apache.poi" % "poi-ooxml" % "3.17",
  "com.typesafe.slick" %% "slick" % "3.3.1",
  "com.typesafe.slick" %% "slick-hikaricp" % "3.3.1",
  "org.postgresql" % "postgresql" % "42.2.5",//org.postgresql.ds.PGSimpleDataSource dependency
  "joda-time"%"joda-time"%"2.10.5",
  "org.slf4j" % "slf4j-nop" % "1.7.26",
  "org.scala-lang.modules" %% "scala-swing" % "2.0.0-M2",
  "org.scala-lang.modules" %% "scala-parser-combinators" % "1.0.4",
  "org.apache.kafka" %% "kafka-streams-scala" % "2.5.0",
  "org.scala-lang" % "scala-reflect" % scalaVersion.value,
  "com.typesafe.akka" %% "akka-actor-typed" % akkaVersion,
  "com.typesafe.akka" %% "akka-cluster-typed" % akkaVersion,
  "com.typesafe.akka" %% "akka-cluster-sharding-typed" % akkaVersion,
  "com.typesafe.akka" %% "akka-serialization-jackson" % akkaVersion,
  "ch.qos.logback" % "logback-classic" % "1.2.10",
  "com.typesafe.scala-logging" %% "scala-logging" % "3.9.4",
  "com.typesafe.akka" %% "akka-discovery" % akkaVersion,
  "com.typesafe.akka" %% "akka-pki" % akkaVersion,
  "com.typesafe.akka" %% "akka-stream-testkit" % akkaVersion % Test,
  "com.typesafe.akka" %% "akka-actor-testkit-typed" % akkaVersion % Test,
  "org.scalatest" %% "scalatest" % "3.1.0" % Test,
  "com.typesafe.akka" %% "akka-serialization-jackson" % akkaVersion,
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  "com.typesafe.akka" %% "akka-stream-typed" % akkaVersion,
  "org.json4s" %% "json4s-native" % "3.6.0-M3",
  "com.typesafe.akka" %% "akka-serialization-jackson" % akkaVersion,
  "com.thesamet.scalapb" %% "scalapb-runtime" % "0.10.7",
  "io.netty" % "netty-tcnative-boringssl-static" % "2.0.22.Final",
  "com.typesafe.akka" %% "akka-stream-kafka" % "2.0.4",
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
  "com.sun.mail" % "javax.mail" % "1.6.2",
  "ch.megard" %% "akka-http-cors" % "0.2.2",
  "com.typesafe.akka" %% "akka-persistence-query" % akkaVersion,
  "com.typesafe.akka" %% "akka-persistence-typed" % akkaVersion,
  "com.lightbend.akka" %% "akka-persistence-jdbc" % "5.0.4",
  "com.github.takezoe" %% "runtime-scaladoc-reader" % "1.0.1", //读注释生成文档，注意到下面的addComplilerPlugin(com.github.takezoe)也需要加
  "io.monix" %% "monix" % "3.4.0",
  "com.google.guava" % "guava" % "30.1.1-jre",
)
addCompilerPlugin("com.github.takezoe" %% "runtime-scaladoc-reader" % "1.0.1")

scalacOptions += "-deprecation"
fork in run := true
